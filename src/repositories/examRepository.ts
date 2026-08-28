import { pool } from '../config/db';

export class ExamRepository {
  static async findAll() {
    const query = 'SELECT * FROM exams ORDER BY id DESC';
    const result = await pool.query(query);
    return result.rows;
  }

  static async findById(id: number) {
    const query = 'SELECT * FROM exams WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async create(title: string, description: string, courseId: number) {
    const query = `
      INSERT INTO exams (title, description, course_id) 
      VALUES ($1, $2, $3) 
      RETURNING *
    `;
    const result = await pool.query(query, [title, description, courseId]);
    return result.rows[0];
  }

  static async update(id: number, title: string, description: string, courseId: number) {
    const query = `
      UPDATE exams 
      SET title = $1, description = $2, course_id = $3 
      WHERE id = $4 
      RETURNING *
    `;
    const result = await pool.query(query, [title, description, courseId, id]);
    return result.rows[0];
  }

  static async delete(id: number) {
    const query = 'DELETE FROM exams WHERE id = $1 RETURNING *';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }
}