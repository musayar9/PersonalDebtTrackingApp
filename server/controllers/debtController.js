const express = require("express");
const Debt = require("../models/debtModel");
const User = require("../models/userModel");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors/index");
const moment = require("moment");
const getAllDebt = async (req, res, next) => {
  const debt = await Debt.find({}).sort({ createdAt: -1 });

  for (const d of debt) {
    const user = await User.findById(d.userId);

    if (!user) {
      await Debt.findByIdAndDelete(d._id);
    }
  }

  // Tüm borçları tekrar sorgula, çünkü bazıları silinmiş olabilir.
  const debts = await Debt.find({}).sort({ createdAt: -1 });

  try {
    res.status(StatusCodes.OK).json(debts);
  } catch {
    next(error);
  }
};

const getUserDebt = async (req, res, next) => {
  const { userId } = req.params;
  const { id } = req.user;

  try {
    const debt = await Debt.find({ userId }).sort({ updatedAt: -1 }).exec();

    if (userId !== id) {
      throw new BadRequestError("You can't use data. Unauthorized");
    }

    res.status(StatusCodes.OK).json(debt);
  } catch (error) {
    next(error);
  }
};

const upcomingDebts = async (req, res, next) => {
  const { userId } = req.params;

  const { id } = req.user;
  if (userId !== id) {
    throw new BadRequestError("You can't use data. Unauthorized");
  }
  try {
    const now = moment();
    const tenDaysLater = moment().add(30, "days");
    const debts = await Debt.find({
      userId: id,
      "paymentPlan.paymentDate": {
        $gte: now.toDate(),
        $lt: tenDaysLater.toDate(),
      },
      "paymentPlan.paymentStatus": false,
    });

    const upcomingDebt = debts.flatMap((debt) =>
      debt.paymentPlan
        .filter((plan) => {
          const paymentDate = moment(plan.paymentDate);
          return paymentDate.isBetween(now, tenDaysLater, undefined, "[)");
        })
        .map((plan) => ({

          lender: debt.lender,
          borrower: debt.borrower,
          description: debt.description,
          paymentDate: plan.paymentDate,
          paymentAmount: plan.paymentAmount,
        }))
    );

    res.status(StatusCodes.OK).json(upcomingDebt);
  } catch (error) {
    next(error);
  }
};

const getDebtId = async (req, res, next) => {
  const { id } = req.params;

  try {
    const debt = await Debt.findById({ _id: id }).exec();
    // console.log(debt);
    if (!debt) {
      throw new BadRequestError("Not Found Debt");
    }

    res.status(StatusCodes.OK).json(debt);
  } catch (error) {
    next(error);
  }
};

const getPaymentPlan = async (req, res, next) => {
  const { id } = req.params;

  try {
    const payment = await Debt.findById({ _id: id }).exec();

    if (!payment) {
      throw new BadRequestError("Not Found Debt");
    }
    const paymentPlan = payment.paymentPlan;

    res.status(StatusCodes.OK).json(paymentPlan);
  } catch (error) {
    next(error);
  }
};

const createDebt = async (req, res, next) => {
  // console.log(req.user);
  const id = req.user.id;

  const debt = new Debt({
    ...req.body,
    userId: id,
  });

  try {
    await debt.save();
    res
      .status(StatusCodes.CREATED)
      .json({ status: debt, message: "Success, Debt was created" });
  } catch (error) {
    next(error);
  }
};

const updateDebt = async (req, res, next) => {
  const {
    lender,
    borrower,
    debtAmount,
    interestRate,
    amount,
    paymentStart,
    description,
    paymentStatus,
    paymentPlan,
  } = req.body;

  const { id } = req.params;

  try {
    if (
      lender === "" ||
      borrower === "" ||
      debtAmount === "" ||
      interestRate === "" ||
      amount === "" ||
      paymentStart === "" ||
      description === "" ||
      paymentStatus === ""
    ) {
      throw new BadRequestError("please fill in all fields");
    }

    const debt = await Debt.findById({ _id: id });
    // console.log(debt);
    if (!debt) {
      throw new BadRequestError("Kayıtlı borç bullamadır");
    }

    const updateDebt = await Debt.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          lender,
          borrower,
          debtAmount,
          interestRate,
          amount,
          paymentStart,
          description,
          paymentStatus,
          paymentPlan,
        },
      },
      { new: true }
    );

    res.status(200).json({ updateDebt, message: "user is updated" });
  } catch (error) {
    next(error);
  }
};

const updatePaymentDebt = async (req, res, next) => {
  const { debtId, paymentId } = req.params;
  try {
    const debt = await Debt.findById({ _id: debtId });
    if (!debt) {
      throw new BadRequestError("Debt not found");
    }
    const paymentDebt = debt.paymentPlan.find(
      (payment) => payment._id.toString() === paymentId
    );

    if (!paymentDebt) {
      throw new BadRequestError("Payment plan not found");
    }
    paymentDebt.paymentStatus = true;
    const totalPayments = debt.paymentPlan.length;
    const paidPayments = debt.paymentPlan.filter(
      (payment) => payment.paymentStatus
    ).length;

    if (paidPayments === 0) {
      debt.paymentStatus = "Unpaid";
    } else if (paidPayments < totalPayments) {
      debt.paymentStatus = "Partially Paid";
    } else if (paidPayments === totalPayments) {
      debt.paymentStatus = "Paid";
    }

    await debt.save();

    res.status(200).send({ message: "Payment was made successfully" });
  } catch (error) {
    next(error);
  }
};

const getPaymentStatus = async (req, res, next) => {
  const { paymentStatus } = req.body;
  console.log("server", paymentStatus);
  const userId = req.user.id;
  try {
    const checkDebt = await Debt.find({ userId, paymentStatus }).sort({
      updatedAt: -1,
    });

    if (!checkDebt) {
      throw new BadRequestError("Data is not found");
    }

    res.status(StatusCodes.OK).json(checkDebt);
  } catch (error) {
    next(error);
  }
};

const deleteDebt = async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user.id;
  // console.log("id", id);

  try {
    const isDebt = await Debt.findById({ _id: id });

    if (!isDebt) {
      throw new BadRequestError("Silinecek veri bulunamadı");
    }
    await Debt.findByIdAndDelete(id);
    const debt = await Debt.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json({ message: "Debt is deleted", debt });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllDebt,
  createDebt,
  getUserDebt,
  deleteDebt,
  updateDebt,
  getDebtId,
  getPaymentPlan,
  updatePaymentDebt,
  getPaymentStatus,
  upcomingDebts,
};
