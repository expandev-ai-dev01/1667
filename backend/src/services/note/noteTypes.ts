/**
 * @interface Note
 * @description Represents a note entity in the system, matching the database structure.
 *
 * @property {number} idNote - Unique note identifier.
 * @property {number} idAccount - Associated account identifier.
 * @property {number} idUser - Identifier of the user who created the note.
 * @property {string} title - The title of the note.
 * @property {string} content - The main content of the note.
 * @property {Date} dateCreated - Creation timestamp.
 * @property {Date} dateModified - Last modification timestamp.
 * @property {boolean} deleted - Soft delete flag.
 */
export interface Note {
  idNote: number;
  idAccount: number;
  idUser: number;
  title: string;
  content: string;
  dateCreated: Date;
  dateModified: Date;
  deleted: boolean;
}
