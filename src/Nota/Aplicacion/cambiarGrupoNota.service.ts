/* eslint-disable prettier/prettier */
import { Inject } from '@nestjs/common';
import { IAplicationService } from 'src/core/domain/appService/IAplicationService';
import { Either } from 'src/Utils/Either';
import { moverNotaGrupo } from './dto/moverNotaGrupoDto';
import { RepositorioNota } from '../Dominio/RepositorioNota';

export class cambiarGrupoNota implements IAplicationService<moverNotaGrupo, string> {

  private readonly repositorioNota: RepositorioNota;

    constructor ( @Inject('RepositorioNota')
        repositorioNota: RepositorioNota ){
        this.repositorioNota = repositorioNota;
    }
  
  async execute(moverNotaGrupo: moverNotaGrupo): Promise<Either<string, Error>> {
    
    return await this.repositorioNota.moverNota(moverNotaGrupo)
  }
}