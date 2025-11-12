const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  // const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>
  console.log(req.cookies.accessToken);
  const accessToken = req.cookies.accessToken;
  if (!accessToken) {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      accessToken = authHeader.split(' ')[1];
    }
  }
  if (!accessToken) {
    return res.status(403).json({ message: 'Access token is required for authentication' });
  }
  try {
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).send('Invalid Token');
  }
}


module.exports = verifyToken;