const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");
const PasswordToken = require("../models/resetPasswordTokenModel");
const User = require("../models/userModel");
const crypto = require("crypto");
const resetPassword = async (req, res, next) => {
  const { email } = req.body;

  if (!email || email === "") {
    throw new BadRequestError("Email is required");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new BadRequestError("User not Found");
  }

  try {
    const token = await new PasswordToken({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();

    return res.status(StatusCodes.OK).json({
      message: "Check your email address. Password change url sent",
      status: { token },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { resetPassword };
