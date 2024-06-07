const express = require('express');
const { 
    registerUser, 
    loginUser,
    getUsers,
    getUser
} = require('../controllers/authController');

const router = express.Router();

// Register new user
router.post('/signup', registerUser);

// Login existing user
router.post('/login', loginUser);

//get userinfo for a single user
router.get('/', getUsers)

//get userinfo for a single user
router.get('/:id', getUser)

module.exports = router