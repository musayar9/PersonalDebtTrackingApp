const express = require("express");
const { resolve } = require("path");
const Debt = require("../models/debtModel");
const { BadRequestError } = require("../errors");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-08-01",
});

const getStripe =
  ("/",
  async (req, res, next) => {
    res.send({
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    });
  });
const createPayment = async (req, res, next) => {
  const { debtId, paymentId } = req.body;

  try {
    const debt = await Debt.findById({ _id: debtId });
    console.log("debt", debt);

    const selectDebt = await debt?.paymentPlan?.find(
      (d) => d?._id?.toString() === paymentId
    );
    console.log("selectDebt", selectDebt.paymentAmount);
    if (!selectDebt) {
      throw new BadRequestError( "Payment plan not found");
    }

    const amount = await  selectDebt?.paymentAmount; //
    console.log( amount)
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "usd",
      amount: Math.round(amount),
      automatic_payment_methods: { enabled: true },
    });
    
    

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
    
    
  } catch (error) {
    next(error);
  }
};

module.exports = { getStripe, createPayment };
