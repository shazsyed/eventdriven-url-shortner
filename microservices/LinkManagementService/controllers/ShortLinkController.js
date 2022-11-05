const { publishCreateEvent, publishVisitEvent } = require("../rabbitmq/publisher")
const { HttpNotFound } = require("../utils/errors")
const ShortLinkService = require("../services/ShortLinkService")
const requestIp = require('request-ip')

const createLink = async (req, res, next) => {
  try {
    const data = req.body
    const result = await ShortLinkService.createShortLink(data)
    await publishCreateEvent({slug: result.slug})
    res.json(result)
  } catch (err) {
    next(err)
  }
}

const viewLink = async (req, res, next) => {
  try {
    const clientIp = requestIp.getClientIp(req)
    const data = { slug: req.params.slug, ip_address: clientIp, headers: req.headers }
    const { url } = await ShortLinkService.getUrlFromSlug(data)
    if (!url) {
      throw new HttpNotFound("No short link found with this slug")
    }
    await publishVisitEvent(data)
    res.status(301).redirect(url)
  } catch (err) {
    next(err)
  }
}

module.exports = {
  createLink,
  viewLink
}
