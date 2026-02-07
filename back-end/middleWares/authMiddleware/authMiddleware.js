import jwt from 'jsonwebtoken';
import SECRET_KEY from '../../data/secret_key.js';
export const authMiddleWare = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader)
    return res.status(401).json({ isSuccess: false, message: "Authorization header missing" });

  const token = authHeader.split(' ')[1]; // Bearer <token>
  if (!token)
    return res.status(401).json({ isSuccess: false, message: "Invalid token" });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // ✅ attach logged-in user info
    next();
  } catch (err) {
    return res.status(403).json({ isSuccess: false, message: "Invalid or expired token" });
  }
};
