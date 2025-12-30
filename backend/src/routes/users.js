const express = require('express');
const router = express.Router();

const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserStats
} = require('../controllers/userController');

const { authenticate, adminOnly } = require('../middleware/auth');
const {
  validateUserCreation,
  validateUserUpdate
} = require('../middleware/validation');

/**
 * @route   GET /api/users
 * @desc    Get all users with pagination and filtering
 * @access  Admin
 */
router.get('/', authenticate, adminOnly, getUsers);

/**
 * @route   GET /api/users/stats
 * @desc    Get user statistics
 * @access  Admin
 */
router.get('/stats', authenticate, adminOnly, getUserStats);

/**
 * @route   GET /api/users/:id
 * @desc    Get user by ID
 * @access  Admin
 */
router.get('/:id', authenticate, adminOnly, getUserById);

/**
 * @route   POST /api/users
 * @desc    Create a new user
 * @access  Admin
 */
router.post('/', authenticate, adminOnly, validateUserCreation, createUser);

/**
 * @route   PUT /api/users/:id
 * @desc    Update user
 * @access  Admin
 */
router.put('/:id', authenticate, adminOnly, validateUserUpdate, updateUser);

/**
 * @route   DELETE /api/users/:id
 * @desc    Delete user
 * @access  Admin
 */
router.delete('/:id', authenticate, adminOnly, deleteUser);

module.exports = router;
