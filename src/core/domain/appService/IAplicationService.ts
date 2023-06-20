import { Either } from 'src/utils/either';

export interface IAplicationService<V, T> {
  execute(s: V): Promise<Either<T, Error>>;
}
