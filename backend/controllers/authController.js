const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    console.log("here2")
    const { firstName, lastName, username, password, email, phoneNumber } = req.body;

    try {
        console.log("here3")
        const userExists = await User.findOne({ username });
        if (userExists) {
            return res.status(400).json({ success: false, message: 'Username already exists' });
        }

        const newUser = new User({ firstName, lastName, username, password, email, phoneNumber });
        console.log("here412341234")
        console.log(JSON.stringify(newUser))
        await newUser.save();
        console.log("here5")

        res.status(201).json({ success: true, message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid username or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ success: false, message: 'Invalid username or password' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ success: true, token, userId: user._id, message: 'Login successful' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

module.exports = { registerUser, loginUser };
