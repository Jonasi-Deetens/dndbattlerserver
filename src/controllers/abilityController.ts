import { Request, Response } from 'express';
import prisma from '../prisma.js';

const getAbilities = async (req: Request, res: Response) => {
  try {
    const allAbilities = await prisma.ability.findMany();

    return res.status(201).json(allAbilities);
  } catch (error) {
    return res.status(500).json({ msg: 'Server error' });
  }
};

export { getAbilities };
