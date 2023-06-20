import { ValueObject } from 'src/core/domain/value_objects/ValueObject';

export class emailUsuario implements ValueObject<string> {
  private email: string;

  private constructor(email: string) {
    this.email = email;
  }

  static crearEmail(email:string){
    return new emailUsuario(email);
  }

  isValid(): boolean {
    if (
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.email) &&
      this.email.length > 0
    ) {
      return true;
    }
    return false;
  }

  equals(vo: this): boolean {
    return this.email === vo.email;
  }

  getValue(): string {
    return this.email;
  }
}
