import prisma from "../prisma.js";

const getSubraces = async (req, res) => {
  try {
    const allSubraces = await prisma.subrace.findMany();

    return res.status(201).json(allSubraces);
  } catch (error) {
    return res.status(500).json({ msg: "Server error" });
  }
};

const getSubracesByRace = async (req, res) => {
  const { name } = req.params;
  try {
    const subracesByRace = await prisma.subrace.findMany({
      where: {
        Race: {
          name: name,
        },
      },
    });

    return res.status(201).json(subracesByRace);
  } catch (error) {
    return res.status(500).json({ msg: "Server error" });
  }
};

const getSubraceById = async (req, res) => {
  const { id } = req.params;
  try {
    const subraceById = await prisma.subrace.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    return res.status(201).json(subraceById);
  } catch (error) {
    return res.status(500).json({ msg: "Server error" });
  }
};

export { getSubraces, getSubracesByRace, getSubraceById };
