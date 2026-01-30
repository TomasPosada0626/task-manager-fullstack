import { Router } from 'express';
import { createTask, getTasks, getTaskById, updateTask, deleteTask } from '../controllers/taskController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { validateTaskInput } from '../middlewares/validateTaskInput';

const router = Router();

router.use(authMiddleware);


router.post('/', validateTaskInput, createTask);
router.get('/', getTasks);
router.get('/:id', getTaskById);
router.put('/:id', validateTaskInput, updateTask);
router.delete('/:id', deleteTask);

export default router;
