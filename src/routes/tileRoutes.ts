import express, { Router } from 'express';
import { getTiles } from '../controllers/tileController';

const tileRouter: Router = express.Router();

tileRouter.get('/', getTiles);

export default tileRouter;
