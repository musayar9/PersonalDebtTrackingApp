const express = require("express");
const Debt = require("../models/debtModel");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors/index");

const getAllDebt = async (req, res, next) => {
  const debt = await Debt.find({}).sort({ createdAt: -1 });

  try {
    res.status(StatusCodes.OK).json(debt);
  } catch {
    next(error);
  }
};

const getUserDebt = async (req, res, next) => {
  const { userId } = req.params;
  const { id } = req.user;
  console.log(req.user);

  try {
    const debt = await Debt.find({ userId }).sort({ createdAt: -1 }).exec();

    if (!debt) {
      res.status(400).json("Debt was not found");
    }

    if (userId !== id) {
      throw new BadRequestError("You can't use data. Unauthorized");
    }

    res.status(StatusCodes.OK).json(debt);
  } catch (error) {
    next(error);
  }
};

const createDebt = async (req, res, next) => {
  console.log(req.user);
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

const deleteDebt = async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user.id;
  console.log("id", id);

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

module.exports = { getAllDebt, createDebt, getUserDebt, deleteDebt };
