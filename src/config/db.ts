import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT) || 5432,
});

pool.query('SELECT NOW()')
  .then(() => console.log('Connecté à PostgreSQL'))
  .catch((err) => console.error('Erreur de connexion à PostgreSQL :', err.message));