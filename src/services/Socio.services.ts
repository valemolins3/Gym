import { SocioRepository } from "../repositories/Socio.repository";
import { Socio, SocioUpdate } from "../dto/Socio.dto";

export class SocioService {
    private repository: SocioRepository
    
    constructor () {
        this.repository = new SocioRepository ()
    }

    async getAll(): Promise<Socio[]> {
    try {
      return await this.repository.findAll();
    } catch (error) {
      throw new Error(`Error al obtener todos los socios: ${error}`);
    }
  }

    async crearSocio(socio: Socio): Promise<Socio> {
    try {
      if (!socio.Nombre || socio.Nombre.trim().length === 0) {
        throw new Error('El nombre es requerido');
      }
      return await this.repository.create(socio);
    } catch (error) {
      throw new Error(`Error al crear el socio: ${error}`);
    }
  }

  async actualizarSocio(id: string, data: SocioUpdate): Promise<Socio> {
    try {
      const socio = await this.repository.update(id, data);
      if (
        socio 
      ) {
        return socio 
      }
      else {
        throw new Error(`Socio no encontrado`);
      }
    } catch (error) {
      throw new Error(`Error al actualizar el socio: ${error}`);
    }
  }
}

