import prisma from '../prisma.js';

const getSubraces = async (req, res) => {
  try {
    const allSubraces = await prisma.subrace.findMany();

    return res.status(201).json(allSubraces);
  } catch (error) {
    return res.status(500).json({ msg: 'Server error' });
  }
};

export { getSubraces };
