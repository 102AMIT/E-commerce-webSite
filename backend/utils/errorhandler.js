class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;

    // captureStackTrace show the exact line of error we just need to use err.stack in middleware error.js
    // Error.captureStackTrace(this, this.constructor);
  }
}


module.exports = ErrorHandler;