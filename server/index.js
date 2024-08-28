require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const http = require("http");
// routes
const authRoutes = require("./routes/authRoutes");
const countryRoutes = require("./routes/countryRoutes");
const debtRoutes = require("./routes/debtRoutes");
const stripeRoutes = require("./routes/stripeRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const resetPasswordRoutes = require("./routes/resetPasswordRoutes");
//extra security packages

const helmet = require("helmet");
const xss = require("xss-clean");
const connectMongoDB = require("./db/connect");
// const rateLimiter = ("express-rate-limit")

const errorHandlerMiddleware = require("./middleware/errorHandler");
const notFoundMiddleware = require("./middleware/notFound");

const socket = require("./middleware/socketio");

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use(xss());

app.get("/", (req, res) => {
  res.send("<h1>Personal Debt Tracking</h1>");
});
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/countries", countryRoutes);
app.use("/api/v1/debt", debtRoutes);
app.use("/api/v1/stripe", stripeRoutes);
app.use("/api/v1/chat", chatRoutes);
app.use("/api/v1/message", messageRoutes);
app.use("/api/v1/resetPassword", resetPasswordRoutes);
app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

const port = process.env.PORT || 5000;
socket(8800);
connectMongoDB();
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// app.use((error, req, res, next) => {
//   const statusCode = error.statusCode || 500;
//   const message = error.message || "Internal Server Error";
//   res.status(statusCode).json({ success: false, statusCode, message });
// });
