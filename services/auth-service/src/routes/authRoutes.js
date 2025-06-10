import express from 'express';
import { checkAuth,signup, login, logout } from '../controllers/auth.controller.js';

const router = express.Router();

router.get('/checking-auth', checkAuth)
router.post('/register',signup);
router.post('/login', login);
router.post('/logout', logout);

export default router;