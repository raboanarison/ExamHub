import { Request, Response } from 'express';
import { ExamService } from '../services/examService';

export class ExamController {

  static async getAll(req: Request, res: Response) {
    try {
      const exams = await ExamService.getAllExams();

      return res.status(200).json(exams);

    } catch (error) {

      console.error("GET ALL EXAMS ERROR:", error);

      return res.status(500).json({
        message: 'Erreur lors de la récupération des examens.'
      });
    }
  }

  static async getById(req: Request, res: Response) {
    try {

      const { id } = req.params;

      const exam =
        await ExamService.getExamById(
          Number(id)
        );

      return res.status(200).json(exam);

    } catch (error: any) {

      console.error("GET EXAM ERROR:", error);

      if (error.message === 'EXAM_NOT_FOUND') {
        return res.status(404).json({
          message: 'Examen non trouvé.'
        });
      }

      return res.status(500).json({
        message: error.message || 'Erreur serveur.'
      });
    }
  }

  static async create(req: Request, res: Response) {
    try {

      const {
        title,
        description,
        course_id,
        starts_at,
        ends_at
      } = req.body;

      if (
        !title ||
        !course_id ||
        !starts_at ||
        !ends_at
      ) {
        return res.status(400).json({
          message:
            'Titre, cours, date de début et date de fin obligatoires.'
        });
      }

      const newExam =
        await ExamService.createExam(
          title,
          description,
          Number(course_id),
          starts_at,
          ends_at
        );

      return res.status(201).json(newExam);

    } catch (error: any) {

      console.error("CREATE EXAM ERROR:", error);

      return res.status(500).json({
        message:
          error.message ||
          'Erreur lors de la création de l’examen.'
      });
    }
  }

  static async update(req: Request, res: Response) {
    try {

      const { id } = req.params;

      const {
        title,
        description,
        course_id,
        starts_at,
        ends_at
      } = req.body;

      const updated =
        await ExamService.updateExam(
          Number(id),
          title,
          description,
          Number(course_id),
          starts_at,
          ends_at
        );

      return res.status(200).json(updated);

    } catch (error: any) {

      console.error("UPDATE EXAM ERROR:", error);

      if (error.message === 'EXAM_NOT_FOUND') {
        return res.status(404).json({
          message: 'Examen non trouvé.'
        });
      }

      return res.status(500).json({
        message:
          error.message ||
          'Erreur lors de la mise à jour.'
      });
    }
  }

  static async delete(req: Request, res: Response) {
    try {

      const { id } = req.params;

      const deleted =
        await ExamService.deleteExam(
          Number(id)
        );

      return res.status(200).json({
        message: 'Examen supprimé avec succès',
        deleted
      });

    } catch (error: any) {

      console.error("DELETE EXAM ERROR:", error);

      if (error.message === 'EXAM_NOT_FOUND') {
        return res.status(404).json({
          message: 'Examen non trouvé.'
        });
      }

      return res.status(500).json({
        message:
          error.message ||
          'Erreur lors de la suppression.'
      });
    }
  }
}