import { Router } from 'express';
import { ExamController } from '../controllers/examController';


const router = Router();



router.get('/', ExamController.getAll);
router.post('/', ExamController.create);
router.get('/:id', ExamController.getById);
router.put('/:id', ExamController.update);
router.delete('/:id', ExamController.delete);

export default router;