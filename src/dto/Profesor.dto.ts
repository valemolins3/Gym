export class Profesor {
    ID: string
    Nombre: string
    Telefono: string
    Sueldo: number
    Activo: boolean

    constructor (data: any) {
        this.ID = data.ID;
        this.Nombre = data.Nombre;
        this.Telefono = data.Telefono;
        this.Sueldo = data.Sueldo;
        this.Activo = data.Activo;
    }
}

export class ProfesorCreate {
    Nombre: string
    Telefono: string
    Sueldo: number
    Activo: boolean

    constructor (data: any) {
        this.Nombre = data.Nombre;
        this.Telefono = data.Telefono;
        this.Sueldo = data.Sueldo;
        this.Activo = data.Activo ?? true;
    }
}

export class ProfesorUpdate {
    Nombre?: string;
    Telefono?: string;
    Sueldo?: number;
    Activo?: boolean;

    constructor(data: any) {
        if (data.Nombre !== undefined) this.Nombre = data.Nombre;
        if (data.Telefono !== undefined) this.Telefono = data.Telefono;
        if (data.Sueldo !== undefined) this.Sueldo = data.Sueldo;
        if (data.Activo !== undefined) this.Activo = data.Activo;
    }
}