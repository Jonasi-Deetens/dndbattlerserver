import express, { Router } from 'express';
import { getLanguages } from '../controllers/languageController.js';

const languageRouter: Router = express.Router();

languageRouter.get('/', getLanguages);

export default languageRouter;
