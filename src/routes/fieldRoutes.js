import express from 'express';
import { getFields } from '../controllers/fieldController.js';

const fieldRouter = express.Router();

fieldRouter.get('/', getFields);

export default fieldRouter;
