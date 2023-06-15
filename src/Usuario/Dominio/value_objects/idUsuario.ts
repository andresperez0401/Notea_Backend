/* eslint-disable prettier/prettier */
import { Optional } from 'src/Utils/opcional';
import { ValueObject } from 'src/core/domain/value_objects/ValueObject';
import { v4 as uuidv4 } from 'uuid';

export class idUsuario implements ValueObject<string> {
  private readonly id: string;

  private constructor(id: Optional<string>) {
    if (id.hasvalue()){
      this.id = id.getValue();
    }
    else{
      this.id = uuidv4();
    }
  }

  static crearIdUsuario(id?: string): idUsuario {
    return new idUsuario(new Optional<string>(id));
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
