import { Request, Response } from 'express';
import { QuestionService } from '../services/questionService';

export class QuestionController {
  static async getByExam(req: Request, res: Response) {
    try {
      const { id } = req.params; 
      const questions = await QuestionService.getQuestionsByExam(Number(id));
      return res.status(200).json(questions);
    } catch (error) {
      return res.status(500).json({ message: 'Erreur lors de la récupération des questions.' });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const { id } = req.params; // id de l'examen
      const { text, choices } = req.body;

      const newQuestion = await QuestionService.createQuestion(Number(id), text, choices);
      return res.status(201).json(newQuestion);
    } catch (error: any) {
      if (error.message === 'INVALID_CHOICES_COUNT') {
        return res.status(400).json({ message: 'Une question doit contenir entre 2 et 6 choix.' });
      }
      if (error.message === 'EXACTLY_ONE_CORRECT_CHOICE_REQUIRED') {
        return res.status(400).json({ message: 'Il doit y avoir exactement un seul choix correct.' });
      }
      return res.status(500).json({ message: 'Erreur lors de la création de la question.' });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params; 
      const { text, choices } = req.body;

      const updated = await QuestionService.updateQuestion(Number(id), text, choices);
      return res.status(200).json(updated);
    } catch (error: any) {
      if (error.message === 'INVALID_CHOICES_COUNT') {
        return res.status(400).json({ message: 'Une question doit contenir entre 2 et 6 choix.' });
      }
      if (error.message === 'EXACTLY_ONE_CORRECT_CHOICE_REQUIRED') {
        return res.status(400).json({ message: 'Il doit y avoir exactement un seul choix correct.' });
      }
      if (error.message === 'QUESTION_NOT_FOUND') {
        return res.status(404).json({ message: 'Question non trouvée.' });
      }
      return res.status(500).json({ message: 'Erreur lors de la mise à jour.' });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deleted = await QuestionService.deleteQuestion(Number(id));
      return res.status(200).json({ message: 'Question supprimée avec succès', deleted });
    } catch (error: any) {
      if (error.message === 'QUESTION_NOT_FOUND') {
        return res.status(404).json({ message: 'Question non trouvée.' });
      }
      return res.status(500).json({ message: 'Erreur lors de la suppression.' });
    }
  }
}