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
  const { name, surname, username, email, password, birthdate } =
    req.body.formData;

  const user = new User({
    name,
    surname,
    username,
    email,
    password,
    birthdate,
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
  console.log(req.body);
  const { email, password } = req.body;
  console.log(email, password);
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
      .json({ user: rest, message: " Otp code Your send email address" });
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
  } = req.body;
  console.log(req.body);
  const { id } = req.params;
  const userId = req.user.id;

  console.log(req.params.id);
  console.log(req.user);

  if (id !== userId) {
    return res.status(400).json({ error: "You mustn't update this user" });
  }

  if (name.length < 2 || name.length > 14 || name === "") {
    return res.status(400).json({ error: "Name must be 2 and 14 characters" });
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

  try {
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
        },
      },
      { new: true }
    );

    res.status(200).json({ user: updateUser, message: "user is updated" });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById({ _id: id });

  if (!user) {
    throw new BadRequestError("User not found");
  }

  try {
    await User.findByIdAndDelete({ _id: id });

    res.status(StatusCodes.OK).json({ msg: "User is deleted" });
  } catch (error) {}
};

const signOut = async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    throw new BadRequestError("User is not found");
  }

  res.clearCookie("token").status(200).json({ message: "Sign Out" });
};

const changePassword = async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;
  const { id } = req.params;
  const userId = req.user.id;

  if (id !== userId) {
    throw new BadRequestError("You can't change password");
  }
  const user = await User.findById({ _id: id });

  if (currentPassword == newPassword) {
    return res.status(400).json({
      message:
        "Your new password should not be the same as your last password.",
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
};
