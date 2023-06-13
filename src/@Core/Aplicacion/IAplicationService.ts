/* eslint-disable prettier/prettier */
import { Either } from 'src/Utils/Either';

export interface IAplicationService<V,T> {
    execute(s: V): Promise<Either<T,Error>>
}
