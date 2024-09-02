import express, { Router, Request, Response } from 'express';
import { register, login } from '../controllers/userController.js';
import auth from '../middleware/auth.js';

const authRouter: Router = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);

authRouter.get('/protected', auth, (req: Request, res: Response) => {
  const { user } = req;
  res.json({ msg: 'Protected route', user: req.user });
});

export default authRouter;
