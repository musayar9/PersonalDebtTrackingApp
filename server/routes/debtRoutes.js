const express = require("express");
const { getAllDebt, createDebt } = require("../controllers/debtController");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();

router.get("/", getAllDebt);
router.post("/", verifyToken, createDebt);

module.exports = router;
