import express from 'express';
import { addCourse, getAllCourses, getCourseById, updateCourse, addModule, deleteCourse, getModulesByCourseId, addQA, getQuestionsByModuleId } from '../controllers/course.controller.js';

const router = express.Router();

router.post('/', addCourse);
router.get('/', getAllCourses);
router.get('/:id', getCourseById);
router.put('/:id', updateCourse);
router.delete('/:id', deleteCourse);
router.post('/:id/modules', addModule);
router.get('/:id/modules', getModulesByCourseId);
router.post('/:id/modules/:moduleId/questions', addQA);
router.get('/:id/modules/:moduleId/questions', getQuestionsByModuleId);
export default router;