import { v4 as uuidv4 } from 'uuid';

export class IdNota {
  private id: string;

  private constructor() {
    this.id = uuidv4();
  }

  static crearIdNota(): IdNota {
    return new IdNota();
  }

  getId(): string {
    return this.id;
  }
}
