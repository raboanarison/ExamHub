import { Router } from 'express';
import { QuestionController } from '../controllers/questionController';


const router = Router();




router.get('/exams/:id/questions', QuestionController.getByExam);
router.post('/exams/:id/questions', QuestionController.create);

router.put('/questions/:id', QuestionController.update);
router.delete('/questions/:id', QuestionController.delete);

export default router;