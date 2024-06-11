import jwt from 'jsonwebtoken';
import prisma from '../prisma.js';

const auth = async (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) return res.status(401).json({ msg: 'No token, authorization denied.'});

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await prisma.user.findUnique({ where: { id: decoded.userId } });
        if (!req.user) return res.status(401).json({ msg: 'No user found.'});
        next();
    } catch (error) {
        return res.status(401).json({ msg: 'Invalid token'});
    }
}

export default auth;