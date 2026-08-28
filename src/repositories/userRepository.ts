import { pool } from '../config/db';
import { User } from '../models/user';

export class UserRepository {
    async findByEmail(email: string): Promise<User | null> {
        const result = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );
        return result.rows[0] ?? null;
    }

    async findById(id: number): Promise<User | null> {
        const result = await pool.query(
            'SELECT * FROM users WHERE id = $1',
            [id]
        );
        return result.rows[0] ?? null;
    }
}