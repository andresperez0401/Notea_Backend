export interface EventPublisher {
    publish(event: DomainEvent): void;
  }
  
  export class DomainEvent {
    // Detalles del evento de dominio aquí
  }