const express = require('express');
const { campaignController } = require('../controllers/campaignController');

const router = express.Router();

// GET /api/campaigns
router.get('/', campaignController.getCampaigns);

// GET /api/campaigns/:id
router.get('/:id', campaignController.getCampaignById);

// GET /api/campaigns/:id/metrics
router.get('/:id/metrics', campaignController.getCampaignMetrics);

// POST /api/campaigns
router.post('/', campaignController.createCampaign);

// PUT /api/campaigns/:id
router.put('/:id', campaignController.updateCampaign);

// DELETE /api/campaigns/:id
router.delete('/:id', campaignController.deleteCampaign);

module.exports = router; 