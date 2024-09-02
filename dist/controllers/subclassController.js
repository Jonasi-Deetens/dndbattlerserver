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
const getSubclasses = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const allSubclasses = yield prisma.subclass.findMany();
      return res.status(201).json(allSubclasses);
    } catch (error) {
      return res.status(500).json({ msg: 'Server error' });
    }
  });
const getSubclassById = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
      const subclassById = yield prisma.subclass.findUnique({
        where: {
          id: parseInt(id)
        },
        include: {
          spells: true
        }
      });
      if (subclassById) {
        return res.status(200).json(subclassById);
      } else {
        return res.status(404).json({ msg: 'Subclass not found' });
      }
    } catch (error) {
      return res.status(500).json({ msg: 'Server error' });
    }
  });
export { getSubclassById, getSubclasses };
