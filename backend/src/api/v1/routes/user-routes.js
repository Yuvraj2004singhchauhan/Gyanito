import express from 'express';
import { login, profile, register } from '../../../controllers/user-controller.js';
import { auth } from '../../../middleware/auth.js';

const router = express.Router();

router.get('/profile', auth, profile);
router.post('/login', login);
router.post('/register', register);

export default router;

