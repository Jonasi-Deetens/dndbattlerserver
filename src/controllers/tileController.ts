import { Request, Response } from 'express';
import prisma from '../prisma.js';

const getTiles = async (req: Request, res: Response) => {
  try {
    const allTiles = await prisma.tile.findMany({
      include: { tileType: true }
    });

    return res.status(201).json(allTiles);
  } catch (error) {
    return res.status(500).json({ msg: 'Server error' });
  }
};

export { getTiles };
