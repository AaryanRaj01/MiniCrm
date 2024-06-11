const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  total_spends: { type: Number, default: 0 },
  visits: { type: Number, default: 0 },
  last_visited: { type: Date },
});

module.exports = mongoose.model('Customer', customerSchema);
