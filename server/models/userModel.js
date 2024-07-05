const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Provide name"],
      minlength: [2, "Name must contain at least 3 Characters"],
    },

    surname: {
      type: String,
      required: [true, "Please Provide surname"],
      minlength: [2, "Surname must contain at least 3 Characters"],
    },

    username: {
      type: String,
      required: [true, "Please Provide Username"],
      minlength: [3, "Username must contain at least 4 Characters"],
      unique: true,
    },
    birthdate: {
      type: Date,
      required: [true, "Please Provide Username"],
    },

    email: {
      type: String,
      required: [true, "Please Provide Email"],
      // match: [
      //   /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      //   "Please provide a valid email",
      // ],
      unique: true,
    },

    password: {
      type: String,
      required: [true, "Please Provide Password"],
      minlength: [6, "Password must contain at least 6 characters"],
    },
    profilePicture: {
      type: String,
      default:
        "https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg",
    },
    verifyAccount: {
      type: Boolean,
      default: false,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function() {
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

module.exports = User;
