import { ValueObject } from 'src/core/domain/value_objects/ValueObject';

export class nombreUsuario implements ValueObject<string> {
  private readonly name: string;

  constructor(name: string) {
    this.name = name;
  }

  isValid(): boolean {
    if (!/[^a-zA-Z]/.test(this.name) && this.name.length > 0) {
      return true;
    }
    return false;
  }

  equals(vo: this): boolean {
    return this.name === vo.name;
  }

  getValue(): string {
    return this.name;
  }
}
