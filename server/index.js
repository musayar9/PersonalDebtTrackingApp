require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

//extra security packages

const helmet = require("helmet");
const xss = require("xss-clean");
const connectMongoDB = require("./db/connect");
// const rateLimiter = ("express-rate-limit")

connectMongoDB();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use(xss());

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
