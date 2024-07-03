const express = require("express");
const User = require("../models/userModel");
const { StatusCodes } = require("http-status-codes");

const getUsers = async (req, res, next) => {
  const user = await User.find({}).select("-password");
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

module.exports = { register, getUsers };
