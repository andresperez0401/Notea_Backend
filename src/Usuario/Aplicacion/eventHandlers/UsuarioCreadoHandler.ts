import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UsuarioCreadoEvent } from 'src/Usuario/Dominio/eventos/UsuarioCreadoEvent';

import { crearEtiquetaService } from 'src/Etiqueta/Aplicacion/CrearEtiqueta.service';
import { Inject } from '@nestjs/common';
import {colorEtiqueta} from 'src/Etiqueta/Dominio/ValueObjectsEtiqueta/colorEtiqueta';

@EventsHandler(UsuarioCreadoEvent)
export class UsuarioCreadoEventHandler implements IEventHandler<UsuarioCreadoEvent> {
  constructor(
    @Inject('crearEtiquetaService')
    private etiquetaService: crearEtiquetaService,
  ) {}

  async handle(event: UsuarioCreadoEvent) {
    // Ahora debes acceder a los campos directamente, no a través de 'event.usuario'
    const idUsuario = event.getIdUsuario();

    // Creamos las etiquetas por defecto
    for (let i = 0; i < 4; i++) {
      await this.etiquetaService.execute({ idUsuario, nombre: `Etiqueta ${i + 1}`, color: colorEtiqueta.ROJO });
    }
  }
}
