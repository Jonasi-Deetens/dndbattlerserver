import express from 'express';
import { register, login } from '../controllers/userController';
import auth from '../middleware/auth';
const authRouter = express.Router();
authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.get('/protected', auth, (req, res) => {
    const { user } = req;
    res.json({ msg: 'Protected route', user: req.user });
});
export default authRouter;
