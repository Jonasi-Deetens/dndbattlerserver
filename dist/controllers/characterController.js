var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
import prisma from '../prisma.js';
const getCharacters = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.query.userId;
    try {
      const allCharacters = yield prisma.character.findMany({
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
  });
const addCharacter = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
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
          userId
        } = characterData,
        characterInfo = __rest(characterData, [
          'languages',
          'skills',
          'obstacles',
          'memberships',
          'relationships',
          'items',
          'abilities',
          'spells',
          'senses',
          'raceId',
          'subraceId',
          'classId',
          'subclassId',
          'userId'
        ]);
      const data = Object.assign(Object.assign({}, characterInfo), {
        user: { connect: { id: userId } },
        race: { connect: { id: raceId } },
        class: { connect: { id: classId } },
        languages: {
          connect: languages.map(language => ({ id: language.id }))
        },
        skills: { connect: skills.map(skill => ({ id: skill.id })) },
        items: { connect: items.map(item => ({ id: item.id })) },
        senses: { connect: senses.map(sense => ({ id: sense.id })) },
        spells: { connect: spells.map(spell => ({ id: spell.id })) },
        abilities: {
          connect: abilities.map(ability => ({ id: ability.id }))
        },
        obstacles: {
          connect: obstacles.map(obstacle => ({ id: obstacle.id }))
        },
        memberships: {
          connect: memberships.map(membership => ({
            id: membership.id
          }))
        },
        relationships: {
          connect: relationships.map(relationship => ({
            id: relationship.id
          }))
        }
      });
      if (subraceId) data.subrace = { connect: { id: subraceId } };
      if (subclassId) data.subclass = { connect: { id: subclassId } };
      const character = yield prisma.character.create({
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
  });
export { addCharacter, getCharacters };
