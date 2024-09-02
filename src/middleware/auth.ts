import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import prisma from '../prisma.js';

interface JwtPayload {
  userId: string; // Add other properties if your token includes more claims
}

const auth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied.' });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    req.user = await prisma.user.findUnique({
      where: { id: decoded.userId }
    });

    if (!req.user) {
      return res.status(401).json({ msg: 'No user found.' });
    }

    next();
  } catch (error) {
    return res.status(401).json({ msg: 'Invalid token' });
  }
};

export default auth;
