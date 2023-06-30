/* eslint-disable prettier/prettier */
import { Inject } from '@nestjs/common';
import { IAplicationService } from 'src/core/domain/appService/IAplicationService';
import { Either } from 'src/Utils/Either';
import { RepositorioNota } from '../Dominio/RepositorioNota';
import { CambiarEstadoNotaDto } from './dto/CambiarEstadoNota.dto';

export class cambiarEstadoNotaService implements IAplicationService<CambiarEstadoNotaDto, string> {

  private readonly repositorioNota: RepositorioNota;

    constructor ( @Inject('RepositorioNota')
        repositorioNota: RepositorioNota ){
        this.repositorioNota = repositorioNota;
    }
  
  async execute(cambiarEstado: CambiarEstadoNotaDto): Promise<Either<string, Error>> {
    return await this.repositorioNota.cambiarEstadoNota(cambiarEstado.id, cambiarEstado.estado)
  }
}