import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { pool } from './config/db';

import authRoutes from './routes/authRoutes';
import studentRoutes from './routes/studentRoutes';
import courseRoutes from './routes/courseRoutes';
import examRoutes from './routes/examRoutes';

dotenv.config();

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/exams', examRoutes);

app.get('/', (req, res) => {
  res.json({
    message: 'API QCM en ligne fonctionnelle.'
  });
});

app.get('/api/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');

    res.json({
      status: 'ok',
      db: 'connected'
    });
  } catch {
    res.status(500).json({
      status: 'error',
      message: 'DB non disponible'
    });
  }
});

app.use((
  err: any,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  console.error(err);

  res.status(500).json({
    message: 'Erreur interne du serveur'
  });
});

export default app;