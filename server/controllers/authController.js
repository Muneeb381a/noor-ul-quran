const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/User');
const { jwtSecret, jwtExpires } = require('../config/env');

const signToken = (user) =>
  jwt.sign({ id: user.id, role: user.role }, jwtSecret, { expiresIn: jwtExpires });

exports.register = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { name, email, password, role } = req.body;
    const existing = await User.findByEmail(email);
    if (existing.rows.length) return res.status(409).json({ message: 'Email already in use' });

    const hashed = await bcrypt.hash(password, 10);
    const result = await User.create({ name, email, password: hashed, role: role || 'student' });
    const user = result.rows[0];

    res.status(201).json({ token: signToken(user), user });
  } catch (err) { next(err); }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await User.findByEmail(email);
    const user = result.rows[0];
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(401).json({ message: 'Invalid credentials' });

    const { password: _, ...safeUser } = user;
    res.json({ token: signToken(user), user: safeUser });
  } catch (err) { next(err); }
};

exports.getMe = async (req, res, next) => {
  try {
    const result = await User.findById(req.user.id);
    res.json(result.rows[0]);
  } catch (err) { next(err); }
};

exports.generateInvite = (req, res) => {
  const code = Math.random().toString(36).substring(2, 10).toUpperCase();
  res.json({ invite_code: code });
};
