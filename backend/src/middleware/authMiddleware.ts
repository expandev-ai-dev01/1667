import { Request, Response, NextFunction } from 'express';

/**
 * @summary
 * Placeholder authentication middleware.
 * In a real application, this would validate a JWT or session token.
 * For development, it attaches a mock user and account ID to the request.
 */
export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  // TODO: Replace this with a real authentication mechanism (e.g., JWT validation)
  const mockCredential = {
    idAccount: 1, // Represents the tenant account
    idUser: 1, // Represents the logged-in user
  };

  // Attach credential to the body for easy access in controllers
  req.body.credential = mockCredential;

  next();
}
