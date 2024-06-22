import prisma from '../prisma.js';

const getRaces = async (req, res) => {
  try {
    const allRaces = await prisma.race.findMany();

    return res.status(201).json(allRaces);
  } catch (error) {
    return res.status(500).json({ msg: 'Server error' });
  }
};

export { getRaces };
