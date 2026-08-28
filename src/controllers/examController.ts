import { Request, Response } from 'express';
import { ExamService } from '../services/examService';

export class ExamController {
  static async getAll(req: Request, res: Response) {
    try {
      const exams = await ExamService.getAllExams();
      return res.status(200).json(exams);
    } catch (error) {
      return res.status(500).json({ message: 'Erreur lors de la récupération des examens.' });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const exam = await ExamService.getExamById(Number(id));
      return res.status(200).json(exam);
    } catch (error: any) {
      if (error.message === 'EXAM_NOT_FOUND') {
        return res.status(404).json({ message: 'Examen non trouvé.' });
      }
      return res.status(500).json({ message: 'Erreur serveur.' });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const { title, description, course_id } = req.body;
      if (!title || !course_id) {
        return res.status(400).json({ message: 'Titre et ID du cours obligatoires.' });
      }
      const newExam = await ExamService.createExam(title, description, course_id);
      return res.status(201).json(newExam);
    } catch (error) {
      return res.status(500).json({ message: 'Erreur lors de la création de l’examen.' });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { title, description, course_id } = req.body;
      const updated = await ExamService.updateExam(Number(id), title, description, course_id);
      return res.status(200).json(updated);
    } catch (error: any) {
      if (error.message === 'EXAM_NOT_FOUND') {
        return res.status(404).json({ message: 'Examen non trouvé.' });
      }
      return res.status(500).json({ message: 'Erreur lors de la mise à jour.' });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deleted = await ExamService.deleteExam(Number(id));
      return res.status(200).json({ message: 'Examen supprimé avec succès', deleted });
    } catch (error: any) {
      if (error.message === 'EXAM_NOT_FOUND') {
        return res.status(404).json({ message: 'Examen non trouvé.' });
      }
      return res.status(500).json({ message: 'Erreur lors de la suppression.' });
    }
  }
}