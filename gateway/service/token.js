const jwt = require("jsonwebtoken");
const { secret } = require('../config/index')

function generateAccessToken(data) {
  return jwt.sign(data, secret, { expiresIn: "1800s" });
}

function verifyAccessToken(token) {
  try {
    const decoded = jwt.verify(token, secret);
    return decoded
  } catch (err) {
    return 'error'
  }
 
}
module.exports = {
  generateAccessToken,
  verifyAccessToken
}

