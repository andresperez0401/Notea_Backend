import { IAplicationService } from 'src/core/domain/appService/IAplicationService';
import { Either } from 'src/Utils/Either';

export abstract class ServiceDecorator<V, T>
  implements IAplicationService<V, T>
{
  private servicio: IAplicationService<V, T>;

  constructor(servicio: IAplicationService<V, T>) {
    this.servicio = servicio;
  }

  async execute(s: V): Promise<Either<T, Error>> {
    return this.servicio.execute(s);
  }
}
