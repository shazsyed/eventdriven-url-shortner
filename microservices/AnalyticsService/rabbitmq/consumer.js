const getRabbitChannel = require("./rabbit")
const initializeAnalytic = require("./actions/CreateAnalytics")
const collectAnalytic = require("./actions/CollectAnalytics")

const CREATE_QUEUE = "link-created"
const LINK_VIEW_QUEUE = "link-viewed"

const startConsumeEvents = async () => {
  try {
    const channel = await getRabbitChannel()
    channel.on("close", () => {
      console.log("RabbitMQ channel closed, retrying for new one")
      startConsumeEvents()
    })

    await channel.assertQueue(CREATE_QUEUE)
    channel.consume(CREATE_QUEUE, async (msg) => {
      if (msg !== null) {
        const data = JSON.parse(msg.content.toString())
        const result = await initializeAnalytic(data)
        if (result) {
          channel.ack(msg)
        }
      }
    })

    await channel.assertQueue(LINK_VIEW_QUEUE)
    channel.consume(LINK_VIEW_QUEUE, async (msg) => {
      if (msg !== null) {
        const data = JSON.parse(msg.content.toString())
        const result = await collectAnalytic(data)
        if (result) {
          channel.ack(msg)
        }
      }
    })
  } catch (err) {
    console.log(
      "Could not connect to RabbitMQ server, retrying in 5 seconds, error: " +
        err
    )
    setTimeout(startConsumeEvents, 5000)
  }
}

module.exports = startConsumeEvents
