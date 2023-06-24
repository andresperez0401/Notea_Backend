import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { EventPublisher } from 'src/core/domain/events/EventPublisher';
import { Usuario } from 'src/Usuario/Dominio/AgregadoUsuario';

@Injectable()
export class EventPublisherImpl implements EventPublisher {
  constructor(private readonly eventBus: EventBus) {}

  public publish(usuario: Usuario): void {
    const events = usuario.getEvents();

    events.forEach((event) => this.eventBus.publish(event));
  }
}
