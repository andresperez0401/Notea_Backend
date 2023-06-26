import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { EventPublisher } from 'src/core/domain/events/EventPublisher';
import { DomainEvent } from 'src/core/domain/events/DomainEvent'; 

@Injectable()
export class EventPublisherImpl implements EventPublisher {
  constructor(private readonly eventBus: EventBus) {}

  public publish(event: DomainEvent): void { 
    this.eventBus.publish(event);
  }
}


