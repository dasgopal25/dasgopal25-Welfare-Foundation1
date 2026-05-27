const express = require('express');
const router = express.Router();
const { getDashboardStats } = require('../../controllers/admin/dashboardController');
const { protect } = require('../../middleware/authMiddleware');
const { admin } = require('../../middleware/adminMiddleware');

router.get('/stats', protect, admin, getDashboardStats);

module.exports = router;
