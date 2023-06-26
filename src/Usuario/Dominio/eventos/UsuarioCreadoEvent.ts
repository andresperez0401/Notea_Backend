import { DomainEvent } from 'src/core/domain/events/DomainEvent';

export class UsuarioCreadoEvent extends DomainEvent {
  constructor(
    private readonly idUsuario: string,
  ) {
    super();
  }

  
  public getIdUsuario(): string {
    return this.idUsuario;
  }
}

