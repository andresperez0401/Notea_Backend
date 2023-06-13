import { ValueObject } from 'src/core/domain/value_objects/ValueObject';

export class apellidoUsuario implements ValueObject<string> {
  private readonly apellido: string;

  constructor(apellido: string) {
    this.apellido = apellido;
  }

  isValid(): boolean {
    if (!/[^a-zA-Z]/.test(this.apellido) && this.apellido.length > 0) {
      return true;
    }
    return false;
  }

  equals(vo: this): boolean {
    return this.apellido === vo.apellido;
  }

  getValue(): string {
    return this.apellido;
  }
}
