import { verifyToken } from "../utils/token.js";

export const auth = (req, res, next) => {
  const header = req.headers['authorization'];

  if (!header) {
    return res.status(401).json({ message: 'UnAuthorized User' });
  }

  // Supports both "Bearer <token>" (recommended for the frontend) and a raw token
  const token = header.startsWith('Bearer ') ? header.slice(7) : header;

  try {
    const decoded = verifyToken(token);
    req.user = decoded; // downstream controllers can read req.user.email / req.user.id
    next();
  } catch (err) {
    return res.status(401).json({ message: 'UnAuthorized User' });
  }
};