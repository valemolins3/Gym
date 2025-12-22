export class Socio {
    ID: string
    Nombre: string
    Telefono: string
    Activo: boolean

    constructor (data: any) {
        this.ID = data.ID
        this.Nombre = data.Nombre
        this.Telefono = data.Telefono
        this.Activo = data.Activo
    }
}

export class SocioCreate {
    ID: string
    Nombre: string
    Telefono: string
    Activo: boolean

    constructor (data: any) {
        this.ID = data.ID
        this.Nombre = data.Nombre
        this.Telefono = data.Telefono
        this.Activo = data.Activo ?? 1
    }
}

export class SocioUpdate {
  Nombre?: string;
  Telefono?: string;
  Activo?: boolean;

  constructor(data: any) {
    if (data.Nombre !== undefined) this.Nombre = data.Nombre;
    if (data.Telefono !== undefined) this.Telefono = data.Telefono;
    if (data.Activo !== undefined) this.Activo = data.Activo;
  }
}

