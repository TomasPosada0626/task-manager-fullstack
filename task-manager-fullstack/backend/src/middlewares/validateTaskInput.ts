import { Request, Response, NextFunction } from 'express';

export const validateTaskInput = (req: Request, res: Response, next: NextFunction) => {
  const { title, description, status, priority, dueDate } = req.body;
  const errors: string[] = [];

  if (!title || typeof title !== 'string' || title.trim().length < 3) {
    errors.push('Title is required and must be at least 3 characters.');
  }
  if (description && typeof description !== 'string') {
    errors.push('Description must be a string.');
  }
  if (status && !['pending', 'in-progress', 'completed'].includes(status)) {
    errors.push('Status must be one of: pending, in-progress, completed.');
  }
  if (priority && !['low', 'medium', 'high'].includes(priority)) {
    errors.push('Priority must be one of: low, medium, high.');
  }
  if (dueDate && isNaN(Date.parse(dueDate))) {
    errors.push('Due date must be a valid date.');
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }
  next();
};
