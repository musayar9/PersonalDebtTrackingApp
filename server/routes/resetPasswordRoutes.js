const express = require("express");
const { resetPassword, changePasswordGet, resetPasswordChange } = require("../controllers/resetPasswordController");
const router = express.Router();

router.post("/", resetPassword);
router.get("/:userId/token/:token", changePasswordGet);
router.put("/:userId/token/:token", resetPasswordChange);
module.exports = router;
