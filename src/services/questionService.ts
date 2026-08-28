import { QuestionRepository } from '../repositories/questionRepository';

export class QuestionService {
  static async getQuestionsByExam(examId: number) {
    return await QuestionRepository.findByExamId(examId);
  }

  static async createQuestion(examId: number, text: string, choices: { text: string; isCorrect: boolean }[]) {
    // Vérification : entre 2 et 6 choix
    if (!choices || choices.length < 2 || choices.length > 6) {
      throw new Error('INVALID_CHOICES_COUNT');
    }

    // Vérification : exactement 1 choix correct
    const correctCount = choices.filter(c => c.isCorrect).length;
    if (correctCount !== 1) {
      throw new Error('EXACTLY_ONE_CORRECT_CHOICE_REQUIRED');
    }

    return await QuestionRepository.create(examId, text, choices);
  }

  static async updateQuestion(id: number, text: string, choices: { text: string; isCorrect: boolean }[]) {
    if (!choices || choices.length < 2 || choices.length > 6) {
      throw new Error('INVALID_CHOICES_COUNT');
    }

    const correctCount = choices.filter(c => c.isCorrect).length;
    if (correctCount !== 1) {
      throw new Error('EXACTLY_ONE_CORRECT_CHOICE_REQUIRED');
    }

    const updated = await QuestionRepository.update(id, text, choices);
    if (!updated) {
      throw new Error('QUESTION_NOT_FOUND');
    }
    return updated;
  }

  static async deleteQuestion(id: number) {
    const deleted = await QuestionRepository.delete(id);
    if (!deleted) {
      throw new Error('QUESTION_NOT_FOUND');
    }
    return deleted;
  }
}