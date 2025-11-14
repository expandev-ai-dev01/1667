import { Request, Response } from 'express';
import { successResponse } from '@/utils/responseHandler';

/**
 * @summary
 * Handles the health check request.
 *
 * @api {get} /api/v1/external/public/health Health Check
 * @apiName GetHealth
 * @apiGroup Public
 * @apiVersion 1.0.0
 *
 * @apiSuccess {Boolean} success Indicates if the request was successful.
 * @apiSuccess {Object} data The response data.
 * @apiSuccess {String} data.status The current status of the API.
 * @apiSuccess {String} data.timestamp The server timestamp.
 */
export function getHandler(req: Request, res: Response): void {
  const healthData = {
    status: 'OK',
    timestamp: new Date().toISOString(),
  };
  res.status(200).json(successResponse(healthData));
}
