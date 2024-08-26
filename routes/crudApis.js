// routes/users.js
const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Get User Data (assuming authentication middleware to get user ID)
router.get('/:emailId', async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                email: req.params.emailId
            },
            attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
        });
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update User Data
router.put('/:emailId', async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                email: req.params.emailId
            }
        });
        if (!user) return res.status(404).json({ error: 'User not found' });
        await user.update(req.body);
        res.status(200).json(user.email);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete User
router.delete('/:emailId', async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                email: req.params.emailId
            }
        });
        if (!user) return res.status(404).json({ error: 'User not found' });
        await user.destroy();
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
