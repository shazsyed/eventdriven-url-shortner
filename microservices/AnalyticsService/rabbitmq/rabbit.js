const amqplib = require("amqplib")
const startConsumeEvents = require("./consumer.js")

const getChannel = async () => {
  try {
    const connection = await amqplib.connect(
      process.env.RABBITMQ_URL || "amqp://localhost:5672"
    )
    const channel = await connection.createChannel()
    return channel
  } catch (err) {
    throw err
  }
}

module.exports = getChannel
