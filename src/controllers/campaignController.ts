import { Request, Response } from 'express';
import prisma from '../prisma.js';

const getCampaigns = async (req: Request, res: Response) => {
  try {
    const allCampaigns = await prisma.campaign.findMany({
      include: {
        fields: true
      }
    });

    return res.status(201).json(allCampaigns);
  } catch (error) {
    return res.status(500).json({ msg: 'Server error' });
  }
};

export { getCampaigns };
