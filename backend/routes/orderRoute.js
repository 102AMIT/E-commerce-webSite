const express = require("express");
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const { newOrder } = require("../controllers/orderController");

router.post("/order/new", isAuthenticatedUser, newOrder);

module.exports = router;
