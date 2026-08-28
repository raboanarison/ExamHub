import { pool } from '../config/db';

export class QuestionRepository {
  static async findByExamId(examId: number) {
    const query = 'SELECT * FROM questions WHERE exam_id = $1 ORDER BY id ASC';
    const result = await pool.query(query, [examId]);
    return result.rows;
  }

  static async create(examId: number, text: string, choices: any[]) {
    
    const query = `
      INSERT INTO questions (exam_id, text, choices) 
      VALUES ($1, $2, $3) 
      RETURNING *
    `;
    const result = await pool.query(query, [examId, text, JSON.stringify(choices)]);
    return result.rows[0];
  }

  static async update(id: number, text: string, choices: any[]) {
    const query = `
      UPDATE questions 
      SET text = $1, choices = $2 
      WHERE id = $3 
      RETURNING *
    `;
    const result = await pool.query(query, [text, JSON.stringify(choices), id]);
    return result.rows[0];
  }

  static async delete(id: number) {
    const query = 'DELETE FROM questions WHERE id = $1 RETURNING *';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }
}