import express from 'express';
import { getSubclasses } from '../controllers/subclassController.js';

const subclassRouter = express.Router();

subclassRouter.get('/', getSubclasses);

export default subclassRouter;
