const express = require("express");
const { allCountry, addCountry } = require("../controllers/countryControllers");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();

router.get("/", verifyToken, allCountry);
router.post("/", verifyToken, addCountry);

module.exports = router;
