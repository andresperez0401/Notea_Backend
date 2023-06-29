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
import { cambiarGrupoNota } from "src/Nota/Aplicacion/cambiarGrupoNota.service";
import {  FilesInterceptor } from "@nestjs/platform-express/multer";
import { buscarNotasDeGrupoService } from "src/Nota/Aplicacion/BuscarNotaDeGrupoService";


@Controller('nota')
export class NotaController {
    constructor(
        @Inject(CrearNotaService)
        @Inject(EliminarNotaService)
        @Inject(ModificarNotaService)
        @Inject(BuscarNotas)
        private readonly crearNotaService : CrearNotaService,
        private readonly eliminarNotaService : EliminarNotaService,
        private readonly ModificarNotaService : ModificarNotaService,
        private readonly moverNotaGrupoService : cambiarGrupoNota,
        private readonly buscarNotasService : BuscarNotas,
        private readonly buscarNotasDeGrupoService : buscarNotasDeGrupoService
        ){
            this.crearNotaService = crearNotaService;
            this.eliminarNotaService = eliminarNotaService;
            this.ModificarNotaService = ModificarNotaService;
            this.buscarNotasService = buscarNotasService;
            this.moverNotaGrupoService = moverNotaGrupoService
        };

    @Get('/all')
    async buscarNotas(@Res() response): Promise<Either<Iterable<Nota>, Error>>{
        console.log('Get All Notas');
        const n = await this.buscarNotasService.execute(null);
        if (n.isLeft()) {
            return response.status(200).json(n.getLeft());
        }
        else {
            return response.status(404).json(n.getRight().message);
        }
    }

    @Post()
    @UseInterceptors(FilesInterceptor('imagenes', 5))
    async crearNota(@Res() response, @Body() nota:CrearNotaDto, @UploadedFiles() files: Express.Multer.File[]): Promise<Either<Nota,Error>>{
        console.log('Post Nota');

        if (files) {
            if (files.length > 5)
            return response.status(400).json({ message: 'No se pueden subir mas de 5 imagenes' });
            
            if (files.length != 0) {
                const imagenes = files.map((file) => {
                    return {
                        nombre: file.originalname,
                        buffer: file.buffer,
                    }
                });
                nota.imagenes = imagenes; // se le asigna las imagenes al dto nota, para que el servicio las guarde
            }                               //ya que las imagenes se pasan por separado del dto
        }

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

    @Patch()
    @UseInterceptors(FilesInterceptor('imagenes', 5))
    async update(@Res() response, @Body() notaMod: ModificarNotaDto, @UploadedFiles() files: Express.Multer.File[]): Promise<Either<string,Error>> {
        console.log('Mod  Nota');

                notaMod.imagenes = [];
        if (files.length > 5) {
            return response.status(400).json({ message: 'No se pueden subir mas de 5 imagenes' });
        }
        if (files.length != 0) {
            const imagenes = files.map((file) => {
                return {
                    nombre: file.originalname,
                    buffer: file.buffer,
                }});
            notaMod.imagenes = imagenes; // se le asigna las imagenes a la nota
        }

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
    async moveNote(@Res() response, @Body() notamove: ModificarNotaDto): Promise<Either<string,Error>> {
        console.log('Mod  Nota');
        const n =  await this.moverNotaGrupoService.execute(notamove)
        if (n.isLeft()) {
            return response.status(200).json(n.getLeft());
        }
        else {
            return response.status(404).json(n.getRight().message);
        }
    }

}