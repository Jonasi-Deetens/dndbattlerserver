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
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const register = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, username } = req.body;
    try {
      const existingUser = yield prisma.user.findUnique({ where: { email } });
      if (existingUser)
        return res.status(400).json({ msg: 'User already exists' });
      const hashedPassword = yield bcrypt.hash(password, 10);
      const user = yield prisma.user.create({
        data: { email, password: hashedPassword, username }
      });
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: '24h'
      });
      const userData = {
        id: user.id,
        email: user.email,
        username: user.username
      };
      console.log('registered');
      return res.status(201).json({ token, userData });
    } catch (error) {
      return res.status(500).json({ msg: 'Server error' });
    }
  });
const login = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
      const user = yield prisma.user.findUnique({
        where: { email },
        include: { characters: true }
      });
      if (!user)
        return res
          .status(400)
          .json({ msg: 'There is no account with this email.' });
      const isMatch = yield bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ msg: 'Password is incorrect' });
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: '24h'
      });
      const userData = {
        id: user.id,
        email: user.email,
        username: user.username,
        characters: user.characters
      };
      return res.status(201).json({ token, userData });
    } catch (error) {
      return res.status(500).json({ msg: 'Server error' });
    }
  });
export { register, login };
