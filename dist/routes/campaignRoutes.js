import express from 'express';
import { getCampaigns } from '../controllers/campaignController';
const campaignRouter = express.Router();
campaignRouter.get('/', getCampaigns);
export default campaignRouter;
