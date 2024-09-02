import express, { Router } from 'express';
import {
  getSubraces,
  getSubracesByRace,
  getSubraceById
} from '../controllers/subraceController.js';

const subraceRouter: Router = express.Router();

subraceRouter.get('/', getSubraces);
subraceRouter.get('/byId/:id', getSubraceById);
subraceRouter.get('/byRace/:name', getSubracesByRace);

export default subraceRouter;
