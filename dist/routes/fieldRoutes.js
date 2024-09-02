import express from 'express';
import { getFields } from '../controllers/fieldController';
const fieldRouter = express.Router();
fieldRouter.get('/', getFields);
export default fieldRouter;
