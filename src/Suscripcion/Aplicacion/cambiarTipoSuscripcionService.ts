import { IAplicationService } from 'src/core/domain/appService/IAplicationService';
import { CrearSuscripcionDto } from './dto/CrearSuscripcion.dto';
import { Either } from 'src/Utils/Either';
import { Suscripcion } from '../Dominio/AgregadoSuscripcion';
import { RepositorioSuscripcion } from '../Dominio/repositorioSuscripcion';
import { TipoSuscripcionEnum } from '../Dominio/tipoSuscripcionEnum';
import { Optional } from 'src/Utils/Opcional';
import { cambiarTipoSuscripcionDto } from './dto/CambiarTipoSuscripcionDto';

export class cambiarTipoSuscripcionService implements IAplicationService<cambiarTipoSuscripcionDto, string> {

  private readonly repositorio: RepositorioSuscripcion;
  constructor(
    repositorio: RepositorioSuscripcion) {
    this.repositorio = repositorio;
  }
  
  async execute(s: cambiarTipoSuscripcionDto): Promise<Either<string, Error>> {

    return await this.repositorio.cambiarTipoSuscripcion(s);
  }
}
