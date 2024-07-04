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

    return res.status(201).json({ allCharacters });
  } catch (error) {
    return res.status(500).json({ msg: 'Server error' });
  }
};

const addCharacter = async (req, res) => {
  const { characterData } = req.body;
  try {
    console.log(characterData);
    const { languages, ...characterInfo } = characterData;
    const character = await prisma.character.create({
      data: {
        ...characterInfo,
        languages: {
          create: languages.map(language => ({
            language: { connect: { id: language.id } }
          }))
        }
      },
      include: {
        languages: {
          include: {
            language: true
          }
        }
      }
    });
    return res.status(201).json({ character });
  } catch (error) {
    return res.status(500).json({ msg: 'Server error' });
  }
};

export { addCharacter, getCharacters };
