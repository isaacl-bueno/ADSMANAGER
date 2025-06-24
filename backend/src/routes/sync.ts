const express = require('express');
const { syncController } = require('../controllers/syncController');

const router = express.Router();

// POST /api/sync/:platform
router.post('/:platform', syncController.syncPlatform);

module.exports = router; 