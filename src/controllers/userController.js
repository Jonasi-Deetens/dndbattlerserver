import prisma from "../prisma.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const register = async (req, res) => {
    const { email, password, name } = req.body;

    try {
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) res.status(400).json({ msg: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: { email, password: hashedPassword, name }
        })
        res.status(201).json({ msg: 'User registered', userId: user.id });
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) res.status(400).json({ msg: 'Invalid email.' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) res.status(400).json({ msg: 'Password is incorrect' });

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' })
        res.json({ token })
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
}

export {
    register,
    login
}