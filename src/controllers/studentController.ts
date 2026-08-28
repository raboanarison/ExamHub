import { Request, Response } from 'express';
import { StudentService } from '../services/studentService';

export class StudentController {
  static async getStudents(req: Request, res: Response) {
    try {
      const students = await StudentService.getAllStudents();
      return res.status(200).json(students);
    } catch (error) {
      return res.status(500).json({ error: "Erreur serveur" });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const student = await StudentService.createStudent(req.body);
      return res.status(201).json(student);
    } catch (error) {
      return res.status(500).json({ error: "Erreur lors de la création" });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const updated = await StudentService.updateStudent(req.params.id as string, req.body);
      return res.status(200).json(updated);
    } catch (error) {
      return res.status(500).json({ error: "Erreur lors de la modification" });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const deactivated = await StudentService.deactivateStudent(req.params.id as string);
      return res.status(200).json({ message: "Étudiant désactivé avec succès", deactivated });
    } catch (error) {
      return res.status(500).json({ error: "Erreur lors de la désactivation" });
    }
  }
}