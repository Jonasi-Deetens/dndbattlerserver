import { Request, Response } from 'express';
import prisma from '../prisma.js';

const getSubclasses = async (req: Request, res: Response) => {
  try {
    const allSubclasses = await prisma.subclass.findMany();

    return res.status(201).json(allSubclasses);
  } catch (error) {
    return res.status(500).json({ msg: 'Server error' });
  }
};

const getSubclassById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const subclassById = await prisma.subclass.findUnique({
      where: {
        id: parseInt(id)
      },
      include: {
        spells: true
      }
    });
    if (subclassById) {
      return res.status(200).json(subclassById);
    } else {
      return res.status(404).json({ msg: 'Subclass not found' });
    }
  } catch (error) {
    return res.status(500).json({ msg: 'Server error' });
  }
};

export { getSubclassById, getSubclasses };
