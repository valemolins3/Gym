// Vista para formatear la respuesta de Ejemplo
// Puedes usar esto para transformar los datos antes de enviarlos al cliente

import { Ejemplo } from '../models/Ejemplo.model';

export class EjemploView {
  static format(ejemplo: Ejemplo): any {
    return {
      id: ejemplo.id,
      nombre: ejemplo.nombre,
      descripcion: ejemplo.descripcion,
      fechaCreacion: ejemplo.fechaCreacion,
      activo: ejemplo.activo,
    };
  }

  static formatList(ejemplos: Ejemplo[]): any[] {
    return ejemplos.map((ejemplo) => this.format(ejemplo));
  }
}

