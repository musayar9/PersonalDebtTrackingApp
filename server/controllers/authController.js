const express = require("express");
const User = require("../models/userModel");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError } = require("../errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const getUsers = async (req, res, next) => {
  const user = await User.find({});
  try {
    res.status(StatusCodes.OK).json(user);
  } catch (error) {
    next(error);
  }
};

const register = async (req, res, next) => {
  const { name, surname, username, email, password } = req.body;

  const user = new User({
    name,
    surname,
    username,
    email,
    password,
  });

  try {
    // const user = await User.create({ ...req.body });
    await user.save();
    res.status(StatusCodes.CREATED).json({
      status: user,
      message:
        "Success! User Created, A verification code has been sent to your email.",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    if (!email || !password) {
      throw new BadRequestError("Please Provide Email and Password");
    }

    const isUser = await User.findOne({ email });

    if (!isUser) {
      throw new NotFoundError("Registered email address not found");
    }

    const validPassword = await bcrypt.compare(password, isUser.password);
    if (!validPassword) {
      throw new BadRequestError("Invalid Password");
    }
    const { password: pass, ...rest } = isUser._doc;

    const token = jwt.sign(
      { id: isUser._id, name: isUser.name },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );
    // console.log(isUser._doc);
    return res
      .status(StatusCodes.OK)
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 2 * 60 * 60 * 1000,
        // maxAge: 1 * 24 * 60 * 60 * 1000,
        sameSite: "strict", // CSRF: saldirilara karsi onlemek icin
      })
      .json({ user: rest });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, getUsers, login };
