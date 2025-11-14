import { Request, Response, NextFunction } from 'express';

/**
 * @summary
 * Handles requests for routes that do not exist (404).
 */
export function notFoundMiddleware(req: Request, res: Response, next: NextFunction): void {
  const error = new Error(`Route not found: ${req.method} ${req.originalUrl}`);
  res.status(404);
  next(error);
}
