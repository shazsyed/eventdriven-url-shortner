const Joi = require("joi")

const createLinkSchema = Joi.object({
  url: Joi.string().uri().required(),
})

module.exports = {
    createLinkSchema
}
