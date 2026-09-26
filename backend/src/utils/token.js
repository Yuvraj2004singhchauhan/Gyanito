import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not set. Add it to your environment variables (.env locally, and in Render/Vercel dashboard).');
}

export const generateToken = (payload) => {
  // payload can be an email string (legacy) or an object like {id, email, role}
  const data = typeof payload === 'string' ? { email: payload } : payload;
  return jwt.sign(data, JWT_SECRET, { expiresIn: '1h' });
};

export const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET); // returns the full decoded payload
};