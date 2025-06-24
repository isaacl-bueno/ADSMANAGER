const express = require('express');
const { aiController } = require('../controllers/aiController');

const router = express.Router();

// GET /api/ai/insights
router.get('/insights', aiController.getInsights);

// POST /api/ai/recommendations
router.post('/recommendations', aiController.generateRecommendations);

module.exports = router; 