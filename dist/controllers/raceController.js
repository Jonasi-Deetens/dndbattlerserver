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
import prisma from '../prisma.js';
const getRaces = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const allRaces = yield prisma.race.findMany();
      return res.status(201).json(allRaces);
    } catch (error) {
      return res.status(500).json({ msg: 'Server error' });
    }
  });
const getRaceById = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
      const raceById = yield prisma.race.findUnique({
        where: {
          id: parseInt(id)
        },
        include: {
          senses: true,
          skills: true,
          spells: true,
          languages: true
        }
      });
      if (raceById) {
        return res.status(200).json(raceById);
      } else {
        return res.status(404).json({ msg: 'Race not found' });
      }
    } catch (error) {
      return res.status(500).json({ msg: 'Server error' });
    }
  });
const getRaceByName = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.params;
    try {
      const raceByName = yield prisma.race.findUnique({
        where: {
          name: name
        },
        include: { languages: true }
      });
      if (raceByName) {
        return res.status(200).json(raceByName);
      } else {
        return res.status(404).json({ msg: 'Race not found' });
      }
    } catch (error) {
      return res.status(500).json({ msg: 'Server error' });
    }
  });
export { getRaces, getRaceById, getRaceByName };
