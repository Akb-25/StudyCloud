import express from 'express';
import { checkAuth,signup, login, logout } from '../controllers/auth.controller.js';
import protectRoute from "../middleware/auth.middleware.js"

const router = express.Router();

router.get('/checking-auth', protectRoute, checkAuth)
router.post('/register',signup);
router.post('/login', login);
router.post('/logout', logout);

export default router;