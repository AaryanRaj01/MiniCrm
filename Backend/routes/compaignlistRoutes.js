// routes/communicationLogRoutes.js

const express = require('express');
const router = express.Router();
const communicationLogController = require('../controllers/fetchcompaignlist');

// Route to fetch all campaigns
router.get('/fetchcommunicationloglist', communicationLogController.fetchcompaignlist);

module.exports = router;
