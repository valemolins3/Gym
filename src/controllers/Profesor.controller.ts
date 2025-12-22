
import { Request, Response } from 'express';
import { ProfesorService } from '../services/Profesor.services';
import { ProfesorCreate, ProfesorUpdate } from '../dto/Profesor.dto';

export class ProfesorController {
    private service: ProfesorService;

    constructor () {
        this.service = new ProfesorService();
    }

    getAll = async (req: Request, res: Response): Promise<void> => {
        try {
            const profesores = await this.service.getAll();
            res.status(200).json({ success: true, data: profesores });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al obtener los profesores',
                error: error instanceof Error ? error.message : 'Error desconocido',
            });
        }
    };

    crearProfesor = async (req: Request, res: Response): Promise<void> => {
        try {
            const data = new ProfesorCreate(req.body);
            const profesor = await this.service.crearProfesor(data);
            res.status(201).json({ success: true, data: profesor });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al crear el profesor',
                error: error instanceof Error ? error.message : 'Error desconocido',
            });
        }
    };

    actualizarProfesor = async (req: Request, res: Response): Promise<void> => {
        try {
            const data = new ProfesorUpdate(req.body);
            const profesor = await this.service.actualizarProfesor(req.params.id, data);
            res.status(200).json({ success: true, data: profesor });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al actualizar el profesor',
                error: error instanceof Error ? error.message : 'Error desconocido',
            });
        }
    };
}