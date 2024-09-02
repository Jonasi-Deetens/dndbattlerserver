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
const getSubraces = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const allSubraces = yield prisma.subrace.findMany();
      return res.status(201).json(allSubraces);
    } catch (error) {
      return res.status(500).json({ msg: 'Server error' });
    }
  });
const getSubracesByRace = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.params;
    try {
      const subracesByRace = yield prisma.subrace.findMany({
        where: {
          parentRace: {
            name: name
          }
        }
      });
      return res.status(201).json(subracesByRace);
    } catch (error) {
      return res.status(500).json({ msg: 'Server error' });
    }
  });
const getSubraceById = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
      const subraceById = yield prisma.subrace.findUnique({
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
      return res.status(201).json(subraceById);
    } catch (error) {
      return res.status(500).json({ msg: 'Server error' });
    }
  });
export { getSubraces, getSubracesByRace, getSubraceById };
