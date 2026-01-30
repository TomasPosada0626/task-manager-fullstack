import { User } from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env';

export const registerUserService = async (email: string, password: string) => {
  if (!email || !password) {
    const error = new Error('Email and password are required');
    (error as any).status = 400;
    throw error;
  }
  if (password.length < 6) {
    const error = new Error('Password must be at least 6 characters');
    (error as any).status = 400;
    throw error;
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const error = new Error('Email already in use');
    (error as any).status = 409;
    throw error;
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashedPassword });
  await user.save();
  return user;
};

export const loginUserService = async (email: string, password: string) => {
  if (!email || !password) {
    const error = new Error('Email and password are required');
    (error as any).status = 400;
    throw error;
  }
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error('Invalid credentials');
    (error as any).status = 401;
    throw error;
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    const error = new Error('Invalid credentials');
    (error as any).status = 401;
    throw error;
  }
  const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
  return { user, token };
};
