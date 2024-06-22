import express from 'express';
import { getRaces } from '../controllers/raceController.js';

const raceRouter = express.Router();

raceRouter.get('/', getRaces);

export default raceRouter;
