require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const customerRoutes = require('./routes/customerRoutes');
const orderRoutes = require('./routes/orderRoutes');
const customerlogRoutes = require('./routes/customerlogRoutes');
const customerloglistRoutes = require('./routes/compaignlistRoutes');
const { startConsumers } = require('./consumer');
const { connectDB } = require('./conifg/db');
const cors = require('cors')
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
// Database Connection
connectDB();

// Routes
app.use('/api/customers', customerRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/customerlog',customerlogRoutes);
app.use('/api/fetchcustomerloglist',customerloglistRoutes);
// Start consumers for pub-sub model
startConsumers();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
