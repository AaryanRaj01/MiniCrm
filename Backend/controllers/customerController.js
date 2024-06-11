const Customer = require('../models/Customer');
const { publishToQueue } = require('../utils/pubsub');
const { validateCustomerInput } = require('../utils/validateInput');

exports.addCustomer = async (req, res) => {
  const { name, email, total_spends, visits, last_visited } = req.body;

  const { errors, isValid } = validateCustomerInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  try {
    const newCustomer = new Customer({ name, email, total_spends, visits, last_visited });
    await publishToQueue('customerQueue', newCustomer);
    res.status(200).json({ msg: 'Customer data sent to queue' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
