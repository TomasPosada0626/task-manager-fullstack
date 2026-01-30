import { Request, Response, NextFunction } from 'express';
import { registerUserService, loginUserService } from '../services/authService';

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const user = await registerUserService(email, password);
    res.status(201).json({ message: 'User registered successfully', user: { email: user.email, role: user.role, id: user._id } });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await loginUserService(email, password);
    res.status(200).json({ token, user: { email: user.email, role: user.role, id: user._id } });
  } catch (error) {
    next(error);
  }
};
