const mongoose = require("mongoose");

const debtSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide Users"],
    },

    lender: {
      type: String,
      required: true,
    },

    borrower: { type: String, required: true },

    debtAmount: {
      type: Number,
      required: true,
    },
    interestRate: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    paymentStart: {
      type: Date,
      required: true,
    },
    installment: {
      type: Number,
      required: true,
      default: 1,
    },
    description: {
      type: String,
      default: "Debt Tracking",
    },

    paymentStatus: {
      type: String,
      enum: ["Paid", "Unpaid", "Partially Paid"],
      default: "Unpaid",
    },

    paymentPlan: [
      {
        paymentDate: { type: Date, required: true },
        paymentAmount: { type: Number, required: true },
        paymentStatus: { type: Boolean, default: false },
      },
    ],
  },
  { timestamps: true }
);

const Debt = mongoose.model("Debt", debtSchema);
module.exports = Debt;
