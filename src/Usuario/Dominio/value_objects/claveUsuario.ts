import { ValueObject } from 'src/core/domain/value_objects/ValueObject';

export class claveUsuario implements ValueObject<string> {
  private readonly clave: string;

  private constructor(clave: string) {
    this.clave = clave;
  }
  
  static createClave(clave: string){
    return new claveUsuario(clave);
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
