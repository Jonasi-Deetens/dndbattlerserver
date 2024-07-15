import prisma from '../prisma.js';

const getClasses = async (req, res) => {
  try {
    const allClasses = await prisma.class.findMany();

    return res.status(201).json(allClasses);
  } catch (error) {
    return res.status(500).json({ msg: 'Server error' });
  }
};

const getClassById = async (req, res) => {
  const { id } = req.params;
  try {
    const classById = await prisma.class.findUnique({
      where: {
        id: parseInt(id)
      }
    });
    if (classById) {
      return res.status(200).json(classById); // Use 200 for successful GET request
    } else {
      return res.status(404).json({ msg: 'Class not found' }); // 404 if not found
    }
  } catch (error) {
    return res.status(500).json({ msg: 'Server error' });
  }
};

const getSpellsFromClass = async (req, res) => {
  const { className } = req.params;

  try {
    const classByName = await prisma.class.findUnique({
      where: { name: className },
      include: { spells: true }
    });

    return res.status(201).json(classByName.spells);
  } catch (error) {
    return res.status(500).json({ msg: 'Server error' });
  }
};

export { getClasses, getClassById, getSpellsFromClass };
