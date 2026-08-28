import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import studentRoutes from './routes/studentRoutes';
import courseRoutes from './routes/courseRoutes';
import examRoutes from './routes/examRoutes';


dotenv.config();

const app: Application = express();

app.use(cors());
app.use(express.json());


app.use('/api/students', studentRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/exams', examRoutes);


app.get('/', (req, res) => {
  res.json({ message: 'API QCM en ligne fonctionnelle.' });
});

export default app;