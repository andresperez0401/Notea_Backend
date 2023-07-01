import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UsuarioCreadoEvent } from 'src/Usuario/Dominio/eventos/UsuarioCreadoEvent';

import { crearEtiquetaService } from 'src/Etiqueta/Aplicacion/crearEtiqueta.service';
import { Inject } from '@nestjs/common';
import { colorEtiqueta } from 'src/Etiqueta/Dominio/ValueObjectsEtiqueta/colorEtiqueta';

@EventsHandler(UsuarioCreadoEvent)
export class UsuarioCreadoEventHandler
  implements IEventHandler<UsuarioCreadoEvent>
{
  constructor(
    @Inject('crearEtiquetaService')
    private etiquetaService: crearEtiquetaService,
  ) {}

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
  }
}
