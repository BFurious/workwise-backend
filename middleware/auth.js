const jwt = require('jsonwebtoken');
const User = require('../models/user');

const verifyToken = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(403).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret');
    req.user = await User.findByPk(decoded.id);
    if (!req.user) {
      return res.status(404).json({ error: 'User not found' });
    }
    // if (req.user.role !== 'seller') {
    //   return res.status(403).json({ error: 'Access denied' });
    // }
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = { verifyToken };
