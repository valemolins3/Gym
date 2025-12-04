import sql from 'mssql';
import { getConnection } from '../config/database';

export class anyRepository {
  private tableName = 'Ejemplo'; // Cambiar por el nombre de tu tabla

  async findAll(): Promise<any[]> {
    const pool = await getConnection();
    const result = await pool
      .request()
      .query(`SELECT * FROM ${this.tableName}`);
    return result.recordset as any[];
  }

  async findById(id: number): Promise<any | null> {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input('id', sql.Int, id)
      .query(`SELECT * FROM ${this.tableName} WHERE id = @id`);
    
    return result.recordset[0] || null;
  }

  async create(data: any): Promise<any> {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input('nombre', sql.NVarChar, data.nombre)
      .input('descripcion', sql.NVarChar, data.descripcion || null)
      .input('activo', sql.Bit, data.activo ?? true)
      .query(`
        INSERT INTO ${this.tableName} (nombre, descripcion, activo, fechaCreacion)
        OUTPUT INSERTED.*
        VALUES (@nombre, @descripcion, @activo, GETDATE())
      `);
    
    return result.recordset[0] as any;
  }

  async update(id: number, data: any): Promise<any | null> {
    const pool = await getConnection();
    const updates: string[] = [];
    const request = pool.request().input('id', sql.Int, id);

    if (data.nombre !== undefined) {
      updates.push('nombre = @nombre');
      request.input('nombre', sql.NVarChar, data.nombre);
    }
    if (data.descripcion !== undefined) {
      updates.push('descripcion = @descripcion');
      request.input('descripcion', sql.NVarChar, data.descripcion);
    }
    if (data.activo !== undefined) {
      updates.push('activo = @activo');
      request.input('activo', sql.Bit, data.activo);
    }

    if (updates.length === 0) {
      return this.findById(id);
    }

    const result = await request.query(`
      UPDATE ${this.tableName}
      SET ${updates.join(', ')}
      OUTPUT INSERTED.*
      WHERE id = @id
    `);

    return result.recordset[0] || null;
  }

  async delete(id: number): Promise<boolean> {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input('id', sql.Int, id)
      .query(`DELETE FROM ${this.tableName} WHERE id = @id`);
    
    return result.rowsAffected[0] > 0;
  }
}

