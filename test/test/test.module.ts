import { DatabaseModule } from "src/db/db.module";
import { CrearGrupoPrueba } from "./ObjectMotherTest/Grupo/crearGrupoMotherObject";
import { UrlCrearGrupo } from "./ObjectMotherTest/http-protocols/crearGrupohttp";
import { NotaModule } from "src/Nota/Infraestructura/nota.module";
import { UsuarioModule } from "src/Usuario/Infraestructura/usuario.module";
import { EtiquetaModule } from "src/Etiqueta/Infraestructura/etiqueta.module";
import { GrupoModule } from "src/Grupo/Infraestructura/grupo.module";
import { CqrsModule } from "@nestjs/cqrs";
import { DecoratorModule } from "src/Decorators/Infraestructura/decorator.module";
import { SuscripcionModule } from "src/Suscripcion/Infraestructura/suscripcion.module";
import { Module, forwardRef } from "@nestjs/common";
import { CrearGrupoService } from "src/Grupo/Aplicacion/crearGrupoService";
import { CrearGrupoDto } from "src/Grupo/Aplicacion/dto/CrearGrupo.dto";
import { RepositorioGrupoImp } from "src/Grupo/Infraestructura/repository/RepositorioGrupoImpl";
import { EntidadGrupo } from "src/Grupo/Infraestructura/entities/EntidadGrupo";
import { EntidadUsuario } from "src/Usuario/Infraestructura/entities/EntidadUsuario";
import { EntidadNota } from "src/Nota/Infraestructura/entities/EntidadNota";




@Module({
    imports: [
      forwardRef(() => DatabaseModule),
      forwardRef(() => NotaModule),
      forwardRef(() => UsuarioModule),
      forwardRef(() => EtiquetaModule),
      forwardRef(() =>  GrupoModule),
      forwardRef(() => CqrsModule),
      forwardRef(() => DecoratorModule),
      forwardRef(() => SuscripcionModule),
    ], // Importa tus módulos aquí
    providers: [CrearGrupoPrueba,
                UrlCrearGrupo,
    
    ],
    exports: [CrearGrupoPrueba],
  })

  export class TestModule {}