import { Either } from 'src/Utils/Either';

export interface IInfraestructureService<V, T> {
  execute(s: V): Either<T, Error>;
}
