import { Request, Response } from 'express';
import {
  Item,
  Language,
  Skill,
  Sense,
  Spell,
  Ability,
  Obstacle,
  Membership,
  Relationship
} from '@prisma/client';
import prisma from '../prisma.js';

const getCharacters = async (req: Request, res: Response) => {
  const userId = req.query.userId as string;

  try {
    const allCharacters = await prisma.character.findMany({
      where: { userId: userId },
      include: {
        race: true,
        class: true,
        subclass: true,
        subrace: true,
        skills: true,
        languages: true,
        items: true,
        senses: true,
        spells: true,
        abilities: true,
        relationships: true,
        obstacles: true
      }
    });

    return res.status(200).json({ allCharacters });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Server error' });
  }
};

const addCharacter = async (req: Request, res: Response) => {
  const { characterData } = req.body;

  try {
    console.log(characterData);

    const {
      languages,
      skills,
      obstacles,
      memberships,
      relationships,
      items,
      abilities,
      spells,
      senses,
      raceId,
      subraceId,
      classId,
      subclassId,
      userId,
      ...characterInfo
    } = characterData;

    const data = {
      ...characterInfo,
      user: { connect: { id: userId } },
      race: { connect: { id: raceId } },
      class: { connect: { id: classId } },
      languages: {
        connect: languages.map((language: Language) => ({ id: language.id }))
      },
      skills: { connect: skills.map((skill: Skill) => ({ id: skill.id })) },
      items: { connect: items.map((item: Item) => ({ id: item.id })) },
      senses: { connect: senses.map((sense: Sense) => ({ id: sense.id })) },
      spells: { connect: spells.map((spell: Spell) => ({ id: spell.id })) },
      abilities: {
        connect: abilities.map((ability: Ability) => ({ id: ability.id }))
      },
      obstacles: {
        connect: obstacles.map((obstacle: Obstacle) => ({ id: obstacle.id }))
      },
      memberships: {
        connect: memberships.map((membership: Membership) => ({
          id: membership.id
        }))
      },
      relationships: {
        connect: relationships.map((relationship: Relationship) => ({
          id: relationship.id
        }))
      }
    };

    if (subraceId) data.subrace = { connect: { id: subraceId } };
    if (subclassId) data.subclass = { connect: { id: subclassId } };

    const character = await prisma.character.create({
      data,
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
        abilities: true
      }
    });

    return res.status(201).json({ character });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Server error' });
  }
};

export { addCharacter, getCharacters };
