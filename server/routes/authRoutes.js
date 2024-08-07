const express = require("express");
const {
  register,
  getUsers,
  login,
  deleteUser,
  signOut,
  updateUser,
  changePassword,
} = require("../controllers/authController");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();
router.get("/", getUsers);
router.post("/register", register);
router.post("/login", login);
router.put("/updateUser/:id", verifyToken, updateUser);

router.delete("/:id", verifyToken, deleteUser);
router.get("/signOut/:id", signOut);
router.patch("/changePassword/:id", verifyToken, changePassword);
module.exports = router;
