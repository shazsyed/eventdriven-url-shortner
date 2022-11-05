const mongoose = require("mongoose")

const ShortLinkSchema = mongoose.Schema({
  slug: {
    type: String,
    max: 7,
    require: true,
    unique: true,
  },
  url: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  clicks: {
    type: Number,
    default: 0,
  },
  countries: {
    type: Map,
    of: Number,
  },
})

module.exports = mongoose.model("ShortLink", ShortLinkSchema)
