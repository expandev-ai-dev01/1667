/**
 * @schema functional
 * Contains all business logic, entities, and operational tables for the application.
 */
IF NOT EXISTS (SELECT * FROM sys.schemas WHERE name = 'functional')
BEGIN
    EXEC('CREATE SCHEMA functional');
END
GO

/*
DROP TABLE [functional].[note];
*/

/**
 * @table note Stores the main content of the notes created by users.
 * @multitenancy true
 * @softDelete true
 * @alias nte
 */
CREATE TABLE [functional].[note] (
  [idNote] INTEGER IDENTITY(1, 1) NOT NULL,
  [idAccount] INTEGER NOT NULL,
  [idUser] INTEGER NOT NULL,
  [title] NVARCHAR(255) NOT NULL,
  [content] NVARCHAR(MAX) NOT NULL,
  [dateCreated] DATETIME2 NOT NULL,
  [dateModified] DATETIME2 NOT NULL,
  [deleted] BIT NOT NULL
);
GO

/**
 * @primaryKey pkNote
 * @keyType Object
 */
ALTER TABLE [functional].[note]
ADD CONSTRAINT [pkNote] PRIMARY KEY CLUSTERED ([idNote]);
GO

/**
 * @foreignKey fkNote_account Links the note to a specific account for multi-tenancy.
 * @target subscription.account
 */
ALTER TABLE [functional].[note]
ADD CONSTRAINT [fkNote_account] FOREIGN KEY ([idAccount])
REFERENCES [subscription].[account]([idAccount]);
GO

/**
 * @foreignKey fkNote_user Links the note to the user who created it.
 * @target security.user
 */
ALTER TABLE [functional].[note]
ADD CONSTRAINT [fkNote_user] FOREIGN KEY ([idUser])
REFERENCES [security].[user]([idUser]);
GO

/**
 * @default dfNote_dateCreated Sets the creation date automatically.
 */
ALTER TABLE [functional].[note]
ADD CONSTRAINT [dfNote_dateCreated] DEFAULT (GETUTCDATE()) FOR [dateCreated];
GO

/**
 * @default dfNote_dateModified Sets the initial modification date.
 */
ALTER TABLE [functional].[note]
ADD CONSTRAINT [dfNote_dateModified] DEFAULT (GETUTCDATE()) FOR [dateModified];
GO

/**
 * @default dfNote_deleted Sets the soft delete flag to active by default.
 */
ALTER TABLE [functional].[note]
ADD CONSTRAINT [dfNote_deleted] DEFAULT (0) FOR [deleted];
GO

/**
 * @index ixNote_Account Optimizes queries filtering by account.
 * @type ForeignKey
 */
CREATE NONCLUSTERED INDEX [ixNote_Account]
ON [functional].[note]([idAccount])
WHERE [deleted] = 0;
GO

/**
 * @index ixNote_Account_User Optimizes queries for a specific user within an account.
 * @type Search
 */
CREATE NONCLUSTERED INDEX [ixNote_Account_User]
ON [functional].[note]([idAccount], [idUser])
WHERE [deleted] = 0;
GO
