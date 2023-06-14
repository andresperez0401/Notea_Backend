import { v4 as uuidv4 } from 'uuid';

export class IdTarea {
  private id: string;

  private constructor() {
    this.id = uuidv4();
  }

  static crearIdTarea(): IdTarea {
    return new IdTarea();
  }

  getId(): string {
    return this.id;
  }
}
