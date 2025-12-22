import sql from 'mssql';
import { getConnection } from '../config/database';

export interface RepositoryConfig {
  tableName: string;
  idColumn?: string;
  entityClass?: new (data: any) => any;
}

export class BaseRepository<T = any> {
  protected tableName: string;
  protected idColumn: string;
  protected entityClass?: new (data: any) => T;

  constructor(config: RepositoryConfig) {
    this.tableName = config.tableName;
    this.idColumn = config.idColumn || 'id';
    this.entityClass = config.entityClass;
  }

  protected mapToEntity(data: any): T {
    if (this.entityClass) {
      return new this.entityClass(data);
    }
    return data as T;
  }

  protected mapToEntities(recordset: any[]): T[] {
    return recordset.map((row: any) => this.mapToEntity(row));
  }

  async findAll(): Promise<T[]> {
    const pool = await getConnection();
    const result = await pool
      .request()
      .query(`SELECT * FROM ${this.tableName}`);
    
    return this.mapToEntities(result.recordset);
  }

  async findById(id: string): Promise<T | null> {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input('id', sql.NVarChar, id)
      .query(`SELECT * FROM ${this.tableName} WHERE ${this.idColumn} = @id`);
    
    if (!result.recordset[0]) {
      return null;
    }
    
    return this.mapToEntity(result.recordset[0]);
  }

  async findOne(where: Record<string, any>): Promise<T | null> {
    const pool = await getConnection();
    const request = pool.request();
    const conditions: string[] = [];
    
    Object.keys(where).forEach((key, index) => {
      const paramName = `param${index}`;
      conditions.push(`${key} = @${paramName}`);
      request.input(paramName, where[key]);
    });

    const result = await request.query(
      `SELECT TOP 1 * FROM ${this.tableName} WHERE ${conditions.join(' AND ')}`
    );

    if (!result.recordset[0]) {
      return null;
    }

    return this.mapToEntity(result.recordset[0]);
  }

async create(data: Partial<T>, columns?: string[]): Promise<{ success: boolean; message: string }> {
  const pool = await getConnection();
  const request = pool.request();
  
  const dataKeys = columns || Object.keys(data);
  const columnNames: string[] = [];
  const values: string[] = [];

  dataKeys.forEach((key, index) => {
    if (data[key as keyof T] !== undefined) {
      const paramName = `param${index}`;
      columnNames.push(key);
      values.push(`@${paramName}`);
      request.input(paramName, data[key as keyof T]);
    }
  });

  // Eliminamos el OUTPUT INSERTED.* por completo.
  // Esto permite que el TRIGGER de SQL Server funcione sin restricciones.
  await request.query(`
    INSERT INTO ${this.tableName} (${columnNames.join(', ')})
    VALUES (${values.join(', ')})
  `);
  
  // Si llegamos aquí, es porque la inserción fue exitosa y los triggers lo permitieron.
  return {
    success: true,
    message: 'Registro creado correctamente'
  };
}

async update(id: string, data: Partial<T>): Promise<T | null> {
  const pool = await getConnection();
  const updates: string[] = [];
  const request = pool.request().input('id', sql.NVarChar, id);

  Object.keys(data).forEach((key, index) => {
    if (data[key as keyof T] !== undefined) {
      const paramName = `param${index}`;
      updates.push(`${key} = @${paramName}`);
      request.input(paramName, data[key as keyof T]);
    }
  });

  if (updates.length === 0) {
    return this.findById(id);
  }

  // PASO 1: Ejecutamos el UPDATE sin OUTPUT
  const result = await request.query(`
    UPDATE ${this.tableName}
    SET ${updates.join(', ')}
    WHERE ${this.idColumn} = @id
  `);

  // Verificamos si se actualizó alguna fila
  if (result.rowsAffected[0] === 0) {
    return null;
  }

  // PASO 2: Retornamos el registro actualizado buscando por ID
  // Esto evita el conflicto con el TRIGGER y es más seguro
  return this.findById(id);
}

  async delete(id: number): Promise<boolean> {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input('id', sql.NVarChar, id)
      .query(`DELETE FROM ${this.tableName} WHERE ${this.idColumn} = @id`);
    
    return result.rowsAffected[0] > 0;
  }

  async count(): Promise<number> {
    const pool = await getConnection();
    const result = await pool
      .request()
      .query(`SELECT COUNT(*) as total FROM ${this.tableName}`);
    
    return result.recordset[0].total;
  }

  async executeQuery(query: string, params?: Record<string, any>): Promise<any> {
    const pool = await getConnection();
    const request = pool.request();

    if (params) {
      Object.keys(params).forEach((key) => {
        request.input(key, params[key]);
      });
    }

    const result = await request.query(query);
    return result.recordset;
  }
}