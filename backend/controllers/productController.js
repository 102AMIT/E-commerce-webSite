const Product = require("../models/ProductModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");

// create product--Admin

exports.createProduct = catchAsyncErrors(async (req, res, next) => {

  // here we are adding the user id to the product object so that we can know which user created the product
  // we are saving the user id when we are login the user in our website
  req.body.user = req.user.id;
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

// get all products

exports.getAllProducts = catchAsyncErrors(async (req, res) => {
  // for pagination
  const resultPerPage = 5;

  const productCount = await Product.countDocuments();

  // finding using query string it's help us to find the product by matching the character in the product name
  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  // here we are using lean() method to get the product in json format and it's faster than normal find operation
  const product = await apiFeature.query;
  res.status(200).json({
    success: true,
    product,
    productCount,
  });
});

// get single product details

exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

// update product

exports.updateProduct = catchAsyncErrors(async (req, res) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  // here we are using new:true to get the updated product and runValidators to validate the updated data
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

// delete product

exports.deleteProduct = catchAsyncErrors(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  await product.deleteOne();

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});
