import prisma from "../prisma.js";

const getClasses = async (req, res) => {
  try {
    const allClasses = await prisma.class.findMany();

    return res.status(201).json(allClasses);
  } catch (error) {
    return res.status(500).json({ msg: "Server error" });
  }
};

const getSpellsFromClass = async (req, res) => {
  const { className } = req.params;

  try {
    const classByName = await prisma.class.findUnique({
      where: { name: className },
      include: { spells: true },
    });

    return res.status(201).json(classByName.spells);
  } catch (error) {
    return res.status(500).json({ msg: "Server error" });
  }
};

export { getClasses, getSpellsFromClass };
