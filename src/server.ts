import express, { Application } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import authRouter from './routes/authRoutes.js';
import cors from 'cors';
import upload from './config/multer.js';
import characterRouter from './routes/characterRoutes.js';
import classRouter from './routes/classRoutes.js';
import subraceRouter from './routes/subraceRoutes.js';
import raceRouter from './routes/raceRoutes.js';
import itemRouter from './routes/itemRoutes.js';
import subclassRouter from './routes/subclassRoutes.js';
import abilityRouter from './routes/abilityRoutes.js';
import skillRouter from './routes/skillRoutes.js';
import languageRouter from './routes/languageRoutes.js';
import spellRouter from './routes/spellRoutes.js';
import fieldRouter from './routes/fieldRoutes.js';
import tileRouter from './routes/tileRoutes';
import campaignRouter from './routes/campaignRoutes.js';
dotenv.config();

const app: Application = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRouter);
app.use('/api/characters', characterRouter);
app.use('/api/races', raceRouter);
app.use('/api/subraces', subraceRouter);
app.use('/api/classes', classRouter);
app.use('/api/subclasses', subclassRouter);
app.use('/api/items', itemRouter);
app.use('/api/abilities', abilityRouter);
app.use('/api/skills', skillRouter);
app.use('/api/languages', languageRouter);
app.use('/api/spells', spellRouter);
app.use('/api/fields', fieldRouter);
app.use('/api/tiles', tileRouter);
app.use('/api/campaigns', campaignRouter);

app.post('/upload', upload.single('image'), (req, res) => {
  if (req.file) {
    res.json({
      message: 'Image uploaded successfully',
      imageUrl: req.file.path,
    });
  } else {
    res.status(400).json({ error: 'Failed to upload image' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
