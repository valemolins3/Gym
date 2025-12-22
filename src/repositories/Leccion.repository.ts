
import { BaseRepository } from './Base.repository';
import { Leccion } from '../dto/Leccion.dto';

export class LeccionRepository extends BaseRepository<Leccion> {
  constructor() {
    super({
      tableName: 'Clase', 
      idColumn: 'ID',
      entityClass: Leccion,
    });
  }
}