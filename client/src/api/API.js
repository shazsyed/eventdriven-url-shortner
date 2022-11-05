const axios = require("axios")

export const createShortLink = (data) => {
  return axios.post("/s/short", data)
}

export const getAnalytics = async (slug) => {
  try {
    const { data } = await axios.get(`/stats/${slug}`)
    return data
  } catch (err) {
    throw new Error(err)
  }
}
