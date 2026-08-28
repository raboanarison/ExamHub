import {pool} from '../config/db';

export class StudentRepository {
  static async findAll() {
    const result = await pool.query('SELECT * FROM users WHERE role = $1', ['student']);
    return result.rows;
  }

  static async create(email: string, passwordHash: string) {
    const result = await pool.query(
      'INSERT INTO users (email, password, role, is_active) VALUES ($1, $2, $3, $4) RETURNING *',
      [email, passwordHash, 'student', true]
    );
    return result.rows[0];
  }

  static async update(id: string, email: string) {
    const result = await pool.query(
      'UPDATE users SET email = $1 WHERE id = $2 AND role = $3 RETURNING *',
      [email, id, 'student']
    );
    return result.rows[0];
  }

  static async softDelete(id: string) {
    // Le sujet demande : "Le DELETE doit désactiver l'étudiant" (is_active = false)
    const result = await pool.query(
      'UPDATE users SET is_active = $1 WHERE id = $2 AND role = $3 RETURNING *',
      [false, id, 'student']
    );
    return result.rows[0];
  }
}