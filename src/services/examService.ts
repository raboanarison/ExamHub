import { ExamRepository } from '../repositories/examRepository';

export class ExamService {
  static async getAllExams() {
    return await ExamRepository.findAll();
  }

  static async getExamById(id: number) {
    const exam = await ExamRepository.findById(id);
    if (!exam) {
      throw new Error('EXAM_NOT_FOUND');
    }
    return exam;
  }

  static async createExam(title: string, description: string, courseId: number) {
    if (!title || !courseId) {
      throw new Error('MISSING_FIELDS');
    }
    return await ExamRepository.create(title, description, courseId);
  }

  static async updateExam(id: number, title: string, description: string, courseId: number) {
    const exam = await ExamRepository.update(id, title, description, courseId);
    if (!exam) {
      throw new Error('EXAM_NOT_FOUND');
    }
    return exam;
  }

  static async deleteExam(id: number) {
    const exam = await ExamRepository.delete(id);
    if (!exam) {
      throw new Error('EXAM_NOT_FOUND');
    }
    return exam;
  }
}