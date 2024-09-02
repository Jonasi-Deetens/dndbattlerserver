import express, { Router } from 'express';
import { getCampaigns } from '../controllers/campaignController.js';

const campaignRouter: Router = express.Router();

campaignRouter.get('/', getCampaigns);

export default campaignRouter;
