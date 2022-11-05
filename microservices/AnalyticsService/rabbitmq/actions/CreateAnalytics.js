const Analytics = require("../../models/Analytics")

const initializeAnalytic = async (data) => {
  try {
    const newLink = new Analytics({ slug: data.slug })
    const result = await newLink.save()
    return result
  } catch (err) {
    console.log(err)
  }
}

module.exports = initializeAnalytic
