/* eslint-disable prettier/prettier */
import { Inject } from '@nestjs/common';
import { IAplicationService } from 'src/core/domain/appService/IAplicationService';
import { CrearGrupoDto } from './dto/CrearGrupo.dto';
import { Either } from 'src/Utils/Either';
import { Grupo } from '../Dominio/AgregadoGrupo';
import { RepositorioGrupo } from '../Dominio/RepositorioGrupo';

export class buscarGruposService implements IAplicationService<CrearGrupoDto, Iterable<Grupo>> {

  private readonly repositorioGrupo: RepositorioGrupo;
  constructor( 
    @Inject('RepositorioGrupo')
    repositorioGrupo: RepositorioGrupo) {
    this.repositorioGrupo = repositorioGrupo;
  }
  
  async execute(): Promise<Either<Iterable<Grupo>, Error>> {
    
    return await this.repositorioGrupo.buscarGrupos();
  }
    
}