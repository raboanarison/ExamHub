import { pool } from '../config/db';

export class CourseRepository {
  static async findAll() {
    const query = 'SELECT * FROM courses ORDER BY id DESC';
    const result = await pool.query(query);
    return result.rows;
  }

  static async findById(id: number) {
    const query = 'SELECT * FROM courses WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async create(title: string, description: string) {
    const query = `
      INSERT INTO courses (title, description) 
      VALUES ($1, $2) 
      RETURNING *
    `;
    const result = await pool.query(query, [title, description]);
    return result.rows[0];
  }

  static async update(id: number, title: string, description: string) {
    const query = `
      UPDATE courses 
      SET title = $1, description = $2 
      WHERE id = $3 
      RETURNING *
    `;
    const result = await pool.query(query, [title, description, id]);
    return result.rows[0];
  }

  static async delete(id: number) {
    const query = 'DELETE FROM courses WHERE id = $1 RETURNING *';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }
}