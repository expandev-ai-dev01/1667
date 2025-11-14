import { Request, Response, NextFunction } from 'express';
import { successResponse } from '@/utils/responseHandler';
import { noteCreateSchema, NoteCreateRequest } from '@/services/note/noteValidation';
import { createNote } from '@/services/note/noteService';
import { logger } from '@/utils/logger';

/**
 * @api {post} /api/v1/internal/note Create Note
 * @apiName CreateNote
 * @apiGroup Note
 * @apiVersion 1.0.0
 *
 * @apiDescription Creates a new note for the authenticated user.
 *
 * @apiBody {String} title The title of the note (max 255 characters).
 * @apiBody {String} content The content of the note.
 *
 * @apiSuccess {Boolean} success Indicates if the request was successful.
 * @apiSuccess {Object} data The created note object.
 *
 * @apiError {String} ValidationError Invalid parameters provided.
 * @apiError {String} UnauthorizedError User lacks permission.
 * @apiError {String} InternalServerError Internal server error.
 */
export async function postHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    // The authMiddleware placeholder adds credential to the body.
    const { credential, ...body } = req.body;

    const validatedBody = noteCreateSchema.parse(body) as NoteCreateRequest;

    const noteData = {
      idAccount: credential.idAccount,
      idUser: credential.idUser,
      ...validatedBody,
    };

    const newNote = await createNote(noteData);

    res.status(201).json(successResponse(newNote));
  } catch (error) {
    logger.error('Error creating note', { error });
    next(error);
  }
}
