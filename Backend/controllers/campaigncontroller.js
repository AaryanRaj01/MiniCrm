const Customer = require('../models/Customer');
const CommunicationLog = require('../models/CommunicationLog');

// Function to send messages to campaign audience
const sendMessageToCampaign = async (req, res) => {
  const { name, message } = req.body;
  console.log(name);
  try {
    // Find the communication log by campaign ID
    const log = await CommunicationLog.findOne({name});

    if (!log) {
      return res.status(404).json({ message: 'Campaign not found' });
    }
    // Retrieve the customer IDs from the communication log
    const customerIds = log.selectedCustomers;

    // Find the customers
    const customers = await Customer.find({ _id: { $in: customerIds } });

    // Here, you would implement the logic to send the message to the customers.
    // For demonstration purposes, we will just log the message sending.
    customers.forEach(customer => {
      console.log(`Sending message to ${customer.email}: ${message}`);
    });

    // Update the communication log status to 'completed'
    log.status = 'sent';
    await log.save();

    res.status(200).json({ message: 'Message sent to all campaign audience successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { sendMessageToCampaign };
