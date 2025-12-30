const express = require('express');
const router = express.Router();

const {
  register,
  login,
  getMe,
  updateProfile,
  changePassword
} = require('../controllers/authController');

const { authenticate } = require('../middleware/auth');
const {
  validateRegister,
  validateLogin,
  validateProfileUpdate,
  validatePasswordChange
} = require('../middleware/validation');

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
router.post('/register', validateRegister, register);

/**
 * @route   POST /api/auth/login
 * @desc    Login user
 * @access  Public
 */
router.post('/login', validateLogin, login);

/**
 * @route   GET /api/auth/me
 * @desc    Get current user profile
 * @access  Private
 */
router.get('/me', authenticate, getMe);

/**
 * @route   PUT /api/auth/me
 * @desc    Update user profile
 * @access  Private
 */
router.put('/me', authenticate, validateProfileUpdate, updateProfile);

/**
 * @route   PUT /api/auth/change-password
 * @desc    Change user password
 * @access  Private
 */
router.put('/change-password', authenticate, validatePasswordChange, changePassword);

module.exports = router;
