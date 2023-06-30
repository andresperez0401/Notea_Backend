/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { RepositorioNota } from '../../Dominio/RepositorioNota';
import { Nota } from '../../Dominio/AgregadoNota';
import { Either } from 'src/Utils/Either';
import { EntidadNota } from '../entities/EntidadNota';
import { EstadoEnum } from 'src/Nota/Dominio/ValueObjectsNota/EstadoEnum';
import { ModificarNotaDto } from 'src/Nota/Aplicacion/dto/ModificarNota.dto';

import EntidadImagen from '../entities/EntidadImagen';
import { VOImagen } from 'src/Nota/Dominio/ValueObjectsNota/VOImagen';
import { Optional } from 'src/Utils/Opcional';
import { EntidadUbicacion } from '../entities/EntidadUbicacion';
import EntidadTarea from '../entities/EntidadTarea';

@Injectable()
export class RepositorioNotaImp implements RepositorioNota{

    constructor(
        @InjectRepository(EntidadNota)
        private readonly repositorio: Repository<EntidadNota>,
        @InjectRepository(EntidadImagen)
        private readonly repositorioImagen: Repository<EntidadImagen>,
    ){}

    async crearNota(nota: Nota): Promise<Either<Nota,Error>>{

        let ub;
        if (nota.existeUbicacion()) {
            ub = new EntidadUbicacion();
            ub.latitud = nota.getUbicacion().get('latitud')
            ub.longitud = nota.getUbicacion().get('longitud');
        }

        const entidadNota = new EntidadNota();
        entidadNota.id = nota.getId();
        entidadNota.titulo = nota.getTitulo();
        entidadNota.contenido = nota.getContenido();
        entidadNota.fechaCreacion = nota.getFechaCreacion();
        entidadNota.estado = nota.getEstado();
        entidadNota.ubicacion = ub;
        entidadNota.grupo = nota.getIdGrupo();
        entidadNota.imagenes = [];

        console.log(nota.getTareas());

        let tareas : EntidadTarea[];
        if (nota.existeTareas()) { //puedo hacer lo mismo con las imagenes
            tareas = nota.getTareas().map(tarea => {
                const t = new EntidadTarea();
                t.id = tarea.getId();
                t.titulo = tarea.getTitulo();
                t.check = tarea.getCheck();
                t.nota = entidadNota;
                return t;
            })
        }
        entidadNota.tareas = tareas;

         let imagenes : EntidadImagen[];
        if (nota.existenImagenes()) { //puedo hacer lo mismo con las imagenes
            imagenes = nota.getImagenes().map(imagen => {
                const im = new EntidadImagen();
                im.nombre = imagen.getNombreImagen();
                im.buffer = imagen.getBufferImagen();
                im.nota = entidadNota;
                return im;
            })
        }  
        entidadNota.imagenes = imagenes;
        
        const response = await this.repositorio.save(entidadNota); //guardar en la base de datos usando TypeORM
        if (response){
            return Either.makeLeft<Nota,Error>(nota);
        }else{
            return Either.makeRight<Nota,Error>(new Error('Error al crear la nota'));
        }
    }

    async guardarImagenes(id: string, imagenes: VOImagen[]): Promise<Either<string,Error>>{
        const nota =  await this.repositorio.findOneBy({id : id});

        if (imagenes.length >= 1) {

            const im = imagenes.map(imagen => { //pasamos de VO a Entidad
                return {nombre: imagen.getNombreImagen(),
                        buffer: imagen.getBufferImagen(),
                        nota : nota,
                    }
            })

            const response = await this.repositorioImagen.save(im); //guardar en la base de datos usando TypeORM
            if (response){
                return Either.makeLeft("Imagenes guardadas");
            }else{
                return Either.makeRight(new Error('Error al guardar imagenes'));
            }
        } else {
            return Either.makeLeft("No hay imagenes para guardar");
        }

        //no se si este codigo podria simplificar la subida de imagen
        // if (nota){ //si existe la nota la actualizamos con las imagenes
        //     const responde = this.repositorio.merge(nota, {imagenes: im})
        //     if (responde){
        //         await this.repositorio.save(nota)
        //         console.log("Imagenes guardadas");
        //         return Either.makeLeft("Imagenes guardadas");
        //     }else{
        //         console.log("Error al guardar imagenes");
        //         return Either.makeRight(new Error('Error al guardar imagenes'));
        //     }
        // }else {
        //     console.log("No se encontro nota con id" + id);
        //     return Either.makeRight(new Error('No se encontro usuario con id' + id));
        // }
    }
    
    async updateNota(infoNota : ModificarNotaDto): Promise<Either<string,Error>>{

        const nota =  await this.repositorio.findOneBy({id : infoNota.id});
        if (nota){
            const responde = this.repositorio.merge(nota, infoNota)
            if (responde){
                await this.repositorio.save(nota)
                return Either.makeLeft("Nota actualizada");
            }else{ 
                return Either.makeRight(new Error('Error al modificar nota'));
            }
        }else {
            return Either.makeRight(new Error('No se encontro nota con id' + infoNota.id));
        }
    }
    
    
    
    
    // async buscarNota(id: string): Promise<Either<Nota,Error>>{
    //     console.log('BuscarNota RepoImp');
    //     try{
    //         const nota = await this.repositorio.findOne({id: id}
    //         );
    //          return Either.makeLeft<Nota,Error>(nota);
    //     }catch(error){
    //         return Either.makeRight<Nota,Error>(error);
    //     }
    // }

    async buscarNotas(): Promise<Either<Iterable<Nota>,Error>>{
        const respuesta: EntidadNota[] = await this.repositorio.find();

        if (respuesta) {
        const notas: Nota[] = respuesta.map((nota) =>
            Nota.crearNota(
            nota.titulo,
            nota.contenido,
            nota.fechaCreacion,
            EstadoEnum[nota.estado],
            nota.grupo,
            new Optional<number>(nota.ubicacion.latitud),
            new Optional<number>(nota.ubicacion.longitud),
            new Optional(nota.tareas.map(tarea => {return tarea.titulo})),
            new Optional(nota.tareas.map(tarea => {return tarea.check})),
            new Optional(nota.tareas.map(tarea => {return tarea.id})),
            nota.id,
            nota.imagenes.map(imagen => {return VOImagen.crearImagenNota(imagen.nombre, imagen.buffer);}),
            ),
        );

        return Either.makeLeft(notas);
    } else {
        return Either.makeRight(new Error('Error al buscar las notas'));
    }
    }

    async eliminarNota(id: string): Promise<Either<string,Error>>{
        console.log('EliminarNota RepoImp');
        const respuesta =  await this.repositorio.delete(id);
            if (respuesta){
                return Either.makeLeft<string,Error>('La nota '+ id +' ha sido eliminada');
            }
            else{
                return Either.makeRight<string,Error>(new Error('no se pudo eliminar la nota'));
            }
    }

    async buscarNotasDeGrupo(
        idGrupo: string,
        ): Promise<Either<Iterable<Nota>, Error>> {
        const respuesta: EntidadNota[] = await this.repositorio.find({
            where: { grupo: idGrupo },
        });
        if (respuesta) {
            const notas: Nota[] = respuesta.map((nota) =>
            Nota.crearNota(
            nota.titulo,
            nota.contenido,
            nota.fechaCreacion,
            EstadoEnum[nota.estado],
            nota.grupo,
            new Optional<number>(nota.ubicacion.latitud),
            new Optional<number>(nota.ubicacion.longitud),
            new Optional(nota.tareas.map(tarea => {return tarea.titulo})),
            new Optional(nota.tareas.map(tarea => {return tarea.check})),
            new Optional(nota.tareas.map(tarea => {return tarea.id})),
            nota.id,
            nota.imagenes.map(imagen => {return VOImagen.crearImagenNota(imagen.nombre, imagen.buffer);}),
            ),
            );

            return Either.makeLeft<Iterable<Nota>, Error>(notas);
        } 
        else {
            return Either.makeRight<Iterable<Nota>, Error>(
                new Error(`Error al obtener los notas del usuario ${idGrupo}`),
            );
        }
    }
}