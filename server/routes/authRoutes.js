const express = require("express");
const { register, getUsers, login, deleteUser } = require("../controllers/authController");
const router = express.Router();
router.get("/", getUsers);
router.post("/register", register);
router.post("/login", login);
router.delete("/:id", deleteUser);
module.exports = router;
