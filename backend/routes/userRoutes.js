const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
} = require('../controllers/userController');

// POST
router.post('/', registerUser);
router.post('/login', loginUser);

// GET - USER DATA
router.get('/me', getMe);

module.exports = router;
