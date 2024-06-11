import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import authRouter from './routes/authRoutes.js';
import cors from 'cors'

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRouter)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});