// routes/customerRoutes.js
const express = require('express');
const { fetchCustomers } = require('../controllers/customerlog'); 
const {sendMessageToCampaign} = require('../controllers/campaigncontroller'); // Adjust the path accordingly

const router = express.Router();

router.post('/fetch-customers', fetchCustomers);
router.post('/send-message', sendMessageToCampaign);

module.exports = router;
