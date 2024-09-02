import express, { Router } from 'express';
import { getAbilities } from '../controllers/abilityController.js';

const abilitiesRouter: Router = express.Router();

abilitiesRouter.get('/', getAbilities);

export default abilitiesRouter;
