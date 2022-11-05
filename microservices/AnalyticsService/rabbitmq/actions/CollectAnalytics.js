const Analytics = require("../../models/Analytics")
const fetch = require("node-fetch")
const parser = require("ua-parser-js")

const collectAnalytic = async (data) => {
  try {
    const headers = data.headers
    const geoData = await getGeoData(data.ip_address)
    const newData = updatedInfo(geoData, headers)

    const result = await Analytics.updateOne(
      { slug: data.slug },
      { $inc: newData }
    )

    return result
  } catch (err) {
    console.log(err)
  }
}
const updatedInfo = (geoData, headers) => {
  const country = geoData?.country || "UNKNOWN"
  let UAresult = {}
  let refResult = {}

  if (headers["user-agent"]) {
    UAresult = getUAInfo(headers["user-agent"])
  }

  if (headers["referer"]) {
    refResult = getRefererInfo(headers["referer"])
  }

  const newData = {
    clicks: 1,
    [`countries.${country}`]: 1,
    ...UAresult,
    ...refResult,
  }

  return newData
}

const getUAInfo = (UAheader) => {
  const UAInfo = parser(UAheader)
  const browser = UAInfo?.browser?.name
  const deviceType = UAInfo?.device.type ? UAInfo?.device.type : "desktop"
  const info = { [`devices.${deviceType}`]: 1 }

  if (browser) {
    return { ...info, [`browsers.${browser}`]: 1 }
  }

  return info
}

const getGeoData = async (ip) => {
  try {
    const response = await fetch(`https://ipinfo.io/${ip}/json`)
    const geoData = await response.json()
    return geoData.bogon ? null : geoData
  } catch (err) {
    console.log(err)
    return null
  }
}

const getRefererInfo = (refURL) => {
  try {
    const socials = {
      twitter: ["t.co", "twitter.com", "www.twitter.com"],
      reddit: ["www.reddit.com", "reddit.com"],
      linkedin: ["lnkd.in", "www.linkedin.com", "linkedin.com"],
      facebook: ["www.facebook.com", "facebook.com"],
      youtube: ["www.youtube.com", "youtube.com"]
    }

    const url = new URL(refURL)
    const hostname = url.hostname
    let socialMedia

    for (const [key, value] of Object.entries(socials)) {
      if (value.includes(hostname)) {
        socialMedia = key
        break
      }
    }

    return socialMedia
      ? { [`socials.${socialMedia}`]: 1 }
      : { [`sources.${hostname.replaceAll('.', '_')}`]: 1 }

  } catch (err) {
    console.log(err)
  }
}

module.exports = collectAnalytic
