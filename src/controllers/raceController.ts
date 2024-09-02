import { Request, Response } from 'express';
import prisma from '../prisma.js';

const getRaces = async (req: Request, res: Response) => {
  try {
    const allRaces = await prisma.race.findMany();

    return res.status(201).json(allRaces);
  } catch (error) {
    return res.status(500).json({ msg: 'Server error' });
  }
};

const getRaceById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const raceById = await prisma.race.findUnique({
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
    if (raceById) {
      return res.status(200).json(raceById);
    } else {
      return res.status(404).json({ msg: 'Race not found' });
    }
  } catch (error) {
    return res.status(500).json({ msg: 'Server error' });
  }
};

const getRaceByName = async (req: Request, res: Response) => {
  const { name } = req.params;
  try {
    const raceByName = await prisma.race.findUnique({
      where: {
        name: name
      },
      include: { languages: true }
    });
    if (raceByName) {
      return res.status(200).json(raceByName);
    } else {
      return res.status(404).json({ msg: 'Race not found' });
    }
  } catch (error) {
    return res.status(500).json({ msg: 'Server error' });
  }
};

export { getRaces, getRaceById, getRaceByName };
