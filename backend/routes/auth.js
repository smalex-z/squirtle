const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');

const router = express.Router();

// Register new user
router.post('/signup', registerUser);

// Login existing user
router.post('/login', loginUser);

module.exports = router;
