import { Request, Response, NextFunction } from 'express';
import { errorResponse } from '@/utils/responseHandler';
import { config } from '@/config';

/**
 * @summary
 * Global error handling middleware. Catches errors from route handlers and other middleware.
 */
export function errorMiddleware(err: Error, req: Request, res: Response, next: NextFunction): void {
  // If headers have already been sent, delegate to the default Express error handler.
  if (res.headersSent) {
    return next(err);
  }

  console.error(err); // For logging purposes

  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  const message = err.message || 'InternalServerError';
  const stack = config.env === 'production' ? undefined : err.stack;

  res.status(statusCode).json(errorResponse(message, stack));
}
