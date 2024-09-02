import express, { Router } from 'express';
import {
  getSubclassById,
  getSubclasses
} from '../controllers/subclassController.js';

const subclassRouter: Router = express.Router();

subclassRouter.get('/', getSubclasses);
subclassRouter.get('/byId/:id', getSubclassById);

export default subclassRouter;
