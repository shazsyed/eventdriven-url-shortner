const mongoose = require("mongoose")

const connectMongoWithRetry = function () {
  return mongoose.connect(process.env.MONGO_URL).then(
    () => console.log("Connected to MongoDB"),
    (err) => {
      console.log("Failed to connect to MongoDB, retrying in 5 seconds" + err)
      setTimeout(connectMongoWithRetry, 5000)
    }
  )
}

module.exports = connectMongoWithRetry
