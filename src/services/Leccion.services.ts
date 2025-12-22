import { LeccionRepository } from "../repositories/Leccion.repository";
import { Leccion, LeccionCreate, LeccionUpdate } from "../dto/Leccion.dto";

export class LeccionService {
    private repository: LeccionRepository
    
    constructor () {
        this.repository = new LeccionRepository ()
    }

    async getAll(): Promise<Leccion[]> {
    try {
      return await this.repository.findAll();
    } catch (error) {
      throw new Error(`Error al obtener todas las clases: ${error}`);
    }
  }

    async crearLeccion(Leccion: LeccionCreate): Promise<any> {
    try {
      if (!Leccion.TurnoID || Leccion.TurnoID.trim().length === 0) {
        throw new Error('El turnoID es requerido');
      }
        if (!Leccion.ProfesorID || Leccion.ProfesorID.trim().length === 0) {
        throw new Error('El profesorID es requerido');
      }      
      return await this.repository.create(Leccion);
    } catch (error) {
      throw new Error(`Error al crear la leccion: ${error}`);
    }
  }
}
/* async actualizarSocio(id: string, data: SocioUpdate): Promise<Socio> {
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
} */

