const Order = require("../models/orderModel");
const Product = require("../models/ProductModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// create new order

exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
  } = req.body;

  // check oderItems array is contain quantity more than available quantity in product stock or not
  for (const orderItem of orderItems) {
    console.log(orderItem);
    const product = await Product.findById(orderItem.product);

    if (orderItem.quantity > product.stock) {
      if (product.stock === 0) {
        return next(
          new ErrorHandler(
            `Product ${product.name} is out of stock now`,
            400
          )
        );
      } else {
        return next(
          new ErrorHandler(
            `Product ${product.name} is ${product.stock} left`,
            400
          )
        );
      }
    }
  }

  const order = await Order.create({
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(200).json({
    success: true,
    order,
  });
});

// get single order details

exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  // populate user field with name and email fields from User model (see orderModel.js)
  const order = await Order.findById(req.params.id).populate(
    // "user" is the field in orderModel.js that references the User model
    "user",
    // "name email" are the fields in the User model that we want to populate
    "name email"
  );

  if (!order) {
    return next(new ErrorHandler("No order found with this ID", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

// get logged in user orders

exports.myOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    orders,
  });
});

// get all orders access by admin

exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;

  // show the total amount of all orders in admin dashboard
  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });
  res.status(200).json({
    success: true,
    orders,
  });
});

// update order status / process order - ADMIN

exports.updateOrderStatus = catchAsyncErrors(async (req, res, next) => {
  // req.params.id is the id of the order that we want to update

  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("No order found with this ID", 404));
  }

  // req.body.status is the status that we want to update to

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler("You have already delivered this order", 400));
  }

  // update stock for each product in order (see productModel.js)

  order.orderItems.forEach(async (item) => {
    await updateStock(item.product, item.quantity);
  });

  order.orderStatus = req.body.status;

  // if order is delivered, add deliveredAt date
  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message: "Order status updated",
  });
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  // update stock
  product.stock = product.stock - quantity;

  await product.save({ validateBeforeSave: false });
}

// delete order - ADMIN

exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("No order found with this ID", 404));
  }

  await order.deleteOne();

  res.status(200).json({
    success: true,
    message: "Order deleted successfully",
  });
});
