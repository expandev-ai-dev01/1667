import { getPool } from '@/instances/database/sqlServerInstance';
import { IRecordSet } from 'mssql';
import { logger } from './logger';

export enum ExpectedReturn {
  Single,
  Multi,
  None,
}

/**
 * @summary
 * Executes a stored procedure against the SQL Server database.
 * @param routine The name of the stored procedure to execute (e.g., '[schema].[spName]').
 * @param parameters An object containing the parameters for the stored procedure.
 * @param expectedReturn The expected type of return value.
 * @returns The result from the stored procedure, typed as specified.
 */
export async function dbRequest<T>(
  routine: string,
  parameters: Record<string, any>,
  expectedReturn: ExpectedReturn
): Promise<T> {
  try {
    const pool = await getPool();
    const request = pool.request();

    // Add parameters to the request
    for (const key in parameters) {
      if (Object.prototype.hasOwnProperty.call(parameters, key)) {
        request.input(key, parameters[key]);
      }
    }

    const result = await request.execute(routine);

    switch (expectedReturn) {
      case ExpectedReturn.Single:
        return result.recordset[0] as T;
      case ExpectedReturn.Multi:
        return result.recordsets as unknown as T;
      case ExpectedReturn.None:
        return undefined as unknown as T;
      default:
        return result.recordset as unknown as T;
    }
  } catch (error: any) {
    logger.error(`Database request failed for routine: ${routine}`, {
      errorMessage: error.message,
      parameters,
    });
    // Re-throw the error to be handled by the global error handler
    throw new Error(error.message || 'DatabaseError');
  }
}
