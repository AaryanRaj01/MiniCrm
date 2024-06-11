const amqp = require('amqplib');

const publishToQueue = async (queue, message) => {
  try {
    const connection = await amqp.connect('amqps://obhqnbfp:SquwyL_S1ZqO-TSmKnmwobgRe3Nuy3mQ@puffin.rmq2.cloudamqp.com/obhqnbfp');
    const channel = await connection.createChannel();
    await channel.assertQueue(queue, { durable: true });
    await channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
    setTimeout(() => { connection.close(); }, 1000);
  } catch (error) {
    console.error('Error publishing message to queue:', error);
  }
};

module.exports = { publishToQueue };
