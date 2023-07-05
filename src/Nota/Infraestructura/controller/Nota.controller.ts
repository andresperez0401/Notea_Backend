/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Body, Controller, Inject, Post,Get,Delete, Param,Patch, Res, UseInterceptors, UploadedFile, UploadedFiles} from "@nestjs/common";
import { Nota } from "src/Nota/Dominio/AgregadoNota";
import { CrearNotaService } from "../../Aplicacion/CrearNota.service";
import { CrearNotaDto } from "../../Aplicacion/dto/CrearNota.dto";
import { Either } from "src/Utils/Either";
import { EliminarNotaService } from "src/Nota/Aplicacion/EliminarNota.service";
import { EliminarNotaDto } from "src/Nota/Aplicacion/dto/EliminarNota.dto";
import { ModificarNotaDto } from "src/Nota/Aplicacion/dto/ModificarNota.dto";
import { ModificarNotaService } from "src/Nota/Aplicacion/ModificarNota.service";
import { BuscarNotas } from "src/Nota/Aplicacion/BuscarNotas.service";
import { cambiarGrupoNotaService } from "src/Nota/Aplicacion/cambiarGrupoNota.service";
import {  FilesInterceptor } from "@nestjs/platform-express/multer";
import { buscarNotasDeGrupoService } from "src/Nota/Aplicacion/BuscarNotaDeGrupo.service";
import { CambiarEstadoNotaDto } from "src/Nota/Aplicacion/dto/CambiarEstadoNota.dto";
import { cambiarEstadoNotaService } from "src/Nota/Aplicacion/cambiarEstadoNota.service";
import { CambiarGrupoNotaDto } from "src/Nota/Aplicacion/dto/CambiarGrupoNota.dto";
import { BuscarNotasDeGruposService} from "src/Nota/Aplicacion/BuscarNotasGrupos.service";
import { RepositorioNotaImp } from "../repository/RepositorioNotaImp";


@Controller('nota')
export class NotaController {
    constructor(
        @Inject(CrearNotaService)
        @Inject(EliminarNotaService)
        @Inject(ModificarNotaService)
        @Inject(BuscarNotas)
        @Inject(cambiarGrupoNotaService)
        @Inject(buscarNotasDeGrupoService)
        @Inject(cambiarEstadoNotaService)
        private readonly crearNotaService : CrearNotaService,
        private readonly eliminarNotaService : EliminarNotaService,
        private readonly ModificarNotaService : ModificarNotaService,
        private readonly moverNotaGrupoService : cambiarGrupoNotaService,
        private readonly buscarNotasService : BuscarNotas,
        private readonly buscarNotasDeGrupoService : buscarNotasDeGrupoService,
        private readonly cambiarEstadoNotaService : cambiarEstadoNotaService,
        private buscarNotasDeGruposService: BuscarNotasDeGruposService,
        private repositorio: RepositorioNotaImp,
        ){
            this.buscarNotasDeGruposService = new BuscarNotasDeGruposService(this.repositorio);
            this.crearNotaService =  crearNotaService;
            this.eliminarNotaService = eliminarNotaService;
            this.ModificarNotaService = ModificarNotaService;
            this.buscarNotasService = buscarNotasService;
            this.moverNotaGrupoService = moverNotaGrupoService
            this.buscarNotasDeGrupoService = buscarNotasDeGrupoService;
        };

    @Get('/all')
    async buscarNotas(@Res() response): Promise<Either<Iterable<Nota>, Error>>{
        console.log('Get All Notas');
        const n = await this.buscarNotasService.execute(null); //hay que validar si la locacion es null
        if (n.isLeft()) {
            return response.status(200).json(n.getLeft());
        }
        else {
            return response.status(404).json(n.getRight().message);
        }
    }

    @Post()
    @UseInterceptors(FilesInterceptor('imagenes'))
    async crearNota(@Res() response, @Body() nota:CrearNotaDto, @UploadedFiles() files: Express.Multer.File[]): Promise<Either<Nota,Error>>{
        console.log('Post Nota');

        //si logramos pasar las imagenes por el body, esto no es necesario
        
        // if (files) { 
        //     if (files.length != 0) {
        //         const imagenes = files.map((file) => {
        //             return {
        //                 nombre: file.originalname,
        //                 buffer: file.buffer,
        //             }
        //         });
        //         nota.imagenes = imagenes; // se le asigna las imagenes al dto nota, para que el servicio las guarde
        //     }                               //ya que las imagenes se pasan por separado del dto
        // }

        const  n =  await this.crearNotaService.execute(nota);
        if (n.isLeft()) {
            return response.status(200).json(n.getLeft());
        }
        else {
            return response.status(404).json(n.getRight().message);
        }
    }

    @Delete()
    async eliminarNota(@Res() response , @Body() id :EliminarNotaDto){
        console.log('Delete  Nota');
        const n = await this.eliminarNotaService.execute(id);
        if (n.isLeft()) {
            return response.status(200).json(n.getLeft());
        }
        else {
            return response.status(404).json(n.getRight().message);
        }
    }

    @Get('/grupos')
    async buscarNotasDeGrupos(@Res() response , @Body() grupos :Iterable<string>){
        console.log('Grupos');
        const n = await this.buscarNotasDeGruposService.execute(grupos);
        if (n.isLeft()) {
            return response.status(200).json(n.getLeft());
        }
        else {
            return response.status(404).json(n.getRight().message);
        }
    }

    @Patch()
    @UseInterceptors(FilesInterceptor('imagenes', 5))
    async update(@Res() response, @Body() notaMod: ModificarNotaDto, @UploadedFiles() files: Express.Multer.File[]): Promise<Either<string,Error>> {
        console.log('Mod  Nota');

        // if (files) {            
        //     if (files.length != 0) {
        //         const imagenes = files.map((file) => {
        //             return {
        //                 nombre: file.originalname,
        //                 buffer: file.buffer,
        //             }
        //         });
        //         notaMod.imagenes = imagenes; // se le asigna las imagenes al dto nota, para que el servicio las guarde
        //     }                               //ya que las imagenes se pasan por separado del dto
        // }

        const n =  await this.ModificarNotaService.execute(notaMod)
        if (n.isLeft()) {
            return response.status(200).json(n.getLeft());
        }
        else {
            return response.status(404).json(n.getRight().message);
        }
    }

    @Get('/grupo/:idGrupo')
    async buscarGruposUsuario(@Res() response, @Param('idGrupo') id: string) {
        const respuesta = await this.buscarNotasDeGrupoService.execute(id);
        if(respuesta.isLeft()){
            return response.status(200).json(respuesta.getLeft());
        }
        else{
            return response.status(404).json(respuesta.getRight().message);
        }
    }

    @Patch('/moverNota')
    async moveNote(@Res() response, @Body() notamove: CambiarGrupoNotaDto): Promise<Either<string,Error>> {
        console.log('Cambiar Grupo Nota');
        const n =  await this.moverNotaGrupoService.execute(notamove)
        if (n.isLeft()) {
            return response.status(200).json(n.getLeft());
        }
        else {
            return response.status(404).json(n.getRight().message);
        }
    }

    @Patch('/cambiarEstado')
    async cambiarEstado(@Res() response, @Body() nota: CambiarEstadoNotaDto): Promise<Either<string,Error>> {
        console.log('Cambiar Estado Nota');
        const n =  await this.cambiarEstadoNotaService.execute(nota)
        if (n.isLeft()) {
            return response.status(200).json(n.getLeft());
        }
        else {
            return response.status(404).json(n.getRight().message);
        }
    }

}