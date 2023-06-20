/* eslint-disable prettier/prettier */
import { v4 as uuidv4 } from 'uuid';
import { Optional } from 'src/Utils/opcional';

export class IdNota {
  private id: string;

  constructor(id: Optional<string>) {
    if (id.hasvalue()){
      this.id = id.getValue();
    }
    else{
      this.id = uuidv4();
    }
  }

  static crearIdNota(id?: string): IdNota {
    return new IdNota(new Optional<string>(id));
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
