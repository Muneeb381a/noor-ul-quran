const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/env');

const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Not authorized' });
  }
  const token = authHeader.split(' ')[1];
  try {
    req.user = jwt.verify(token, jwtSecret);
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = { protect };
