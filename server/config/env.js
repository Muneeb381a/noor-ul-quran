require('dotenv').config();

module.exports = {
  port: process.env.PORT || 5000,
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  jwtSecret: process.env.JWT_SECRET,
  jwtExpires: process.env.JWT_EXPIRES || '7d',
  nodeEnv: process.env.NODE_ENV || 'development',
};
