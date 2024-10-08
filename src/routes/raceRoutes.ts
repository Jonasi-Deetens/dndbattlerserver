import express, { Router } from 'express';
import {
  getRaces,
  getRaceById,
  getRaceByName
} from '../controllers/raceController.js';

const raceRouter: Router = express.Router();

raceRouter.get('/', getRaces);
raceRouter.get('/byId/:id', getRaceById);
raceRouter.get('/byName/:name', getRaceByName);

export default raceRouter;
