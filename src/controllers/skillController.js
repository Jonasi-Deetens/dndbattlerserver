import prisma from '../prisma.js';

const getSkills = async (req, res) => {
  try {
    const allSkills = await prisma.skill.findMany();

    return res.status(201).json(allSkills);
  } catch (error) {
    return res.status(500).json({ msg: 'Server error' });
  }
};

export { getSkills };
