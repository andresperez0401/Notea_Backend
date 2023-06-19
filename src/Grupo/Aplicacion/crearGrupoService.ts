/* eslint-disable prettier/prettier */
import { Inject } from '@nestjs/common';
import { IAplicationService } from 'src/core/domain/appService/IAplicationService';
import { CrearGrupoDto } from './dto/CrearGrupo.dto';
import { Either } from 'src/Utils/Either';
import { Grupo } from '../Dominio/AgregadoGrupo';
import { RepositorioGrupo } from '../Dominio/RepositorioGrupo';

export class CrearGrupoService implements IAplicationService<CrearGrupoDto, Grupo> {

  private readonly repositorioNota: RepositorioGrupo;
  constructor( 
    repositorioNota: RepositorioGrupo) {
    this.repositorioNota = repositorioNota;
  }
  
  async execute(s: CrearGrupoDto): Promise<Either<Grupo, Error>> {

     const grupo =  Grupo.crearGrupo( //factory agregado
      s.idUsuario,
      s.nombre,
    );
    
    return await this.repositorioNota.creargrupo(grupo);
  }
    
}