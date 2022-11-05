const mongoose = require("mongoose")

const AnalyticsSchema = new mongoose.Schema({
  slug: {
    type: String,
    max: 7,
    require: true,
    unique: true,
  },
  clicks: {
    type: Number,
    default: 0,
  },
  countries: {
    type: Map,
    of: Number,
  },
  browsers: {
    type: Map,
    of: Number,
  },
  devices: {
    type: Map,
    of: Number,
  },
  sources: {
    type: Map,
    of: Number,
  },
  socials: {
    type: Map,
    of: Number,
  }
})

module.exports = mongoose.model("Analytics", AnalyticsSchema)
