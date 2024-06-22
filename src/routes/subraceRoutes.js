import express from 'express';
import { getSubraces } from '../controllers/subraceController.js';

const subraceRouter = express.Router();

subraceRouter.get('/', getSubraces);

export default subraceRouter;
