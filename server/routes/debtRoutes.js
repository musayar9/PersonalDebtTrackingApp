const express = require("express");
const { getAllDebt, createDebt, getUserDebt, deleteDebt, updateDebt, getDebtId, getPaymentPlan } = require("../controllers/debtController");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();

router.get("/", getAllDebt);
router.post("/", verifyToken, createDebt);
router.get("/:userId", verifyToken, getUserDebt);
router.delete("/:id", verifyToken, deleteDebt)
router.put("/updateDebt/:id", verifyToken, updateDebt);
router.get("/getDebt/:id", verifyToken, getDebtId)
router.get("/paymentPlan/:id", verifyToken, getPaymentPlan)

module.exports = router;
