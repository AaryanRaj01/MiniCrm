const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  amount: { type: Number, required: true },
  order_date: { type: Date, required: true },
});

module.exports = mongoose.model('Order', orderSchema);
