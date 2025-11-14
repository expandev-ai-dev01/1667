/**
 * @schema subscription
 * Handles account management, subscription plans, and multi-tenancy.
 */
IF NOT EXISTS (SELECT * FROM sys.schemas WHERE name = 'subscription')
BEGIN
    EXEC('CREATE SCHEMA subscription');
END
GO

/*
DROP TABLE [subscription].[account];
*/

/**
 * @table account Represents a tenant in the multi-tenant system.
 * @multitenancy false
 * @softDelete true
 * @alias acc
 */
CREATE TABLE [subscription].[account] (
  [idAccount] INTEGER IDENTITY(1, 1) NOT NULL,
  [name] NVARCHAR(100) NOT NULL,
  [dateCreated] DATETIME2 NOT NULL,
  [deleted] BIT NOT NULL
);
GO

/**
 * @primaryKey pkAccount
 * @keyType Object
 */
ALTER TABLE [subscription].[account]
ADD CONSTRAINT [pkAccount] PRIMARY KEY CLUSTERED ([idAccount]);
GO

/**
 * @default dfAccount_dateCreated Sets the creation date automatically.
 */
ALTER TABLE [subscription].[account]
ADD CONSTRAINT [dfAccount_dateCreated] DEFAULT (GETUTCDATE()) FOR [dateCreated];
GO

/**
 * @default dfAccount_deleted Sets the soft delete flag to active by default.
 */
ALTER TABLE [subscription].[account]
ADD CONSTRAINT [dfAccount_deleted] DEFAULT (0) FOR [deleted];
GO
