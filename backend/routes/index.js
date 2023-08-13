const express = require("express");
const router = express.Router();

const userRoute = require("./userRoute");
const productRoute = require("./productRoute");
const orderRoute = require("./orderRoute");

router.use("/api/v1", productRoute);

router.use("/api/v1", userRoute);

router.use("/api/v1", orderRoute);

module.exports = router;
