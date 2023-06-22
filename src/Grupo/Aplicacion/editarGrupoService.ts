/* eslint-disable prettier/prettier */
import { Inject } from '@nestjs/common';
import { IAplicationService } from 'src/core/domain/appService/IAplicationService';
import { CrearGrupoDto } from './dto/CrearGrupo.dto';
import { Either } from 'src/Utils/Either';
import { Grupo } from '../Dominio/AgregadoGrupo';
import { RepositorioGrupo } from '../Dominio/RepositorioGrupo';
import { EditarGrupoDto } from './dto/EditarGrupo.dto';

export class EditarGrupoService implements IAplicationService<EditarGrupoDto, Grupo> {

  private readonly repositorioGrupo: RepositorioGrupo;
  constructor( 
    repositorioGrupo: RepositorioGrupo) {
    this.repositorioGrupo = repositorioGrupo;
  }
  
  async execute(s: EditarGrupoDto): Promise<Either<Grupo, Error>> {
   
    return await this.repositorioGrupo.editarGrupo(s);
  }
    
}