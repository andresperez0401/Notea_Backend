import { IAplicationService } from 'src/core/domain/appService/IAplicationService';
import { CrearSuscripcionDto } from './dto/CrearSuscripcion.dto';
import { Either } from 'src/Utils/Either';
import { Suscripcion } from '../Dominio/AgregadoSuscripcion';
import { RepositorioSuscripcion } from '../Dominio/repositorioSuscripcion';
import { TipoSuscripcionEnum } from '../Dominio/tipoSuscripcionEnum';
import { Optional } from 'src/Utils/Opcional';

export class CrearSuscripcionService implements IAplicationService<CrearSuscripcionDto, Suscripcion> {

  private readonly repositorio: RepositorioSuscripcion;
  constructor(
    repositorio: RepositorioSuscripcion) {
    this.repositorio = repositorio;
  }
  
  async execute(s: CrearSuscripcionDto): Promise<Either<Suscripcion, Error>> {
     
    const fechaActual = new Date();
    const opFechaFin = new Optional<Date>(s.fechaFin);
    const grupo =  Suscripcion.crearSuscripcion(
        fechaActual,
        TipoSuscripcionEnum.FREE,
        s.idUsuario,
        opFechaFin,
     )
    return await this.repositorio.crearSuscripcion(grupo);
  }
}