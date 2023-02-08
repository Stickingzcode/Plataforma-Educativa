const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role, school: user.school },
    process.env.JWT_SECRET || 'dev_secret',
    { expiresIn: '1h' }
  );
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET || 'dev_secret');
};

module.exports = { generateToken, verifyToken };
