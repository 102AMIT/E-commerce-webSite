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
  const resultPerPage = 8;

  const productCount = await Product.countDocuments();

  // finding using query string it's help us to find the product by matching the character in the product name
  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  // here we are using lean() method to get the product in json format and it's faster than normal find operation
  const products = await apiFeature.query;
  res.status(200).json({
    success: true,
    products,
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

exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
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

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
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

// create new review or update the review

exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);
  // here we are checking if the user already reviewed the product or not
  const isReviewed = product.reviews.find(
    (review) => review.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    // here we are updating the review if the user already reviewed the product
    product.reviews.forEach((review) => {
      if (review.user.toString() === req.user._id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    // here we are adding the review if the user not reviewed the product
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  // calculate the average rating of the product after adding the review
  product.ratings =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;

  // here we are saving the product without validating the data
  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message: "Review added successfully",
  });
});

// get all product reviews

exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// delete product review

exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  // here we are filtering the reviews and removing the review which is matched with the user id
  const reviews = product.reviews.filter(
    (review) => review._id.toString() !== req.query.id.toString()
  );

  const numOfReviews = reviews.length;

  // calculate the average rating of the product after deleting the review
  const ratings =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
    message: "Review deleted successfully",
  });
});
