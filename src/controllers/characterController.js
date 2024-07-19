import prisma from "../prisma.js";

const getCharacters = async (req, res) => {
  const { userId } = req.query;
  try {
    const allCharacters = await prisma.character.findMany({
      where: { userId: userId },
      // include: {
      //   race: true,
      //   class: true,
      //   subrace: true,
      //   primarySkills: { include: { skill: true } },
      //   languages: { include: { language: true } },
      //   items: { include: { item: true } },
      //   senses: { include: { sense: true } },
      //   spells: { include: { spell: true } },
      //   CharacterAbility: { include: { abilityScore: true } },
      //   relationships: true,
      //   organizations: true,
      //   enemies: { include: { enemy: true } }
      // }
    });

    return res.status(201).json({ allCharacters });
  } catch (error) {
    return res.status(500).json({ msg: "Server error" });
  }
};

const addCharacter = async (req, res) => {
  const { characterData } = req.body;
  try {
    console.log(characterData);
    const {
      languages,
      skills,
      items,
      abilities,
      spells,
      senses,
      race,
      subrace,
      class: charClass,
      subclass,
      ...characterInfo
    } = characterData;

    const character = await prisma.character.create({
      data: {
        ...characterInfo,
        race: { connect: { id: race.id } },
        subrace: subrace ? { connect: { id: subrace.id } } : undefined,
        class: { connect: { id: charClass.id } },
        subclass: subclass ? { connect: { id: subclass.id } } : undefined,
        languages: {
          connect: languages.map((language) => ({
            id: language.id,
          })),
        },
        skills: {
          connect: skills.map((skill) => ({
            id: skill.id,
          })),
        },
        items: {
          connect: items.map((item) => ({
            id: item.id,
          })),
        },
        senses: {
          connect: senses.map((sense) => ({
            id: sense.id,
          })),
        },
        spells: {
          connect: spells.map((spell) => ({
            id: spell.id,
          })),
        },
        abilities: {
          connect: abilities.map((ability) => ({
            id: ability.id,
          })),
        },
      },
      include: {
        race: true,
        subrace: true,
        class: true,
        subclass: true,
        languages: true,
        skills: true,
        items: true,
        senses: true,
        spells: true,
        abilities: true,
      },
    });

    return res.status(201).json({ character });
  } catch (error) {
    return res.status(500).json({ msg: "Server error" });
  }
};

export { addCharacter, getCharacters };
