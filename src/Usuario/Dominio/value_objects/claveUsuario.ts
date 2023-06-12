import { ValueObject } from 'src/core/domain/ValueObject';

export class claveUsuario implements ValueObject<string> {
  private readonly clave: string;

  constructor(clave: string) {
    this.clave = clave;
  }

  isValid(): boolean {
    if (!/[^a-zA-Z]/.test(this.clave) && this.clave.length > 0) {
      return true;
    }
    return false;
  }

  equals(vo: this): boolean {
    return this.clave === vo.clave;
  }

  getValue(): string {
    return this.clave;
  }
}
