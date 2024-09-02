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
const getClasses = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const allClasses = yield prisma.class.findMany();
      return res.status(201).json(allClasses);
    } catch (error) {
      return res.status(500).json({ msg: 'Server error' });
    }
  });
const getClassById = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
      const classById = yield prisma.class.findUnique({
        where: {
          id: parseInt(id)
        },
        include: {
          items: true,
          spells: true
        }
      });
      if (classById) {
        return res.status(200).json(classById); // Use 200 for successful GET request
      } else {
        return res.status(404).json({ msg: 'Class not found' }); // 404 if not found
      }
    } catch (error) {
      return res.status(500).json({ msg: 'Server error' });
    }
  });
const getSpellsFromClass = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { className } = req.params;
    try {
      const classByName = yield prisma.class.findUnique({
        where: { name: className },
        include: { spells: true }
      });
      if (!classByName)
        return res.status(400).json({ msg: 'Class not found.' });
      return res.status(201).json(classByName.spells);
    } catch (error) {
      return res.status(500).json({ msg: 'Server error' });
    }
  });
export { getClasses, getClassById, getSpellsFromClass };
