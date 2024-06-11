const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define CommunicationLog Schema
const CommunicationLogSchema = new Schema({
  name: { type: String, required: true ,unique:true },
  customerSelectionCriteria: [{
    field: { type: String, required: true },
    operator: { type: String, required: true },
    value: { type: Schema.Types.Mixed, required: true }
  }],
  selectedCustomers: [{ type: Schema.Types.ObjectId, ref: 'Customer' }],
  status: { type: String, enum: ['sent', 'failed', 'pending'], required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Define Model
const CommunicationLog = mongoose.model('CommunicationLog', CommunicationLogSchema);

module.exports = CommunicationLog;
