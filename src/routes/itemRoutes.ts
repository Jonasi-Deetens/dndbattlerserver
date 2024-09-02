import express, { Router } from 'express';
import { getItems } from '../controllers/itemController.js';

const itemRouter: Router = express.Router();

itemRouter.get('/', getItems);

export default itemRouter;
