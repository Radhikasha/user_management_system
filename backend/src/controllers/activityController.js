const ActivityLog = require('../models/ActivityLog');
const User = require('../models/User');

/**
 * Log user activity
 * @param {string} userId - User ID
 * @param {string} action - Action type
 * @param {string} details - Additional details
 * @param {object} req - Express request object (for IP and user agent)
 */
const logActivity = async (userId, action, details = '', req = null) => {
  try {
    const activityData = {
      user: userId,
      action,
      details
    };

    if (req) {
      activityData.ipAddress = req.ip || req.connection.remoteAddress;
      activityData.userAgent = req.get('User-Agent');
    }

    await ActivityLog.create(activityData);
  } catch (error) {
    console.error('Error logging activity:', error);
  }
};

/**
 * Get activity logs (admin only)
 * GET /api/activity
 */
const getActivityLogs = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    // Build filter
    const filter = {};
    
    if (req.query.user) {
      filter.user = req.query.user;
    }
    
    if (req.query.action) {
      filter.action = req.query.action;
    }
    
    if (req.query.startDate && req.query.endDate) {
      filter.timestamp = {
        $gte: new Date(req.query.startDate),
        $lte: new Date(req.query.endDate)
      };
    } else if (req.query.days) {
      const days = parseInt(req.query.days);
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);
      filter.timestamp = { $gte: startDate };
    }

    // Get activities with user details
    const activities = await ActivityLog.find(filter)
      .populate('user', 'fullName email')
      .sort({ timestamp: -1 })
      .skip(skip)
      .limit(limit);

    // Get total count
    const total = await ActivityLog.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: activities,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get activity statistics (admin only)
 * GET /api/activity/stats
 */
const getActivityStats = async (req, res, next) => {
  try {
    const days = parseInt(req.query.days) || 7;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const stats = await ActivityLog.aggregate([
      {
        $match: {
          timestamp: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: '$action',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);

    const totalActivities = await ActivityLog.countDocuments({
      timestamp: { $gte: startDate }
    });

    const uniqueUsers = await ActivityLog.distinct('user', {
      timestamp: { $gte: startDate }
    });

    res.status(200).json({
      success: true,
      data: {
        totalActivities,
        uniqueUsers: uniqueUsers.length,
        actionBreakdown: stats,
        period: `${days} days`
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  logActivity,
  getActivityLogs,
  getActivityStats
};
