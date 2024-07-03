require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

// routes
const authRoutes = require("./routes/authRoutes");

//extra security packages

const helmet = require("helmet");
const xss = require("xss-clean");
const connectMongoDB = require("./db/connect");
// const rateLimiter = ("express-rate-limit")

const errorHandlerMiddleware = require("./middleware/errorHandler")



app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use(xss());



app.get("/", (req, res) => {
  res.send("<h1>Personal Debt Tracking</h1>");
});
app.use("/api/v1/auth", authRoutes);
app.use(errorHandlerMiddleware);
const port = process.env.PORT || 5000;

connectMongoDB();
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// app.use((error, req, res, next) => {
//   const statusCode = error.statusCode || 500;
//   const message = error.message || "Internal Server Error";
//   res.status(statusCode).json({ success: false, statusCode, message });
// });
