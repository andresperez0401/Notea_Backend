import { IAplicationService } from 'src/core/domain/appService/IAplicationService';


import { Either } from 'src/Utils/Either';
import { CrearUsuarioDto } from './dto/CrearUsuario.dto';
import { Usuario } from '../Dominio/AgregadoUsuario';
import { RepositorioUsuario } from '../Dominio/RepositorioUsuario';

import { EventPublisher } from 'src/core/domain/events/EventPublisher';
import { UsuarioCreadoEvent } from '../Dominio/eventos/UsuarioCreadoEvent'; // Importa el evento

export class CrearUsuarioService implements IAplicationService<CrearUsuarioDto, Usuario> {

  private readonly repositorioUsuario: RepositorioUsuario;
  private readonly eventPublisher: EventPublisher;

  constructor(repositorioUsuario: RepositorioUsuario, eventPublisher: EventPublisher) {
    this.repositorioUsuario = repositorioUsuario;
    this.eventPublisher = eventPublisher;
  }

  async execute(s: CrearUsuarioDto): Promise<Either<Usuario, Error>> {
    const newUser: Usuario = Usuario.crearUsuario(
      s.nombre,
      s.apellido,
      s.email,
      s.clave,
      s.suscripcion
    );

    const resultado = await this.repositorioUsuario.crearUsuario(newUser);

    if (resultado.isLeft()) {
      const eventoUsuarioCreado = new UsuarioCreadoEvent(newUser.getId());
      this.eventPublisher.publish(eventoUsuarioCreado);
    }

    return resultado;
  }
}


