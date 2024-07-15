import express from 'express';
import { getSpells, getSpellsByList } from '../controllers/spellController.js';
import { fetchSpells } from '../controllers/spellController.js';

const spellRouter = express.Router();

spellRouter.get('/', fetchSpells, getSpells);
spellRouter.get('/byList/:list', fetchSpells, getSpellsByList);

export default spellRouter;
