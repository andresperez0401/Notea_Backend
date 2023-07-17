/* eslint-disable prettier/prettier */
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UsuarioCreadoEvent } from 'src/Usuario/Dominio/eventos/UsuarioCreadoEvent';

import { Inject } from '@nestjs/common';
import { colorEtiqueta } from 'src/Etiqueta/Dominio/ValueObjectsEtiqueta/colorEtiqueta';

import { crearEtiquetaService } from 'src/Etiqueta/Aplicacion/crearEtiqueta.service';
import { CrearGrupoService } from 'src/Grupo/Aplicacion/crearGrupoService';
import { CrearNotaService} from 'src/Nota/Aplicacion/CrearNota.service';

import { repositorioEtiquetaImp } from 'src/Etiqueta/Infraestructura/repository/repositorioEtiquetaImp';
import { RepositorioGrupoImp } from 'src/Grupo/Infraestructura/repository/RepositorioGrupoImpl';
import { RepositorioNotaImp } from 'src/Nota/Infraestructura/repository/RepositorioNotaImp';
import { CrearNotaDto } from 'src/Nota/Aplicacion/dto/CrearNota.dto';
import { IdContenidoNota } from 'src/Nota/Dominio/Entidades/ValueObjectsContenido/IdContenidoNota';
import { RepositorioSuscripcionImp } from 'src/Suscripcion/Infraestructura/RepositorioSuscripcionImpl';
import { CrearSuscripcionService } from 'src/Suscripcion/Aplicacion/crearSuscripcionService';

@EventsHandler(UsuarioCreadoEvent)
export class UsuarioCreadoEventHandler
  implements IEventHandler<UsuarioCreadoEvent>
{
  constructor(
    @Inject(crearEtiquetaService)
    @Inject(CrearGrupoService)
    @Inject(CrearNotaService)
    @Inject(CrearSuscripcionService)
    private etiquetaService: crearEtiquetaService,
    private grupoService: CrearGrupoService,
    private notaService: CrearNotaService,
    private suscripcionService: CrearSuscripcionService,
    private repositorioEtiqueta: repositorioEtiquetaImp,
    private repositorioNota: RepositorioNotaImp,
    private repositorioGrupo: RepositorioGrupoImp,
    private repositorioSuscripcion: RepositorioSuscripcionImp,
  ) {
    this.etiquetaService = new crearEtiquetaService(this.repositorioEtiqueta);
    this.grupoService = new CrearGrupoService(this.repositorioGrupo);
    this.notaService = new CrearNotaService(this.repositorioNota);
    this.suscripcionService = new CrearSuscripcionService(this.repositorioSuscripcion);
  }

  async handle(event: UsuarioCreadoEvent) {
    const idUsuario = event.getIdUsuario();

    // Creamos las etiquetas por defecto
    for (const color in colorEtiqueta) {

      if (colorEtiqueta.hasOwnProperty(color)) {
       await this.etiquetaService.execute({
          idUsuario,
          nombre: `Etiqueta ${color}`,
          color: colorEtiqueta[color as keyof typeof colorEtiqueta],
          
        });
       
      }
    }
    const result=await this.grupoService.execute({
      nombre:'General',
      idUsuario,

    });

    // Creamos la nota de bienvenida
    const contenido = {
      contenido : [
        {
          texto: {
            cuerpo: "Tus notas cargadas en la nube, en cualquier momento y lugar."
          },
          orden: 1
        }
      ]
    }
  
    await this.notaService.execute({
      titulo: 'Bienvenido a Notea',
      fechaCreacion: new Date(),
      contenido: contenido,
      grupo: result.getLeft().getId(),
    });


    //creamos la suscripcion del usuario
    await this.suscripcionService.execute({
      idUsuario,
    });


  }
}
