import prisma from '../prisma.js';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const register = async (req: Request, res: Response) => {
  const { email, password, username } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser)
      return res.status(400).json({ msg: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, username }
    });
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: '24h'
      }
    );
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
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: { characters: true }
    });
    if (!user)
      return res
        .status(400)
        .json({ msg: 'There is no account with this email.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Password is incorrect' });

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: '24h'
      }
    );
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
};

export { register, login };
