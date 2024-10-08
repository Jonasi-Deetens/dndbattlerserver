import express from 'express';
import { getClasses, getSpellsFromClass, getClassById } from '../controllers/classController';
const classRouter = express.Router();
classRouter.get('/', getClasses);
classRouter.get('/byId/:id', getClassById);
classRouter.get('/spells/:className', getSpellsFromClass);
export default classRouter;
