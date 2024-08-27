import prisma from '../prisma.js';

const getFields = async (req, res) => {
  try {
    const allFields = await prisma.field.findMany();

    return res.status(201).json(allFields);
  } catch (error) {
    return res.status(500).json({ msg: 'Server error' });
  }
};

export { getFields };
