const express = require("express");
const router = express.Router();

const userRoute = require("./userRoute");
const productRoute = require("./productRoute");


router.use("/api/v1", productRoute);
router.use("/api/v1", userRoute);


module.exports = router;