import express, { Router } from 'express';
import {
  addCharacter,
  getCharacters
} from '../controllers/characterController.js';

const characterRouter: Router = express.Router();

characterRouter.post('/add', addCharacter);
characterRouter.get('/', getCharacters);

export default characterRouter;
