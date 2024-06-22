import prisma from '../prisma.js';

const getCharacters = async (req, res) => {
  const { userId } = req.query;
  try {
    const allCharacters = await prisma.character.findMany({
      where: { userId: userId },
      include: {
        race: true,
        class: true,
        subrace: true,
        primarySkills: { include: { skill: true } },
        languages: { include: { language: true } },
        items: { include: { item: true } },
        senses: { include: { sense: true } },
        spells: { include: { spell: true } },
        CharacterAbility: { include: { abilityScore: true } },
        relationships: true,
        organizations: true,
        enemies: { include: { enemy: true } }
      }
    });
    console.log(allCharacters);

    return res.status(201).json({ allCharacters });
  } catch (error) {
    return res.status(500).json({ msg: 'Server error' });
  }
};

const addCharacter = async (req, res) => {
  //
};

export { addCharacter, getCharacters };
