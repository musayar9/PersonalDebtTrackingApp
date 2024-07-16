const express = require("express");
const { allCountry, addCountry } = require("../controllers/countryControllers");
const router = express.Router();

router.get("/", allCountry);
router.post("/", addCountry);

module.exports = router;
