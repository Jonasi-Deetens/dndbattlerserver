import express from 'express';
import { getSkills } from '../controllers/skillController.js';

const skillRouter = express.Router();

skillRouter.get('/', getSkills);

export default skillRouter;
