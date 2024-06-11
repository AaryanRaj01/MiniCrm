// communicationLogController.js

const CommunicationLog = require('../models/CommunicationLog');

// Controller function to fetch all campaigns from CommunicationLogs
const fetchcompaignlist = async (req, res) => {
  try {
    // Fetch all communication logs from the database
    const campaigns = await CommunicationLog.find();

    // Extract necessary fields for each campaign and calculate selected customers size
    const formattedCampaigns = campaigns.map(campaign => {
      const selectedcustomersize = campaign.selectedCustomers.length;
      return {
        _id: campaign._id,
        name: campaign.name,
        createdAt: campaign.createdAt,
        selectedcustomersize: selectedcustomersize,
        status: campaign.status
        // Add more fields if needed
      };
    });

    res.status(200).json({ campaigns: formattedCampaigns });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { fetchcompaignlist };
