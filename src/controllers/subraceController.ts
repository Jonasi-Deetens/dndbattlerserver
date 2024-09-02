import { Request, Response } from 'express';
import prisma from '../prisma.js';

const getSubraces = async (req: Request, res: Response) => {
  try {
    const allSubraces = await prisma.subrace.findMany();

    return res.status(201).json(allSubraces);
  } catch (error) {
    return res.status(500).json({ msg: 'Server error' });
  }
};

const getSubracesByRace = async (req: Request, res: Response) => {
  const { name } = req.params;
  try {
    const subracesByRace = await prisma.subrace.findMany({
      where: {
        parentRace: {
          name: name
        }
      }
    });

    return res.status(201).json(subracesByRace);
  } catch (error) {
    return res.status(500).json({ msg: 'Server error' });
  }
};

const getSubraceById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const subraceById = await prisma.subrace.findUnique({
      where: {
        id: parseInt(id)
      },
      include: {
        senses: true,
        skills: true,
        spells: true,
        languages: true
      }
    });

    return res.status(201).json(subraceById);
  } catch (error) {
    return res.status(500).json({ msg: 'Server error' });
  }
};

export { getSubraces, getSubracesByRace, getSubraceById };
