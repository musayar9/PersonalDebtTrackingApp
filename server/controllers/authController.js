const express = require("express");
const User = require("../models/userModel");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const otpAndTwoFA = require("../models/otpAndTwoFAModel");
const verifyAccountMail = require("../middleware/verifyAccountMail");
const getUsers = async (req, res, next) => {
  const user = await User.find({}).sort({ updatedAt: -1 });
  try {
    res.status(StatusCodes.OK).json(user);
  } catch (error) {
    next(error);
  }
};

const getUserId = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const user = await User.findById({ _id: userId });
    if (!user) {
      throw new BadRequestError("User not found");
    }

    res.status(StatusCodes.OK).json(user);
  } catch (error) {
    next(error);
  }
};

const register = async (req, res, next) => {
  const { name, surname, username, email, password, birthdate } =
    req.body.formData;

  const userNameRegex = /^\w+$/;
  const emailRegex = /^[\w-]+(\.[\w-]+)*@\w+(\.[\w-]+)+$/;

  const regexPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[a-zA-Z\d@$!%*?&.]{8,12}$/;



  try {
    // const user = await User.create({ ...req.body });
    if (!emailRegex.test(email)) {
      throw new BadRequestError("Email is not valid");
    }

    if (!userNameRegex.test(username)) {
      throw new BadRequestError("Username is not valid");
    }

    if (!regexPassword.test(password)) {
      throw new BadRequestError(
        "Your password must be at least 8 and at most 12 characters long, and it must contain at least one uppercase letter, one lowercase letter, one special character, and one number"
      );
    }

    const user = new User({
      name,
      surname,
      username,
      email,
      password,
      birthdate,
    });
    await user.save();

    const accountVerify = await new otpAndTwoFA({
      userId: user._id,
      verificationCode: Math.floor(100000 + Math.random() * 900000).toString(),
    }).save();

    await verifyAccountMail(user, email, accountVerify.verificationCode);

    res.status(StatusCodes.CREATED).json({
      status: user,
      message:
        "Success! User Created, A verification code has been sent to your email.",
    });
  } catch (error) {
    next(error);
  }
};

const verifyUserAccount = async (req, res, next) => {
  const { verificationCode } = req.body;

  const verifyAccount = await otpAndTwoFA.findOne({ verificationCode });

  try {
    if (!verifyAccount) {
      throw new BadRequestError("Invalid verification code");
    }
    const user = await User.findByIdAndUpdate(
      { _id: verifyAccount.userId },
      { $set: { verifyAccount: true } },
      { new: true }
    ).select("-password");

    await otpAndTwoFA.findOneAndDelete({ userId: user._id });
    res.status(StatusCodes.OK).json(user);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (email === "" || password === "") {
      throw new BadRequestError("Please Provide Email and Password");
    }

    const isUser = await User.findOne({ email });

    if (!isUser) {
      throw new BadRequestError("Registered email address not found");
    }

    const validPassword = await bcrypt.compare(password, isUser.password);
    if (!validPassword) {
      throw new BadRequestError("Invalid Password");
    }

    if (isUser.isTwoFA) {
      const twoFactorAuthentication = await new otpAndTwoFA({
        userId: isUser._id,
        verificationCode: Math.floor(
          100000 + Math.random() * 900000
        ).toString(),
      }).save();
  console.log("verifiacation", twoFactorAuthentication);
      await verifyAccountMail(
        isUser,
        email,
        twoFactorAuthentication.verificationCode
      );
    }

    const { password: pass, ...rest } = isUser._doc;

    const token = jwt.sign(
      { id: isUser._id, name: isUser.name, isAdmin: isUser.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "4h" }
    );

    const refreshToken = jwt.sign(
      { id: isUser._id, name: isUser.name, isAdmin: isUser.isAdmin },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res
      .status(StatusCodes.OK)
      .cookie("token", token, {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        // maxAge: 30 * 60 * 1000,
        maxAge: 4 * 60 * 60 * 1000,
        // maxAge: 1 * 24 * 60 * 60 * 1000,
        sameSite: "strict", // CSRF: saldirilara karsi onlemek icin
      })
      .json({
        user: rest,
        message: " Otp code Your send email address",
        token,
      });
  } catch (error) {
    next(error);
  }
};

const controllerTwoFA = async (req, res, next) => {
  const userId = req.user.id;
  const { verifyStatus } = req.body;

  try {
    const isUser = await User.findOne({ _id: userId });
    if (!isUser) {
      throw new BadRequestError("Invalid Authentication");
    }

    const updateUser = await User.findByIdAndUpdate(
      {
        _id: userId,
      },
      { $set: { isTwoFA: verifyStatus } },
      { new: true }
    );

    return res.status(StatusCodes.OK).json({
      msg: `${
        verifyStatus
          ? " two factor authentication active "
          : "two factor authentication inactive"
      }`,
      updateUser,
    });
  } catch (error) {
    next(error);
  }
};

const twoFAVerifyCode = async (req, res, next) => {
  const { verificationCode } = req.body;

  const isVerifyCode = await otpAndTwoFA.findOne({ verificationCode });
  try {
    if (!isVerifyCode) {
      throw new BadRequestError("Invalid verify code");
    }

    const updateUser = await User.findByIdAndUpdate(
      {
        _id: isVerifyCode.userId,
      },
      { $set: { isTwoFAVerify: true } },
      { new: true }
    );
    await otpAndTwoFA.findOneAndDelete({ userId: updateUser._id });
    return res.status(StatusCodes.OK).json({
      msg: "Your account has been verified, you are being redirected",
      updateUser,
    });
  } catch (error) {
    next(error);
  }
};

const refreshToken = async (req, res, next) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) {
    return res
      .status(StatusCodes.FORBIDDEN)
      .json({ message: "Refresh Token is missing" });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const isUser = await User.findById(decoded.id);
    if (!isUser) {
      return res
        .status(StatusCodes.FORBIDDEN)
        .json({ message: "Invalid refresh Token" });
    }

    const newAccessToken = jwt.sign(
      { id: isUser._id, name: isUser.name, isAdmin: isUser.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "4h" }
    );

    return res
      .status(StatusCodes.OK)
      .cookie("token", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameStrict: "strict",
        // maxAge: 30 * 60 * 1000,
        maxAge: 4 * 60 * 60 * 1000,
      })
      .json({ message: "Access Token refreshed", token: newAccessToken });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  const {
    name,
    surname,
    username,
    birthdate,
    email,
    city,
    district,
    address,
    phone,
    profilePicture,
    isTwoFA,
    isTwoFAVerify,
  } = req.body;

  const { id } = req.params;
  const userId = req.user.id;
  const userNameRegex = /^\w+$/;


  try {
  
    if (id !== userId) {
      return res.status(400).json({ error: "You mustn't update this user" });
    }

    if (name.length < 2 || name.length > 14 || name === "") {
      return res
        .status(400)
        .json({ error: "Name must be 2 and 14 characters" });
    }
    if (surname.length < 2 || surname.length > 14 || surname === "") {
      return res
        .status(400)
        .json({ error: "Surname must be 2 and 14 characters" });
    }
    if (username.length < 3 || username.length > 14 || username === "") {
      return res
        .status(400)
        .json({ error: "Username must be 3 and 14 characters" });
    }
    if (email === "") {
      return res.status(400).json({ error: "Email is required" });
    }

    if (!userNameRegex.test(username)) {
      return res.status(400).json({ error: "User is not valid" });
    }
    const updateUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          name,
          surname,
          username,
          email,
          address,
          phone,
          city,
          district,
          profilePicture,
          birthdate,
          isTwoFA,
          isTwoFAVerify,
        },
      },
      { new: true }
    );

    res.status(200).json({ user: updateUser, message: "user is updated" });
  } catch (error) {
    next(error);
  }
};

const deleteVerifyUser = async (req, res, next) => {
  const { id } = req.params;
  const isUser = await User.findById({ _id: id });

  try {
    if (!isUser) {
      throw new BadRequestError("user is not found");
      // return res.status(404).json({ msg: "vkullanı bulunamadı" })
    }

    await User.findByIdAndDelete({ _id: id });
    await otpAndTwoFA.findOneAndDelete({ userId: id });

    res.status(200).json({
      message:
        "Registration was not completed because the account was not verified",
    });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  const { isAdmin } = req.user;

  const user = await User.findById({ _id: id });

  if (!user) {
    throw new BadRequestError("User not found");
  }

  try {
    await User.findByIdAndDelete({ _id: id });

    if (isAdmin) {
      res
        .status(StatusCodes.OK)

        .json({ message: "User is deleted" });
    } else {
      res
        .status(StatusCodes.OK)
        .clearCookie("token")
        .json({ message: "User is deleted" });
    }
  } catch (error) {
    next(error);
  }
};

const signOut = async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    throw new BadRequestError("User is not found");
  }
  await User.findByIdAndUpdate(
    {
      _id: user._id,
    },
    { $set: { isTwoFAVerify: false } },
    { new: true }
  ),
    res
      .clearCookie("token")
      .clearCookie("refreshToken")
      .status(200)
      .json({ message: "Sign Out" });
};

const changePassword = async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;
  const { id } = req.params;
  const userId = req.user.id;
  const regexPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[a-zA-Z\d@$!%*?&.]{8,12}$/;

  if (id !== userId) {
    throw new BadRequestError("You can't change password");
  }

  if (currentPassword == newPassword) {
    return res.status(400).json({
      message:
        "Your new password should not be the same as your last password.",
    });
  }
  if (!regexPassword.test(newPassword)) {
    return res.status(400).json({
      message:
        "Your password must be at least 8 and at most 12 characters long, and it must contain at least one uppercase letter, one lowercase letter, one special character, and one number",
    });
  }

  const hashedPassword = await bcrypt.hashSync(newPassword, 10);

  try {
    await User.findByIdAndUpdate(
      id,
      { $set: { password: hashedPassword } },
      { new: true }
    );
    res.status(200).json({ message: "The Password is updating" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  changePassword,
  getUsers,
  signOut,
  login,
  deleteUser,
  updateUser,
  getUserId,
  refreshToken,
  verifyUserAccount,
  deleteVerifyUser,
  controllerTwoFA,
  twoFAVerifyCode,
};
