import express, { Router } from 'express';
import { getFields } from '../controllers/fieldController.js';

const fieldRouter: Router = express.Router();

fieldRouter.get('/', getFields);

export default fieldRouter;
