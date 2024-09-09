const express = require("express");
const {
  register,
  getUsers,
  login,
  deleteUser,
  signOut,
  updateUser,
  changePassword,
  getUserId,
  refreshToken,
  verifyUserAccount,
  deleteVerifyUser,
  controllerTwoFA,
  twoFAVerifyCode,
} = require("../controllers/authController");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();
router.get("/", getUsers);
router.post("/refresh-token", refreshToken)
router.get("/:userId", verifyToken, getUserId)
router.post("/register", register);
router.put("/verifyUserAccount", verifyUserAccount)
router.put("/controllerTwoFA", verifyToken, controllerTwoFA)
router.put("/twoFAVerifyCode", twoFAVerifyCode)
router.delete("/deleteVerifyUser/:id", deleteVerifyUser)
router.post("/login", login);
router.put("/updateUser/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);
router.get("/signOut/:id", signOut);
router.patch("/changePassword/:id", verifyToken, changePassword);
module.exports = router;
