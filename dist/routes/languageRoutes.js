import express from 'express';
import { getLanguages } from '../controllers/languageController';
const languageRouter = express.Router();
languageRouter.get('/', getLanguages);
export default languageRouter;
