import express from 'express';
import { addCharacter, getCharacters } from '../controllers/characterController';
const characterRouter = express.Router();
characterRouter.post('/add', addCharacter);
characterRouter.get('/', getCharacters);
export default characterRouter;
