import express from 'express';
import {
  getSubclassById,
  getSubclasses
} from '../controllers/subclassController.js';

const subclassRouter = express.Router();

subclassRouter.get('/', getSubclasses);
subclassRouter.get('/byId/:id', getSubclassById);

export default subclassRouter;
