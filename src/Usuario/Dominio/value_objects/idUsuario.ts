import { ValueObject } from 'src/core/domain/value_objects/ValueObject';

export class idUsuario implements ValueObject<number> {
  private readonly id: number;

  constructor(id: number) {
    this.id = id;
  }

  isValid(): boolean {
    return this.id > 0;
  }

  equals(vo: this): boolean {
    return this.id === vo.id;
  }

  getValue(): number {
    return this.id;
  }
}
