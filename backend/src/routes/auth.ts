const express = require('express');
const { authController } = require('../controllers/authController');

const router = express.Router();

// POST /api/auth/login
router.post('/login', authController.login);

// POST /api/auth/logout
router.post('/logout', authController.logout);

// GET /api/auth/me
router.get('/me', authController.getCurrentUser);

module.exports = router; 