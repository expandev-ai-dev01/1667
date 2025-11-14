import { dbRequest, ExpectedReturn } from '@/utils/dbRequest';
import { Note } from './noteTypes';

interface CreateNoteParams {
  idAccount: number;
  idUser: number;
  title: string;
  content: string;
}

/**
 * @summary
 * Creates a new note in the database.
 * @param {CreateNoteParams} params - The parameters for creating the note.
 * @returns {Promise<Note>} The newly created note entity.
 */
export async function createNote(params: CreateNoteParams): Promise<Note> {
  const result = await dbRequest<Note>(
    '[functional].[spNoteCreate]',
    params,
    ExpectedReturn.Single
  );
  return result;
}
