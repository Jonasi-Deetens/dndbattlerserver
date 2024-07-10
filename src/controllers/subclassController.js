import prisma from '../prisma.js';

const getSubclasses = async (req, res) => {
  try {
    const allSubclasses = await prisma.subclass.findMany();

    return res.status(201).json(allSubclasses);
  } catch (error) {
    return res.status(500).json({ msg: 'Server error' });
  }
};

export { getSubclasses };
