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
const getCampaigns = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const allCampaigns = yield prisma.campaign.findMany({
        include: {
          fields: true
        }
      });
      return res.status(201).json(allCampaigns);
    } catch (error) {
      return res.status(500).json({ msg: 'Server error' });
    }
  });
export { getCampaigns };
