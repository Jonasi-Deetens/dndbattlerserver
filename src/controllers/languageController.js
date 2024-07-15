import prisma from "../prisma.js";

const getLanguages = async (req, res) => {
  try {
    const allLanguages = await prisma.language.findMany();

    return res.status(201).json(allLanguages);
  } catch (error) {
    return res.status(500).json({ msg: "Server error" });
  }
};

export { getLanguages };
