const { HttpNotFound } = require("../utils/errors")
const AnalyticsService = require("../services/AnalyticsService")

const getAnalytics = async (req, res, next) => {
  try {
    const result = await AnalyticsService.getAnalyticsBySlug(req.params.slug)
    if (!result) {
      throw new HttpNotFound("No analytics data found for this slug")
    }
    res.status(200).json(result)
  } catch (err) {
    next(err)
  }
}

module.exports = { getAnalytics }
