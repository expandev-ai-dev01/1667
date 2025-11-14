import { z } from 'zod';

// Common validation schemas to be reused across the application

/**
 * @summary Validates a standard identifier (positive integer).
 */
export const zId = z.coerce.number().int().positive();

/**
 * @summary Validates a title field (non-empty string, max 255 chars).
 */
export const zTitle = z
  .string()
  .trim()
  .min(1, 'Title is required')
  .max(255, 'Title cannot exceed 255 characters');

/**
 * @summary Validates a content field (non-empty string).
 */
export const zContent = z.string().trim().min(1, 'Content is required');
