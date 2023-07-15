import { IAplicationService } from 'src/core/domain/appService/IAplicationService';
import { Either } from 'src/Utils/Either';
import { ILogger } from './ILogger';
import { ServiceDecorator } from './ServiceDecorator';


export class LoggerService<V,T> extends ServiceDecorator<V,T>{

    private logger : ILogger;

    constructor(logger: ILogger, service : IAplicationService<V,T>, private mensaje: string) {
        super(service);
        this.logger = logger;
        this.mensaje = mensaje;
    }

    async execute(s: V): Promise<Either<T, Error>> {
        
        const response = await super.execute(s);
        
        if (response.isLeft()){
            const mandar = this.mensaje;
            this.loggear(mandar);
        }

        else{
            const mandar = response.getRight().message;
            this.loggear(mandar);
        }
        return response; 
    }

     loggear(s:string): void {
        this.logger.execute(s);
    }
}


