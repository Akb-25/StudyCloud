import express from 'express';
import { updateProgress, getProgressByUserId } from '../controllers/progress.controller.js';
import { auth } from "../middleware/auth.middleware.js";

const router = express.Router()

// router.post('/update', auth, updateProgress);
// router.get('/:courseId', auth, getProgressByUserId);
router.post('/update', updateProgress);
router.get('/:courseId', getProgressByUserId);

export default router;