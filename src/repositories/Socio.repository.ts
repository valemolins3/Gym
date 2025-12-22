import { BaseRepository } from './Base.repository';
import { Socio } from '../dto/Socio.dto';

export class SocioRepository extends BaseRepository<Socio> {
  constructor() {
    super({
      tableName: 'Socio',
      idColumn: 'ID',
      entityClass: Socio,
    });
  }}