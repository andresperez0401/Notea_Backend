/* eslint-disable prettier/prettier */
import { Inject } from '@nestjs/common';
import { IAplicationService } from 'src/core/domain/appService/IAplicationService';
import { Either } from 'src/Utils/Either';
import { RepositorioNota } from '../Dominio/RepositorioNota';
import { ModificarNotaDto } from './dto/ModificarNota.dto';

export class cambiarGrupoNota implements IAplicationService<ModificarNotaDto, string> {

  private readonly repositorioNota: RepositorioNota;

    constructor ( @Inject('RepositorioNota')
        repositorioNota: RepositorioNota ){
        this.repositorioNota = repositorioNota;
    }
  
  async execute(moverNotaGrupo: ModificarNotaDto): Promise<Either<string, Error>> {
    
    return await this.repositorioNota.updateNota(moverNotaGrupo)
  }
}