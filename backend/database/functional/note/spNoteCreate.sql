/**
 * @summary
 * Creates a new note for a specific user and account.
 * 
 * @procedure spNoteCreate
 * @schema functional
 * @type stored-procedure
 * 
 * @endpoints
 * - POST /api/v1/internal/note
 * 
 * @parameters
 * @param {INT} idAccount 
 *   - Required: Yes
 *   - Description: The account identifier to associate the note with.
 * @param {INT} idUser
 *   - Required: Yes
 *   - Description: The user identifier of the note's author.
 * @param {NVARCHAR(255)} title
 *   - Required: Yes
 *   - Description: The title of the note.
 * @param {NVARCHAR(MAX)} content
 *   - Required: Yes
 *   - Description: The main content of the note.
 * 
 * @testScenarios
 * - A user successfully creates a new note with valid title and content.
 * - Attempt to create a note with a NULL title, expecting an error.
 * - Attempt to create a note with a NULL content, expecting an error.
 */
CREATE OR ALTER PROCEDURE [functional].[spNoteCreate]
  @idAccount INT,
  @idUser INT,
  @title NVARCHAR(255),
  @content NVARCHAR(MAX)
AS
BEGIN
  SET NOCOUNT ON;

  -- Parameter validation
  IF @idAccount IS NULL
  BEGIN
    ;THROW 51000, 'AccountIdRequired', 1;
  END

  IF @idUser IS NULL
  BEGIN
    ;THROW 51000, 'UserIdRequired', 1;
  END

  IF @title IS NULL OR LTRIM(RTRIM(@title)) = ''
  BEGIN
    ;THROW 51000, 'TitleRequired', 1;
  END

  IF @content IS NULL OR LTRIM(RTRIM(@content)) = ''
  BEGIN
    ;THROW 51000, 'ContentRequired', 1;
  END

  DECLARE @newNote TABLE (
    [idNote] INT,
    [idAccount] INT,
    [idUser] INT,
    [title] NVARCHAR(255),
    [content] NVARCHAR(MAX),
    [dateCreated] DATETIME2,
    [dateModified] DATETIME2,
    [deleted] BIT
  );

  BEGIN TRY
    INSERT INTO [functional].[note] ([idAccount], [idUser], [title], [content])
    OUTPUT INSERTED.*
    INTO @newNote
    VALUES (@idAccount, @idUser, @title, @content);

    /**
     * @output {NewNote, 1, 8}
     * @column {INT} idNote - The ID of the newly created note.
     * @column {INT} idAccount - The account ID.
     * @column {INT} idUser - The user ID.
     * @column {NVARCHAR(255)} title - The note's title.
     * @column {NVARCHAR(MAX)} content - The note's content.
     * @column {DATETIME2} dateCreated - The creation timestamp.
     * @column {DATETIME2} dateModified - The modification timestamp.
     * @column {BIT} deleted - The soft delete flag.
     */
    SELECT * FROM @newNote;

  END TRY
  BEGIN CATCH
    ;THROW;
  END CATCH
END;
GO
