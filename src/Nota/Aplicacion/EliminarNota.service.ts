import { Inject, Injectable } from '@nestjs/common';
import { IAplicationService } from 'src/core/domain/appService/IAplicationService';
import { Either } from 'src/Utils/Either';
import { Nota } from '../dominio/AgregadoNota';
import { RepositorioNota } from '../Dominio/RepositorioNota';
import { RepositorioNotaImp } from '../Infraestructura/repository/RepositorioNotaImp';
import { EliminarNotaDto } from './dto/EliminarNota.dto';

@Injectable()
export class EliminarNotaService implements IAplicationService<EliminarNotaDto,string>{
    private readonly repositorioNota : RepositorioNota;
    
    constructor(
    @Inject(RepositorioNotaImp)
    repositorioNota : RepositorioNota){
        this.repositorioNota = repositorioNota;
    }

async execute(id: EliminarNotaDto): Promise<Either<string, Error>> {
        return await this.repositorioNota.eliminarNota(id.id);
}



   


    
}