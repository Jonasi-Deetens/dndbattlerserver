import express from 'express';
import { getAbilities } from '../controllers/abilityController';
const abilitiesRouter = express.Router();
abilitiesRouter.get('/', getAbilities);
export default abilitiesRouter;
