/**
 * @schema security
 * Manages authentication, authorization, users, and permissions.
 */
IF NOT EXISTS (SELECT * FROM sys.schemas WHERE name = 'security')
BEGIN
    EXEC('CREATE SCHEMA security');
END
GO

/*
DROP TABLE [security].[user];
*/

/**
 * @table user Stores user account information.
 * @multitenancy true
 * @softDelete true
 * @alias usr
 */
CREATE TABLE [security].[user] (
  [idUser] INTEGER IDENTITY(1, 1) NOT NULL,
  [idAccount] INTEGER NOT NULL,
  [name] NVARCHAR(100) NOT NULL,
  [email] NVARCHAR(255) NOT NULL,
  [passwordHash] NVARCHAR(255) NOT NULL,
  [dateCreated] DATETIME2 NOT NULL,
  [dateModified] DATETIME2 NOT NULL,
  [deleted] BIT NOT NULL
);
GO

/**
 * @primaryKey pkUser
 * @keyType Object
 */
ALTER TABLE [security].[user]
ADD CONSTRAINT [pkUser] PRIMARY KEY CLUSTERED ([idUser]);
GO

/**
 * @foreignKey fkUser_account Links the user to a specific account for multi-tenancy.
 * @target subscription.account
 */
ALTER TABLE [security].[user]
ADD CONSTRAINT [fkUser_account] FOREIGN KEY ([idAccount])
REFERENCES [subscription].[account]([idAccount]);
GO

/**
 * @default dfUser_dateCreated Sets the creation date automatically.
 */
ALTER TABLE [security].[user]
ADD CONSTRAINT [dfUser_dateCreated] DEFAULT (GETUTCDATE()) FOR [dateCreated];
GO

/**
 * @default dfUser_dateModified Sets the initial modification date.
 */
ALTER TABLE [security].[user]
ADD CONSTRAINT [dfUser_dateModified] DEFAULT (GETUTCDATE()) FOR [dateModified];
GO

/**
 * @default dfUser_deleted Sets the soft delete flag to active by default.
 */
ALTER TABLE [security].[user]
ADD CONSTRAINT [dfUser_deleted] DEFAULT (0) FOR [deleted];
GO

/**
 * @index uqUser_Account_Email Ensures email addresses are unique within an account.
 * @type Unique
 * @unique true
 */
CREATE UNIQUE NONCLUSTERED INDEX [uqUser_Account_Email]
ON [security].[user]([idAccount], [email])
WHERE [deleted] = 0;
GO

/**
 * @index ixUser_Account Optimizes queries filtering by account.
 * @type ForeignKey
 */
CREATE NONCLUSTERED INDEX [ixUser_Account]
ON [security].[user]([idAccount])
WHERE [deleted] = 0;
GO
