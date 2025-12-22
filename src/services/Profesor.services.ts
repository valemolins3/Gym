
import { ProfesorRepository } from "../repositories/Profesor.repository";
import { Profesor, ProfesorCreate, ProfesorUpdate } from "../dto/Profesor.dto";

export class ProfesorService {
    private repository: ProfesorRepository;
    
    constructor () {
        this.repository = new ProfesorRepository();
    }

    async getAll(): Promise<Profesor[]> {
        try {
            return await this.repository.findAll();
        } catch (error) {
            throw new Error(`Error al obtener todos los profesores: ${error}`);
        }
    }

    async crearProfesor(data: ProfesorCreate): Promise<Profesor> {
        try {
            // if: valido q los datos importantes no esten vacíos
            if (!data.Nombre || data.Nombre.trim().length === 0) {
                throw new Error('El nombre es requerido');
            }
            if (!data.Telefono || data.Telefono.trim().length === 0) {
                throw new Error('El teléfono es requerido');
            }
            if (data.Sueldo === undefined || data.Sueldo < 0) {
                throw new Error('El sueldo es requerido y debe ser un número positivo');
            }
            return await this.repository.create(data);
        } catch (error) {
            throw new Error(`Error al crear el profesor: ${error}`);
        }
    }

    async actualizarProfesor(id: string, data: ProfesorUpdate): Promise<Profesor> {
        try {
            const profesor = await this.repository.update(id, data);
            if (profesor) {
                return profesor;
            } else {
                throw new Error(`Profesor no encontrado con ID: ${id}`);
            }
        } catch (error) {
            throw new Error(`Error al actualizar el profesor: ${error}`);
        }
    }
}