import express from 'express';
import { getSubraces, getSubracesByRace, getSubraceById } from '../controllers/subraceController';
const subraceRouter = express.Router();
subraceRouter.get('/', getSubraces);
subraceRouter.get('/byId/:id', getSubraceById);
subraceRouter.get('/byRace/:name', getSubracesByRace);
export default subraceRouter;
