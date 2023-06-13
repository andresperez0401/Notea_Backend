import { Either } from "src/Usuario/utils/either";

export interface IAplicationService<V,T> {
    execute(s: V): Promise<Either<T,Error>>
}