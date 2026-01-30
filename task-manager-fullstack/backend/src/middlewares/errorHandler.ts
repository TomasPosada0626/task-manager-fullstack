import { Request, Response, NextFunction } from 'express';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  const status = err.status || 500;
  let message = err.message || 'Internal Server Error';

  // Mongoose validation errors
  if (err.name === 'ValidationError') {
    message = Object.values(err.errors).map((e: any) => e.message).join(', ');
  }
  // Duplicate key error
  if (err.code === 11000) {
    message = 'Duplicate value: ' + Object.keys(err.keyValue).join(', ');
  }

  res.status(status).json({ error: message });
}
