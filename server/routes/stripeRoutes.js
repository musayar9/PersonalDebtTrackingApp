const express = require("express");
const { getStripe, createPayment } = require("../controllers/stripeController");
const router = express.Router();

router.get("/", getStripe);
router.post("/create-payment", createPayment);

module.exports = router;
