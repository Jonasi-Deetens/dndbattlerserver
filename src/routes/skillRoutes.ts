import express, { Router } from 'express';
import { getSkills } from '../controllers/skillController.js';

const skillRouter: Router = express.Router();

skillRouter.get('/', getSkills);

export default skillRouter;
