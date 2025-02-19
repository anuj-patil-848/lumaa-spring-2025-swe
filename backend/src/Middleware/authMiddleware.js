const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Expects 'Bearer <token>'

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Access denied. Invalid token.' });
    }

    req.user = user; 
    
    if (!req.user.userId) {
      return res.status(401).json({ message: 'Access denied. User ID missing from token.' });
    }

    next(); 
  });
};

module.exports = authenticateJWT;
