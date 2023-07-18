import { IAplicationService } from 'src/core/domain/appService/IAplicationService';
import { Either } from 'src/Utils/Either';
import { Suscripcion } from '../Dominio/AgregadoSuscripcion';
import { RepositorioSuscripcion } from '../Dominio/repositorioSuscripcion';

export class buscarSuscripcionDeUsuarioService implements IAplicationService<string, Suscripcion> {

  private readonly repositorio: RepositorioSuscripcion;
  constructor( 
    repositorio: RepositorioSuscripcion) {
    this.repositorio = repositorio;
  }
  async execute(idUsuarioDueno: string): Promise<Either<Suscripcion, Error>> {
    return await this.repositorio.buscarSuscripcionUsuario(idUsuarioDueno);
  }
}