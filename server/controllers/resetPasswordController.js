const { StatusCodes } = require("http-status-codes");
const PasswordToken = require("../models/resetPasswordTokenModel");
const User = require("../models/userModel");
const crypto = require("crypto");
const bcryptjs = require("bcryptjs");
const sendResetPassword = require("../middleware/sendResetPassword");
const resetPassword = async (req, res, next) => {
  console.log(req.body);
  const { email } = req.body;

  if (!email || email === "") {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Email is required" });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(StatusCodes.BAD_REQUEST).json({ msg: "User not Found" });
  }

  try {
    const token = await new PasswordToken({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();

    const url = `http://localhost:5173/reset-password/${user._id}/token/${token.token}`;
    await sendResetPassword(user, user.email, url);

    res.status(StatusCodes.OK).json({
      message: "Check your email address. Password change url sent",
      status: { token },
    });
  } catch (error) {
    next(error);
  }
};

const resetPasswordChange = async (req, res, next) => {
  const { userId, token } = req.params;
  console.log(req.body);
  const { newPassword, newPasswordConfirm } = req.body;

  const resetToken = await PasswordToken.findOne({ userId, token });

  if (!resetToken) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "The provided token is invalid" });
  }

  if (newPassword !== newPasswordConfirm) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Password not match check it repeat" });
  }

  const hashedPassword = bcryptjs.hashSync(newPassword, 12);

  try {
    const updatePassword = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          password: hashedPassword,
        },
      },
      { new: true }
    );

    await PasswordToken.findOneAndDelete({ token }).exec();

    res
      .status(StatusCodes.OK)
      .json({ message: "Password Change Success", updatePassword });
  } catch (error) {}
};

const changePasswordGet = async (req, res, next) => {
  const { userId, token } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "User not found" });
    }

    const resetToken = await PasswordToken.findOne({ userId, token });
    if (!resetToken) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({msg:"The provided token is invalid"});
    }

    res.status(StatusCodes.OK).json({ message: "Change Password" });
  } catch (error) {
    next(error);
  }
};

module.exports = { resetPassword, resetPasswordChange, changePasswordGet };
