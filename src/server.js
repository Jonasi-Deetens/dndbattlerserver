import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import authRouter from './routes/authRoutes.js';
import cors from 'cors';
import characterRouter from './routes/characterRoutes.js';
import classRouter from './routes/classRoutes.js';
import subraceRouter from './routes/subraceRoutes.js';
import raceRouter from './routes/raceRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRouter);
app.use('/api/characters', characterRouter);
app.use('/api/races', raceRouter);
app.use('/api/subraces', subraceRouter);
app.use('/api/classes', classRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
