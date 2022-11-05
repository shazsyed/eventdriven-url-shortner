const { InvalidEntity } = require("../utils/errors")

const schemaValidater = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body)
    if (error) {
      const message = error.details.map((msg) => msg.message).join(",")
      throw new InvalidEntity(message)
    } else {
      next()
    }
  }
}

module.exports = schemaValidater
