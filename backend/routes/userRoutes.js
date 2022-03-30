const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// POST
router.post('/', registerUser);
router.post('/login', loginUser);

// GET - USER DATA
router.get('/me', protect, getMe);

module.exports = router;
