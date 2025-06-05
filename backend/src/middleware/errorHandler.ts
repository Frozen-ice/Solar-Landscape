import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../types';

export class AppError extends Error {
  statusCode: number;
  status: 'fail' | 'error';
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = err as AppError;
  error.statusCode = error.statusCode || 500;
  error.status = error.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    const response: ApiError = {
      status: error.status,
      message: error.message,
      error: error,
      stack: error.stack
    };
    res.status(error.statusCode).json(response);
  } else {
    // Production mode
    if (error.isOperational) {
      const response: ApiError = {
        status: error.status,
        message: error.message
      };
      res.status(error.statusCode).json(response);
    } else {
      // Programming or unknown errors
      console.error('ERROR 💥', error);
      const response: ApiError = {
        status: 'error',
        message: 'Something went wrong'
      };
      res.status(500).json(response);
    }
  }
}; 