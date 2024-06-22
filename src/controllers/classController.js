import prisma from '../prisma.js';

const getClasses = async (req, res) => {
  try {
    const allClasses = await prisma.class.findMany();

    return res.status(201).json(allClasses);
  } catch (error) {
    return res.status(500).json({ msg: 'Server error' });
  }
};

export { getClasses };
