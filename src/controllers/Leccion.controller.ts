import { Request, Response } from 'express';
import { LeccionService } from '../services/Leccion.services';
import { Leccion, LeccionCreate, LeccionUpdate } from '../dto/Leccion.dto';

export class LeccionController {
    private service: LeccionService 

    constructor () {
        this.service = new LeccionService ()
    }

    getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const Leccions = await this.service.getAll();
      res.status(200).json({
        success: true,
        data: Leccions
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener los Leccions',
        error: error instanceof Error ? error.message : 'Error desconocido',
      });
    }
  };

  crearLeccion = async (req: Request, res: Response): Promise<void> => {
    try {
      const body = new LeccionCreate (req.body)
      const Leccion = await this.service.crearLeccion(body);
      res.status(201).json({
        success: true,
        data: Leccion
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al crear el Leccion',
        error: error instanceof Error ? error.message : 'Error desconocido',
      });
    }
}
}

  /* actualizarLeccion = async (req: Request, res: Response): Promise<void> => {
    try {
      const body = new LeccionUpdate (req.body)
      const Leccion = await this.service.actualizarLeccion(req.params.id, body);
      res.status(201).json({
        success: true,
        data: Leccion
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al actualizar el Leccion',
        error: error instanceof Error ? error.message : 'Error desconocido',
      });
    }
}
} */