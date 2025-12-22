import { Request, Response } from 'express';
import { SocioService } from '../services/Socio.services';
import { Socio, SocioCreate, SocioUpdate } from '../dto/Socio.dto';

export class SocioController {
    private service: SocioService 

    constructor () {
        this.service = new SocioService ()
    }

    getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const socios = await this.service.getAll();
      res.status(200).json({
        success: true,
        data: socios
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener los socios',
        error: error instanceof Error ? error.message : 'Error desconocido',
      });
    }
  };

  crearSocio = async (req: Request, res: Response): Promise<void> => {
    try {
      const body = new SocioCreate (req.body)
      const socio = await this.service.crearSocio(body);
      res.status(201).json({
        success: true,
        data: socio
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al crear el socio',
        error: error instanceof Error ? error.message : 'Error desconocido',
      });
    }
}

  actualizarSocio = async (req: Request, res: Response): Promise<void> => {
    try {
      const body = new SocioUpdate (req.body)
      const socio = await this.service.actualizarSocio(req.params.id, body);
      res.status(201).json({
        success: true,
        data: socio
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al actualizar el socio',
        error: error instanceof Error ? error.message : 'Error desconocido',
      });
    }
}
}