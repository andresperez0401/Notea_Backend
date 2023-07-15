import { DomainEvent } from 'src/core/domain/events/DomainEvent';


export abstract class AggregateRoot {
    
    private _events: DomainEvent[] = [];
  

    protected constructor() {}
  
    protected addDomainEvent(event: DomainEvent): void {
      // Agrega el evento de dominio a esta agregate's lista de eventos de dominio
      this._events.push(event);
    }
  
    public getUncommittedEvents(): DomainEvent[] {
      return this._events;
    }
  
    public clearEvents(): void {
      this._events = [];
    }
  }