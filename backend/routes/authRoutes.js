import express from 'express';
import { register, verifyEmail, verifyDebug, login } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);
router.get('/verify/:token', verifyEmail);
router.get('/verify-debug/:email', verifyDebug);
router.post('/login', login);

export default router;
