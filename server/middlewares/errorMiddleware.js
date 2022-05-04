const ApiError = require('../exceptions/apiError');

module.exports = function errorMiddleware(err, req, res, next) {
  console.log('}}}}}}errorMiddleware>>>>>>', err);
  if (err instanceof ApiError) {
    return res
      .status(err.status)
      .json({ message: err.message, errors: err.errors });
  }
  return res
    .status(500).json({ message: 'Uncaught error' });
};
