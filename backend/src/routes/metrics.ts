const express = require('express');
const { metricsController } = require('../controllers/metricsController');

const router = express.Router();

// GET /api/metrics/kpis
router.get('/kpis', metricsController.getKPIs);

// GET /api/metrics/chart
router.get('/chart', metricsController.getChartData);

module.exports = router; 