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

@EventsHandler(UsuarioCreadoEvent)
export class UsuarioCreadoEventHandler
  implements IEventHandler<UsuarioCreadoEvent>
{
  constructor(
    @Inject(crearEtiquetaService)
    @Inject(CrearGrupoService)
    @Inject(CrearNotaService)
    private etiquetaService: crearEtiquetaService,
    private grupoService: CrearGrupoService,
    private notaService: CrearNotaService,
    private repositorioEtiqueta: repositorioEtiquetaImp,
    private repositorioNota: RepositorioNotaImp,
    private repositorioGrupo: RepositorioGrupoImp,
  ) {
    this.etiquetaService = new crearEtiquetaService(this.repositorioEtiqueta);
    this.grupoService = new CrearGrupoService(this.repositorioGrupo);
    this.notaService = new CrearNotaService(this.repositorioNota);
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
    console.log(result.getLeft().getId());
  }
}
