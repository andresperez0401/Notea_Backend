/* eslint-disable prettier/prettier */
import { v4 as uuidv4 } from 'uuid';
import { Optional } from 'src/Utils/Opcional';

export class idSuscripcion {
  private id: string;

  constructor(id: Optional<string>) {
    if (id.hasvalue()){
      this.id = id.getValue();
    }
    else{
      this.id = uuidv4();
    }
  }

  static crearIdSuscripcion(id?: string): idSuscripcion {
    return new idSuscripcion(new Optional<string>(id));
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
