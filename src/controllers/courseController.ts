import { Request, Response } from 'express';
import { CourseService } from '../services/courseService';

export class CourseController {
  static async getAll(req: Request, res: Response) {
    try {
      const courses = await CourseService.getAllCourses();
      return res.status(200).json(courses);
    } catch (error) {
      return res.status(500).json({ message: 'Erreur lors de la récupération des cours.' });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const { title, description } = req.body;
      if (!title) {
        return res.status(400).json({ message: 'Le titre du cours est obligatoire.' });
      }
      const newCourse = await CourseService.createCourse(title, description);
      return res.status(201).json(newCourse);
    } catch (error) {
      return res.status(500).json({ message: 'Erreur lors de la création du cours.' });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { title, description } = req.body;

      const updated = await CourseService.updateCourse(Number(id), title, description);
      return res.status(200).json(updated);
    } catch (error: any) {
      if (error.message === 'COURSE_NOT_FOUND') {
        return res.status(404).json({ message: 'Cours non trouvé.' });
      }
      return res.status(500).json({ message: 'Erreur lors de la mise à jour du cours.' });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deleted = await CourseService.deleteCourse(Number(id));
      return res.status(200).json({ message: 'Cours supprimé avec succès', deleted });
    } catch (error: any) {
      if (error.message === 'COURSE_NOT_FOUND') {
        return res.status(404).json({ message: 'Cours non trouvé.' });
      }
      return res.status(500).json({ message: 'Erreur lors de la suppression du cours.' });
    }
  }
}