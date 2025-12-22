export class Leccion {
    ID: string
    TurnoID: string
    ProfesorID: string
    CupoMin: number
    CupoMax: number
    Activo: boolean

    constructor (data: any) {
        this.ID = data.ID
        this.TurnoID = data.TurnoID
        this.ProfesorID = data.ProfesorID
        this.CupoMin = data.CupoMin
        this.CupoMax = data.CupoMax
        this.Activo = data.Activo

    }
}

export class LeccionCreate {
    TurnoID: string
    ProfesorID: string
    CupoMin: number
    CupoMax: number
    Activo: boolean

    constructor (data: any) {
        this.TurnoID = data.TurnoID
        this.ProfesorID = data.ProfesorID
        this.CupoMin = data.CupoMin
        this.CupoMax = data.CupoMax
        this.Activo = data.Activo ?? 1
    }
}

export class LeccionUpdate {
  TurnoID?: string;
  ProfesorID?: string;
  CupoMin?: number;
  CupoMax?: number;
  Activo?: boolean;


  constructor(data: any) {
    if (data.TurnoID !== undefined) this.TurnoID = data.TurnoID;
    if (data.ProfesorID !== undefined) this.ProfesorID = data.ProfesorID;
    if (data.CupoMin !== undefined) this.CupoMin = data.CupoMin;
    if (data.CupoMax !== undefined) this.CupoMax = data.CupoMax;
    if (data.Activo !== undefined) this.Activo = data.Activo;

  }
}

