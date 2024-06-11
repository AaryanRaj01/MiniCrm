// controllers/customerController.js
const Customer = require('../models/Customer');
const CommunicationLog = require('../models/CommunicationLog');

// Helper function to build the MongoDB query
function buildQuery(criteria, logic) {
  const query = [];

  criteria.forEach(rule => {
    const { field, operator, value } = rule;

    let mongoOperator;
    switch (operator) {
      case '>':
        mongoOperator = '$gt';
        break;
      case '<':
        mongoOperator = '$lt';
        break;
      case '=':
        mongoOperator = '$eq';
        break;
      default:
        throw new Error(`Unsupported operator: ${operator}`);
    }

    let mongoField;
    switch (field) {
      case 'visits':
        mongoField = 'visits';
        break;
      case 'last_visited':
        mongoField = 'last_visited';
        break;
      case 'total_spends':
        mongoField = 'total_spends';
        break;
      default:
        throw new Error(`Unsupported field: ${field}`);
    }

    const condition = { [mongoField]: { [mongoOperator]: value } };
    query.push(condition);
  });

  return { [`$${logic}`]: query };
}

// Controller function to handle fetching customers based on criteria
const fetchCustomers = async (req, res) => {
  const { name, criteria, logic } = req.body;

  try {
    // Validate logic
    if (!['and', 'or'].includes(logic)) {
      throw new Error('Unsupported logic operator. Use "and" or "or".');
    }

    // Build the query from criteria
    const query = buildQuery(criteria, logic);

    // Find customers matching the criteria
    const selectedCustomers = await Customer.find(query);

    // Create a communication log
    const log = new CommunicationLog({
      name,
      customerSelectionCriteria: criteria,
      selectedCustomers: selectedCustomers.map(customer => customer._id),
      status: 'pending'
    });

    await log.save();

    res.status(200).json({
      message: 'Customers fetched successfully',
      customers: selectedCustomers
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { fetchCustomers };
