import sql from 'mssql';
import { config } from '@/config';
import { logger } from '@/utils/logger';

const sqlConfig: sql.config = {
  user: config.database.user,
  password: config.database.password,
  server: config.database.server,
  database: config.database.database,
  port: config.database.port,
  options: {
    encrypt: config.database.options.encrypt,
    trustServerCertificate: config.database.options.trustServerCertificate,
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
};

let pool: sql.ConnectionPool;

async function connectToDatabase() {
  try {
    if (!pool) {
      pool = await new sql.ConnectionPool(sqlConfig).connect();
      logger.info('Successfully connected to SQL Server.');

      pool.on('error', (err) => {
        logger.error('SQL Server pool error', err);
      });
    }
    return pool;
  } catch (err) {
    logger.error('Failed to connect to SQL Server', err);
    process.exit(1); // Exit if DB connection fails
  }
}

export async function getPool(): Promise<sql.ConnectionPool> {
  if (!pool) {
    return await connectToDatabase();
  }
  return pool;
}

// Optional: Immediately connect on startup
connectToDatabase();
