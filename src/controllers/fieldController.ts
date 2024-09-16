import { Request, Response } from 'express';
import prisma from '../prisma.js';

const getFields = async (req: Request, res: Response) => {
  try {
    const allFields = await prisma.field.findMany({
      include: {
        floorTile: true,
        wallTile: true,
        overlayTile: true,
        objectTile: true,
        roofTile: true
      }
    });

    return res.status(201).json(allFields);
  } catch (error) {
    return res.status(500).json({ msg: 'Server error' });
  }
};

export { getFields };
