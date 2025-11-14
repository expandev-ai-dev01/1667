import { z } from 'zod';
import { zTitle, zContent } from '@/utils/zodValidation';

/**
 * @summary
 * Zod schema for validating the request body when creating a new note.
 */
export const noteCreateSchema = z.object({
  title: zTitle,
  content: zContent,
});

// Infer the TypeScript type from the Zod schema
export type NoteCreateRequest = z.infer<typeof noteCreateSchema>;
