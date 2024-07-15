import prisma from '../prisma.js';

const getSpells = async (req, res) => {
  return res.status(200).json(res.locals.spells);
};

const getSpellsByList = async (req, res) => {
  const { list } = req.params;
  const listArray = list.split(',');
  const filteredSpells = res.locals.spells.filter(spell =>
    listArray.includes(spell.name)
  );
  return res.status(200).json(filteredSpells);
};

const fetchSpells = async (req, res, next) => {
  try {
    const allSpells = await prisma.spell.findMany();
    res.locals.spells = allSpells;
    next();
  } catch (error) {
    return res.status(500).json({ msg: 'Server error' });
  }
};

export { getSpells, getSpellsByList, fetchSpells };
