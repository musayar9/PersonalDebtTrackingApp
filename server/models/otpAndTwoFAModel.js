const mongoose = require("mongoose");

const otpAndTwoFAModel = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
      ref: "User",
    },
    verificationCode: {
      type: String,
      required: true,
      index: true,
      unique: true,
      default: Math.floor(100000 + Math.random() * 900000).toString(),
    },
  },
  { timestamps: true }
);

otpAndTwoFAModel.index({ createAt: 1 }, { expiresAfterSeconds: 3600 });
const otpAndTwoFA = mongoose.model("optAndTwoFA", otpAndTwoFAModel);

module.exports = otpAndTwoFA;
