// utils/createToken.js
const jwt = require('jsonwebtoken');

const createToken = (user, secret, expiresIn) => {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    secret,
    { expiresIn }
  );
};

module.exports = createToken;
