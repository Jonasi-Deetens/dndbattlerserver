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
import jwt from 'jsonwebtoken';
import prisma from '../prisma.js';
const auth = (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token =
      (_a = req.header('Authorization')) === null || _a === void 0
        ? void 0
        : _a.split(' ')[1];
    if (!token) {
      return res.status(401).json({ msg: 'No token, authorization denied.' });
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = yield prisma.user.findUnique({
        where: { id: decoded.userId }
      });
      if (!req.user) {
        return res.status(401).json({ msg: 'No user found.' });
      }
      next();
    } catch (error) {
      return res.status(401).json({ msg: 'Invalid token' });
    }
  });
export default auth;
