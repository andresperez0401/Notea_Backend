import { v4 as uuidv4 } from 'uuid';

export class IdNota {
  private id: string;

  constructor() {
    this.id = uuidv4();
  }

  getId(): string {
    return this.id;
  }
}
