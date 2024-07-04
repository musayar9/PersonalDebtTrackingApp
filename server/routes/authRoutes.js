const express = require("express");
const { register, getUsers, login } = require("../controllers/authController");
const router = express.Router();
router.get("/", getUsers)
router.post("/register", register);
router.post("/login", login)
module.exports = router;
