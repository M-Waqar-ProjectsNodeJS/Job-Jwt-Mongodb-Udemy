const errorHandler = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || 500,
    message: err.message || "Internal Server Error.",
  };
  res.status(customError.statusCode).json({
    message: customError.message,
  });
};

module.exports = errorHandler;
