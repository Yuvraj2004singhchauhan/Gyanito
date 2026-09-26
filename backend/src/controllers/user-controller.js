import { register as registerUser, login as loginUser } from "../services/user-service.js";
import UserModel from "../models/user-model.js";

export const login = async (req, res) => {
  const userObject = req.body;
  try {
    const obj = await loginUser(userObject);
    res.status(obj.success ? 200 : 401).json(obj);
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: 'Login Fail Server Crash...' });
  }
}

export const register = async (req, res) => {
  const userObject = req.body;
  try {
    const message = await registerUser(userObject);
    res.status(201).json({ message: message });
  } catch (err) {
    console.log('Caught in Controller ---> ', err);
    // Duplicate email (Mongo unique index) should be a 409, not a generic 500
    if (err.code === 11000) {
      return res.status(409).json({ message: 'Email already registered' });
    }
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: err.message });
    }
    res.status(500).json({ message: 'Error During Register, Server Crash' });
  }
}

// Requires the `auth` middleware to run first (sets req.user)
export const profile = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Could not fetch profile' });
  }
}