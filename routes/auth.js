const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const router = express.Router();

// Register Route
router.post('/register', async (req, res) => {
    const { name, email, phone_number, password, role } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            name,
            email,
            phone_number,
            password: hashedPassword,
            role,
        });
        res.json(newUser);
    } catch (err) {
        res.status(500).json({ error: 'Failed to register user' });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(400).json({ error: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ id: user.id }, 'your_jwt_secret');
        res.json({ token:token, role:user.role});
    } catch (err) {
        res.status(500).json({ error: 'Failed to login user' });
    }
});

module.exports = router;
