const express = require('express');
const router = express.Router();
const { getActivityLogs, getActivityStats } = require('../controllers/activityController');
const { authenticate, adminOnly } = require('../middleware/auth');

/**
 * @route   GET /api/activity
 * @desc    Get activity logs with filtering and pagination
 * @access  Admin
 */
router.get('/', authenticate, adminOnly, getActivityLogs);

/**
 * @route   GET /api/activity/stats
 * @desc    Get activity statistics
 * @access  Admin
 */
router.get('/stats', authenticate, adminOnly, getActivityStats);

module.exports = router;
