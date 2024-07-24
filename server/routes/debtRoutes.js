const express = require("express");
const { getAllDebt, createDebt, getUserDebt, deleteDebt } = require("../controllers/debtController");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();

router.get("/", getAllDebt);
router.post("/", verifyToken, createDebt);
router.get("/:userId", verifyToken, getUserDebt);
router.delete("/:id", verifyToken, deleteDebt)

module.exports = router;
