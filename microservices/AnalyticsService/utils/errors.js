class HttpError extends Error {
    constructor(message, statusCode) {
        super(message)
        this.message = message
        this.statusCode = statusCode
      }
}

class InvalidEntity extends HttpError {
    constructor(message) {
      super(message, 422)
    }
}

class HttpNotFound extends HttpError {
  constructor(message){
    super(message, 404)
  }
}

module.exports = {
    HttpError,
    InvalidEntity,
    HttpNotFound
}