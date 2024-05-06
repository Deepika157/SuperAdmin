const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');


function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
  
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
  
      // Store decoded token data in request object for further use
      req.user = decoded;
      next();
    });
  }
  
  module.exports = { verifyToken };