import sql from 'mssql';
import dotenv from 'dotenv';

dotenv.config();

const config: sql.config = {
  server: process.env.DB_SERVER || 'localhost',
  port: parseInt(process.env.DB_PORT || '1433'),
  database: process.env.DB_DATABASE || '',
  user: process.env.DB_USER || '',
  password: process.env.DB_PASSWORD || '',
  options: {
    encrypt: process.env.DB_OPTIONS_ENCRYPT === 'true',
    trustServerCertificate: process.env.DB_OPTIONS_TRUST_SERVER_CERTIFICATE === 'true',
  },
};

let pool: sql.ConnectionPool | null = null;

export const getConnection = async (): Promise<sql.ConnectionPool> => {
  try {
    if (pool && pool.connected) {
      return pool;
    }

    pool = await sql.connect(config);
    console.log('✅ Conexión a SQL Server establecida correctamente');
    return pool;
  } catch (error) {
    console.error('❌ Error al conectar con SQL Server:', error);
    throw error;
  }
};

export const closeConnection = async (): Promise<void> => {
  try {
    if (pool) {
      await pool.close();
      pool = null;
      console.log('✅ Conexión cerrada correctamente');
    }
  } catch (error) {
    console.error('❌ Error al cerrar la conexión:', error);
    throw error;
  }
};

export default getConnection;

