import express from 'express';
import { getSpells, getSpellsByList } from '../controllers/spellController';
import { fetchSpells } from '../controllers/spellController';
const spellRouter = express.Router();
spellRouter.get('/', fetchSpells, getSpells);
spellRouter.get('/byList/:list', fetchSpells, getSpellsByList);
export default spellRouter;
