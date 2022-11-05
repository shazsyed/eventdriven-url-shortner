const { HttpError } = require("../utils/errors")

const errorHandler = (err, req, res, next) => {
  if (err instanceof HttpError) {
    res.status(err.statusCode).json({
      status: err.statusCode,
      message: err.message,
    })
  } else {
    res.status(500).json({
      message: "Something went wrong",
      stack: process.env.NODE_ENV === "DEV" ? err.stack : "",
    })
  }
}

module.exports = errorHandler
