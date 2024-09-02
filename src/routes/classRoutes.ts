import express, { Router } from 'express';
import {
  getClasses,
  getSpellsFromClass,
  getClassById
} from '../controllers/classController.js';

const classRouter: Router = express.Router();

classRouter.get('/', getClasses);
classRouter.get('/byId/:id', getClassById);
classRouter.get('/spells/:className', getSpellsFromClass);

export default classRouter;
