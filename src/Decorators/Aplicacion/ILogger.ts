import { Either } from 'src/Utils/Either';

export interface ILogger {
  execute(message: string): Promise<Either<string, Error>>;
}
