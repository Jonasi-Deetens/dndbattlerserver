import { Request, Response } from 'express';
import prisma from '../prisma.js';

const getItems = async (req: Request, res: Response) => {
  try {
    const allItems = await prisma.item.findMany();

    return res.status(201).json(allItems);
  } catch (error) {
    return res.status(500).json({ msg: 'Server error' });
  }
};

export { getItems };
