const ShortLink = require("../models/ShortLink")
const { nanoid } = require("nanoid")

const createShortLink = async (data) => {
  try {
    const { url } = data
    const slug = nanoid(7)
    const shortLink = new ShortLink({ slug, url })
    const result = await shortLink.save()
    return { slug: result.slug, url: result.url, createdAt: result.createdAt }
  } catch (err) {
    throw new Error(err)
  }
}

const getUrlFromSlug = async (data) => {
  try {
    const result = await ShortLink.findOne({ slug: data.slug })
    return result ? { url: result.url } : {}
  } catch (err) {
    throw new Error(err)
  }
}

const getStats = async (slug) => {
  try {
    const result = await ShortLink.findOne({slug: slug}).select({_id: 0, __v: 0})
    return result
  } catch (err) {
    throw new Error(err)
  }
}

module.exports = {
  createShortLink,
  getUrlFromSlug,
  getStats
}
