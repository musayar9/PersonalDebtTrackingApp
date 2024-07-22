const express = require("express");
const { getAllDebt, createDebt, getUserDebt } = require("../controllers/debtController");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();

router.get("/", getAllDebt);
router.post("/", verifyToken, createDebt);
router.get("/:userId", verifyToken, getUserDebt);

module.exports = router;
