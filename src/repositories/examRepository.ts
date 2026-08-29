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

  static async create(
    title: string,
    description: string,
    courseId: number,
    startsAt: string,
    endsAt: string
  ) {

    const query = `
      INSERT INTO exams (
        title,
        description,
        course_id,
        starts_at,
        ends_at
      )
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;

    const result = await pool.query(
      query,
      [
        title,
        description,
        courseId,
        startsAt,
        endsAt
      ]
    );

    return result.rows[0];
  }

  static async update(
    id: number,
    title: string,
    description: string,
    courseId: number,
    startsAt: string,
    endsAt: string
  ) {

    const query = `
      UPDATE exams
      SET
        title = $1,
        description = $2,
        course_id = $3,
        starts_at = $4,
        ends_at = $5
      WHERE id = $6
      RETURNING *
    `;

    const result = await pool.query(
      query,
      [
        title,
        description,
        courseId,
        startsAt,
        endsAt,
        id
      ]
    );

    return result.rows[0];
  }

  static async delete(id: number) {
    const query =
      'DELETE FROM exams WHERE id = $1 RETURNING *';

    const result =
      await pool.query(query, [id]);

    return result.rows[0];
  }
}