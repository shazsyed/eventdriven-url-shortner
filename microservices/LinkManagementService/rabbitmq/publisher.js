const getRabbitChannel = require("./rabbit")
const CREATE_QUEUE = "link-created"
const LINK_VIEW_QUEUE = "link-viewed"
let channel

const publishCreateEvent = async (msg) => {
  try {
    await channel.assertQueue(CREATE_QUEUE)
    channel.sendToQueue(CREATE_QUEUE, Buffer.from(JSON.stringify(msg)))
  } catch (err) {
    throw err
  }
}

const publishVisitEvent = async (msg) => {
  try {
    await channel.assertQueue(LINK_VIEW_QUEUE)
    channel.sendToQueue(LINK_VIEW_QUEUE, Buffer.from(JSON.stringify(msg)))
  } catch (err) {
    console.log(err)
  }
}

const setChannel = async () => {
  try {
    if (!channel) {
      channel = await getRabbitChannel()
      channel.on("close", () => {
        channel = null
        console.log("RabbitMQ channel closed, retrying for new one")
        setChannel()
      })
    }
  } catch (err) {
    console.log("Could not connect to RabbitMQ server, retrying in 5 seconds, error: " + err)
    setTimeout(setChannel, 5000)
  }
}

setChannel()

module.exports = { publishCreateEvent, publishVisitEvent }
