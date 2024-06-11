const Order = require('../models/Order');
const { publishToQueue } = require('../utils/pubsub');
const { validateOrderInput } = require('../utils/validateInput');

exports.addOrder = async (req, res) => {
  const { customer_id, amount, order_date } = req.body;

  const { errors, isValid } = validateOrderInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  try {
    const newOrder = new Order({ customer_id, amount, order_date });
    await publishToQueue('orderQueue', newOrder);
    res.status(200).json({ msg: 'Order data sent to queue' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
