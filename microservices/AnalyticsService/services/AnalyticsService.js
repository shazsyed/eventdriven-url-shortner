const Analytics = require("../models/Analytics")

const getAnalyticsBySlug = async (slug) => {
  try {
    const result = await Analytics.findOne({ slug: slug }).select({
      _id: 0,
      __v: 0,
    })
    return result
  } catch (err) {
    throw new Error(err)
  }
}


module.exports = { getAnalyticsBySlug }
