import { ValueObject } from 'src/core/domain/value_objects/ValueObject';
import { v4 as uuidv4 } from 'uuid';

export class idUsuario implements ValueObject<string> {
  private readonly id: string;

  constructor() {
    this.id = uuidv4();
  }

  isValid(): boolean {
    return this.id.length > 0;
  }

  equals(vo: this): boolean {
    return this.id === vo.id;
  }

  getValue(): string {
    return this.id;
  }
}
