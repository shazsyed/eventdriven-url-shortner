const express = require("express")
const connectMongoWithRetry = require("./utils/db")
const errorHandler = require("./middlewares/errorHandler")
const AnalyticsController = require("./controllers/AnalyticsController")
require("dotenv").config()

connectMongoWithRetry()

const app = express()
app.use(express.json())

app.get("/stats/:slug", AnalyticsController.getAnalytics)

app.use((req, res, next) => {
  res.status(404).json({
    message: "404 Not Found",
  })
})

app.use(errorHandler)
app.listen(process.env.PORT, () =>
  console.log(`Listening on port ${process.env.PORT}`)
)

