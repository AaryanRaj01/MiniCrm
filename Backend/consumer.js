const amqp = require('amqplib/callback_api');
const Customer = require('./models/Customer');
const Order = require('./models/Order');

const processCustomerQueue = async (msg) => {
  try {
    const customerData = JSON.parse(msg.content.toString());
    const customer = new Customer(customerData);
    await customer.save();
    console.log('Customer added to DB');
  } catch (error) {
    console.error('Error processing customer queue:', error);
  }
};

const processOrderQueue = async (msg) => {
  try {
    const orderData = JSON.parse(msg.content.toString());
    const order = new Order(orderData);
    await order.save();
    console.log('Order added to DB');
  } catch (error) {
    console.error('Error processing order queue:', error);
  }
};


const startConsumers = () => {
  amqp.connect('amqp://localhost', (err, connection) => {
    if (err) {
      console.error('Failed to connect to RabbitMQ:', err.message);
      return;
    }
    console.log('Successfully connected to RabbitMQ');

    connection.createChannel((err, channel) => {
      if (err) {
        console.error('Failed to create a channel:', err.message);
        return;
      }
      console.log('Channel created');

      channel.assertQueue('customerQueue', { durable: true }, (err, _ok) => {
        if (err) {
          console.error('Failed to assert customerQueue:', err.message);
          return;
        }
        console.log('customerQueue asserted');
      });

      channel.assertQueue('orderQueue', { durable: true }, (err, _ok) => {
        if (err) {
          console.error('Failed to assert orderQueue:', err.message);
          return;
        }
        console.log('orderQueue asserted');
      });


      channel.consume('customerQueue', async (msg) => {
        await processCustomerQueue(msg);
        channel.ack(msg);
      });

      channel.consume('orderQueue', async (msg) => {
        await processOrderQueue(msg);
        channel.ack(msg);
      });


      console.log('Consumers started');
    });
  });
};

module.exports = { startConsumers };
