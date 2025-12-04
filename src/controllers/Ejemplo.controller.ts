import { Request, Response } from 'express';
import { EjemploService } from '../services/Ejemplo.service';
import { EjemploCreate, EjemploUpdate } from '../models/Ejemplo.model';

export class EjemploController {
  private service: EjemploService;

  constructor() {
    this.service = new EjemploService();
  }

  getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const ejemplos = await this.service.getAll();
      res.status(200).json({
        success: true,
        data: ejemplos,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener los ejemplos',
        error: error instanceof Error ? error.message : 'Error desconocido',
      });
    }
  };

  getById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          message: 'ID inválido',
        });
        return;
      }

      const ejemplo = await this.service.getById(id);
      res.status(200).json({
        success: true,
        data: ejemplo,
      });
    } catch (error) {
      const statusCode = error instanceof Error && error.message.includes('no encontrado') ? 404 : 500;
      res.status(statusCode).json({
        success: false,
        message: 'Error al obtener el ejemplo',
        error: error instanceof Error ? error.message : 'Error desconocido',
      });
    }
  };

  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const data: EjemploCreate = req.body;
      const ejemplo = await this.service.create(data);
      res.status(201).json({
        success: true,
        data: ejemplo,
        message: 'Ejemplo creado exitosamente',
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Error al crear el ejemplo',
        error: error instanceof Error ? error.message : 'Error desconocido',
      });
    }
  };

  update = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          message: 'ID inválido',
        });
        return;
      }

      const data: EjemploUpdate = req.body;
      const ejemplo = await this.service.update(id, data);
      res.status(200).json({
        success: true,
        data: ejemplo,
        message: 'Ejemplo actualizado exitosamente',
      });
    } catch (error) {
      const statusCode = error instanceof Error && error.message.includes('no encontrado') ? 404 : 400;
      res.status(statusCode).json({
        success: false,
        message: 'Error al actualizar el ejemplo',
        error: error instanceof Error ? error.message : 'Error desconocido',
      });
    }
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          message: 'ID inválido',
        });
        return;
      }

      await this.service.delete(id);
      res.status(200).json({
        success: true,
        message: 'Ejemplo eliminado exitosamente',
      });
    } catch (error) {
      const statusCode = error instanceof Error && error.message.includes('no encontrado') ? 404 : 500;
      res.status(statusCode).json({
        success: false,
        message: 'Error al eliminar el ejemplo',
        error: error instanceof Error ? error.message : 'Error desconocido',
      });
    }
  };
}

