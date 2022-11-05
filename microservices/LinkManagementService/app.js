const express = require("express")
const cors = require("cors")
const connectMongoWithRetry = require("./utils/db")
require("dotenv").config()

connectMongoWithRetry()

const shortnerRoutes = require("./routes/shortnerRoutes")
const errorHandler = require("./middlewares/errorHandler")

const app = express()
app.use(cors())
app.use(express.json())

app.use("/", shortnerRoutes)

app.use((req, res, next) => {
  res.status(404).json({
    message: "404 Not Found",
  })
})

app.use(errorHandler)

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`)
})
