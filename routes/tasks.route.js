import express from 'express';
import { newTask, getMyTask, updateTask, deleteTask } from '../controllers/tasks.controller.js';
import { isAuthenticated } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/new', isAuthenticated, newTask);

router.get('/all', isAuthenticated, getMyTask);

router.route('/:id').put(isAuthenticated, updateTask).delete(isAuthenticated, deleteTask);

export default router;