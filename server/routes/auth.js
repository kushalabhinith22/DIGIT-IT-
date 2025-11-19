// routes/auth.js
const express = require('express');
const router = express.Router();
const { signupValidator, loginValidator } = require('../validators/authValidators');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const createToken = require('../utils/createToken');

router.post('/signup', signupValidator, async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ success: false, message: errors.array()[0].msg });

    const { email, password, role, teacherId } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ success: false, message: 'Email already registered' });

    if (role === 'student') {
      const teacher = await User.findById(teacherId);
      if (!teacher || teacher.role !== 'teacher') return res.status(400).json({ success: false, message: 'Invalid teacherId' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({ email, passwordHash, role, teacherId: role === 'student' ? teacherId : undefined });
    await user.save();

    const token = createToken(user, process.env.JWT_SECRET, process.env.JWT_EXPIRES_IN || '7d');
    res.json({ success: true, token, user: { id: user._id, email: user.email, role: user.role, teacherId: user.teacherId } });
  } catch (err) {
    next(err);
  }
});

router.post('/login', loginValidator, async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ success: false, message: errors.array()[0].msg });

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ success: false, message: 'Invalid email or password' });

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) return res.status(400).json({ success: false, message: 'Invalid email or password' });

    const token = createToken(user, process.env.JWT_SECRET, process.env.JWT_EXPIRES_IN || '7d');
    res.json({ success: true, token, user: { id: user._id, email: user.email, role: user.role, teacherId: user.teacherId } });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
