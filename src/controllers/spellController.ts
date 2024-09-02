import { Request, Response, NextFunction } from 'express';
import prisma from '../prisma.js';
import { Spell } from '@prisma/client';

const getSpells = async (req: Request, res: Response) => {
  return res.status(200).json(res.locals.spells);
};

const getSpellsByList = async (req: Request, res: Response) => {
  const { list } = req.params;
  const listArray = list.split(',');
  const filteredSpells = res.locals.spells.filter((spell: Spell) =>
    listArray.includes(spell.name)
  );
  return res.status(200).json(filteredSpells);
};

const fetchSpells = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allSpells = await prisma.spell.findMany();
    res.locals.spells = allSpells;
    next();
  } catch (error) {
    return res.status(500).json({ msg: 'Server error' });
  }
};

export { getSpells, getSpellsByList, fetchSpells };
