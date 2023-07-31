/* eslint-disable prettier/prettier */
import { crearEtiquetaService } from 'src/Etiqueta/Aplicacion/crearEtiqueta.service';
import { actualizarEtiquetaDto } from 'src/Etiqueta/Aplicacion/dto/actualizarEtiqueta.dto';
import { crearEtiquetaDto } from 'src/Etiqueta/Aplicacion/dto/crearEtiqueta.dto';
import { Etiqueta } from 'src/Etiqueta/Dominio/AgregadoEtiqueta';
import { RepositorioEtiqueta } from 'src/Etiqueta/Dominio/RepositorioEtiqueta';
import { colorEtiqueta } from 'src/Etiqueta/Dominio/ValueObjectsEtiqueta/colorEtiqueta';
import { Either } from 'src/Utils/Either';

export class CrearEtiquetaPrueba {
  public static crearEtiquetaDtoValido(): crearEtiquetaDto {
    const dto = new crearEtiquetaDto();
    dto.nombre = 'test';
    dto.color = colorEtiqueta.BLUE;
    dto.idUsuario = 'c87eb4cb-0d04-49de-8aec-df4abe9c345c';
    return dto;
  }
  public static crearEtiquetaDtoInvalido(): crearEtiquetaDto {
    const dto = {
        nombre: 'test',
        color: 'INVALID_COLOR',
        idUsuario: 'c87eb4cb-0d04-49de-8aec-df4abe9c345c',
    } as unknown as crearEtiquetaDto;

    return dto;
  }
  public static crearEtiquetaService(): crearEtiquetaService {
    const repo: mockRepositorioEtiqueta = new mockRepositorioEtiqueta();
    return new crearEtiquetaService(repo);
  }
}

export class mockRepositorioEtiqueta implements RepositorioEtiqueta {
  async crearEtiqueta(etiqueta: Etiqueta): Promise<Either<Etiqueta, Error>> {
    if (
      etiqueta.getUsuarioId() == CrearEtiquetaPrueba.crearEtiquetaDtoValido().idUsuario
    ) {
      return Either.makeLeft<Etiqueta, Error>(etiqueta);
    } else {
      return Either.makeRight<Etiqueta, Error>(
        new Error('Error al crear Etiqueta'),
      );
    }
  }
  actualizarEtiqueta(
    Etiqueta: actualizarEtiquetaDto,
  ): Promise<Either<string, Error>> {
    throw new Error('Method not implemented.');
  }

  buscarEtiquetas(
    idEtiqueta: string,
  ): Promise<Either<Iterable<Etiqueta>, Error>> {
    throw new Error('Method not implemented.');
  }
}
