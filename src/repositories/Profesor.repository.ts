
import { BaseRepository } from './Base.repository';
import { Profesor } from '../dto/Profesor.dto';

export class ProfesorRepository extends BaseRepository<Profesor> {
  constructor() {
    super({
      tableName: 'Profesor', 
      idColumn: 'ID',
      entityClass: Profesor,
    });
  }
}