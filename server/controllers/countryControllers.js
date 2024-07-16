const express = require("express");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");
const Country = require("../models/countryModel");
const allCountry = async (req, res, next) => {
  const country = await Country.find({});

  try {
    res.status(StatusCodes.OK).json(country);
  } catch (error) {
    next(error);
  }
};

const addCountry = async (req, res, next) => {
  const { country, iso, phoneCode, flag } = req.body;

  try {
    if (!country | !iso | !phoneCode | !flag) {
      throw new BadRequestError("Please Provide All Fields Area");
    }

    const countries = await Country.create({ ...req.body });
    // await countries.save();
    res.status(StatusCodes.CREATED).json(countries);
  } catch (error) {
    next(error);
  }
};

module.exports = { allCountry, addCountry };
