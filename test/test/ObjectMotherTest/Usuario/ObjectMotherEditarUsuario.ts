import { EditarUsuarioService } from 'src/Usuario/Aplicacion/EditarUsuario.service';
import { CrearUsuarioDto } from 'src/Usuario/Aplicacion/dto/CrearUsuario.dto';
import { EditarUsuarioPO } from 'src/Usuario/Aplicacion/dto/editarUsuarioPO';
import { MockRepositorioUsuario } from 'test/test/Mocks/UsuarioMock';

export class EditarUsuarioPrueba {
  public static crearUsuarioDtoValido(): EditarUsuarioPO {
    const dto = new EditarUsuarioPO();
    dto.id = 'c87eb4cb-0d04-49de-8aec-df4abe9c345b';

    const dto2 = new CrearUsuarioDto();
    dto2.nombre = 'Angel';
    dto2.apellido = 'Gonzalez';
    dto2.email = 'correo@correo.com';
    dto2.clave = '123456';
    dto2.suscripcion = true;

    dto.payload = dto2;

    return dto;
  }

  public static crearUsuarioDtoNoValidoVacio(): EditarUsuarioPO {
    const dto = new EditarUsuarioPO();
    dto.id = 'c87eb4cb-0d04-49de-8aec-df4abe9c345b';
    return dto;
  }
  public static crearUsuarioDtoNoValidoIdNoEncontrada(): EditarUsuarioPO {
    const dto = new EditarUsuarioPO();
    dto.id = 'c87eb4cb-0d04-49de-8aec-df4abe9c34ds';

    const dto2 = new CrearUsuarioDto();
    dto2.nombre = 'Angel';
    dto2.apellido = 'Gonzalez';
    dto2.email = 'correo@correo.com';
    dto2.clave = '123456';
    dto2.suscripcion = true;

    dto.payload = dto2;

    return dto;
  }

  public static editarUsuarioService(): EditarUsuarioService {
    const repo: MockRepositorioUsuario = new MockRepositorioUsuario();
    return new EditarUsuarioService(repo);
  }
}
