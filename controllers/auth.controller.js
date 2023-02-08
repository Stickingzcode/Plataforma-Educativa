const { User } = require('../models/User.model');
const { generateToken } = require('../services/auth.service');

exports.registerSuperadmin = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already in use' });
    const user = await User.create({ email, password, name, role: 'superadmin' });
    res.status(201).json({ token: generateToken(user), user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      return res.json({ token: generateToken(user), user });
    }
    return res.status(401).json({ message: 'Invalid credentials' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
