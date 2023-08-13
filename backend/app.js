const express = require("express");

const app = express();
const cookieParser = require("cookie-parser");

const errorMiddleware = require("./middleware/error");

const catchAsyncErrors = require("./middleware/catchAsyncErrors");

app.use(express.json());

app.use(cookieParser());

app.get("/ping", (req, res) => {
  return res.send("Pong");
});

app.use("/", require("./routes/index"));

// Middleware to handle errors
app.use(errorMiddleware);

// Middleware to handle async errors
app.use(catchAsyncErrors);

module.exports = app;
