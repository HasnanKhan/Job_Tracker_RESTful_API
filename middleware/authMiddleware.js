const jwt = require('jsonwebtoken');

// Middleware to protect routes and verify JWT token
function auth(req, res, next) {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    
    const cleanToken = token.startsWith('Bearer ') ? token.slice(7) : token;
    
    const decoded = jwt.verify(cleanToken, process.env.JWT_SECRET);
    req.user = decoded.userId; 
    next();
  } catch (err) {
    res.status(400).json({ msg: 'Invalid token' });
  }
}

module.exports = auth;