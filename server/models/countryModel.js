const mongoose = require("mongoose");

const countrySchema = new mongoose.Schema({
  country: { type: String },
  iso: { type: String },
  phoneCode: { type: String },
  flag: { type: String },
});

const Country = mongoose.model("Country", countrySchema);

module.exports = Country;
