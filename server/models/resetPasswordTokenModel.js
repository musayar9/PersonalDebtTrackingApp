const mongoose = require("mongoose");
const crypto = require("crypto");
const { type } = require("os");

const resetPasswordToken = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    index: true,
    ref: "User",
  },
  token: {
    type: String,
    required: true,
    index: true,
    unique: true,
    default: () => crypto.randomBytes(20).toString("hex"),
  },
});

resetPasswordToken.index({createdAt:1},{expiresAfterSeconds:3600});
const PasswordToken = mongoose.model("PasswordToken", resetPasswordToken);


module.exports = PasswordToken