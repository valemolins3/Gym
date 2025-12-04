import { EjemploRepository } from '../repositories/Ejemplo.repository';
import { Ejemplo, EjemploCreate, EjemploUpdate } from '../models/Ejemplo.model';

export class EjemploService {
  private repository: EjemploRepository;

  constructor() {
    this.repository = new EjemploRepository();
  }

  async getAll(): Promise<Ejemplo[]> {
    try {
      return await this.repository.findAll();
    } catch (error) {
      throw new Error(`Error al obtener todos los ejemplos: ${error}`);
    }
  }

  async getById(id: number): Promise<Ejemplo> {
    try {
      const ejemplo = await this.repository.findById(id);
      if (!ejemplo) {
        throw new Error(`Ejemplo con id ${id} no encontrado`);
      }
      return ejemplo;
    } catch (error) {
      throw error;
    }
  }

  async create(data: EjemploCreate): Promise<Ejemplo> {
    try {
      // Validaciones de negocio
      if (!data.nombre || data.nombre.trim().length === 0) {
        throw new Error('El nombre es requerido');
      }

      return await this.repository.create(data);
    } catch (error) {
      throw new Error(`Error al crear el ejemplo: ${error}`);
    }
  }

  async update(id: number, data: EjemploUpdate): Promise<Ejemplo> {
    try {
      const ejemplo = await this.repository.update(id, data);
      if (!ejemplo) {
        throw new Error(`Ejemplo con id ${id} no encontrado`);
      }
      return ejemplo;
    } catch (error) {
      throw error;
    }
  }

  async delete(id: number): Promise<void> {
    try {
      const deleted = await this.repository.delete(id);
      if (!deleted) {
        throw new Error(`Ejemplo con id ${id} no encontrado`);
      }
    } catch (error) {
      throw new Error(`Error al eliminar el ejemplo: ${error}`);
    }
  }
}

