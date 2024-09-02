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
const getSpells = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    return res.status(200).json(res.locals.spells);
  });
const getSpellsByList = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { list } = req.params;
    const listArray = list.split(',');
    const filteredSpells = res.locals.spells.filter(spell =>
      listArray.includes(spell.name)
    );
    return res.status(200).json(filteredSpells);
  });
const fetchSpells = (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const allSpells = yield prisma.spell.findMany();
      res.locals.spells = allSpells;
      next();
    } catch (error) {
      return res.status(500).json({ msg: 'Server error' });
    }
  });
export { getSpells, getSpellsByList, fetchSpells };
