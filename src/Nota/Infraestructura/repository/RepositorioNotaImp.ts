/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RepositorioNota } from '../../Dominio/RepositorioNota';
import { Nota } from '../../Dominio/AgregadoNota';
import { Either } from 'src/Utils/Either';
import { EntidadNota } from '../entities/EntidadNota';
import { EstadoEnum } from 'src/Nota/Dominio/ValueObjectsNota/EstadoEnum';
import { ModificarNotaDto } from 'src/Nota/Aplicacion/dto/ModificarNota.dto';
import { VOImagen } from 'src/Nota/Dominio/Entidades/VOImagen';
import EntidadImagen from '../entities/EntidadImagen';
import { EntidadUbicacion } from '../entities/EntidadUbicacion';

@Injectable()
export class RepositorioNotaImp implements RepositorioNota{

    constructor(
        @InjectRepository(EntidadNota)
        private readonly repositorio: Repository<EntidadNota>,
        @InjectRepository(EntidadImagen)
        private readonly repositorioImagen: Repository<EntidadImagen>,
    ){}

    async crearNota(nota: Nota): Promise<Either<Nota,Error>>{

        //let im = null

        console.log();

        let ub;
        if (nota.existeUbicacion()) {
            ub = new EntidadUbicacion();
            ub.latitud = nota.getUbicacion().get('latitud')
            ub.longitud = nota.getUbicacion().get('longitud');
        }

        const entidadNota : EntidadNota = {
            id: nota.getId(),
            titulo: nota.getTitulo(),
            contenido: nota.getContenido(),
            fechaCreacion: nota.getFechaCreacion(),
            estado: nota.getEstado(),
            ubicacion: ub,
            grupo: nota.getIdGrupo(),
            imagenes: []
        }
        //  const img = new EntidadImagen();
        //  img.nombre = nota.getImagenes()[0].getNombreImagen();
        //  img.buffer = nota.getImagenes()[0].getBufferImagen();
        //  img.nota = entidadNota;

        //     im = nota.getImagenes().map(imagen => {
        //         return {nombre: imagen.getNombreImagen(), 
        //                 buffer: imagen.getBufferImagen(),
        //                 nota : entidadNota,}
        //     })
        
        // entidadNota.imagenes.push(img);

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
            nota.fechaCreacion,
            EstadoEnum[nota.estado],
            nota.grupo,
            nota.ubicacion.latitud,
            nota.ubicacion.latitud,
            nota.contenido,
            nota.id,
            //nota.imagenes.map(imagen => {return VOImagen.crearImagenNota(imagen.nombre, imagen.buffer);}),
            ),
        );

        return Either.makeLeft(notas);
    } else {
        return Either.makeRight(new Error('Error al buscar las notas'));
    }
    }

    async eliminarNota(id: string): Promise<Either<string,Error>>{
        console.log('EliminarNota RepoImp');
        const notaAEliminar = await this.repositorio.findOne({where: {id}});
        if (notaAEliminar){
        const respuesta =  await this.repositorio.delete(notaAEliminar);
            if (respuesta){
                return Either.makeLeft<string,Error>('La nota '+ id +' ha sido eliminada');
            }
            else{
                return Either.makeRight<string,Error>(new Error('no se pudo eliminar la nota'));
            }
        }else {
            return Either.makeRight(new Error('No se encontro usuario con id' + id));
        }
    }

    async buscarNotasDeGrupo(
        idGrupo: string,
        ): Promise<Either<Iterable<Nota>, Error>> {
        const respuesta: EntidadNota[] = await this.repositorio.find({
            where: { grupo: idGrupo },
        });
        if (respuesta) {
            const notas: Nota[] = respuesta.map((n) =>
                //Transformamos el iterable de EntidadGrupo(infraestrutura) a Grupo(dominio)
                Nota.crearNota(n.titulo, 
                    n.fechaCreacion, 
                    EstadoEnum[n.estado],
                    n.grupo, 
                    n.ubicacion.latitud, 
                    n.ubicacion.latitud, 
                    n.contenido, 
                    n.id),
            );
            return Either.makeLeft<Iterable<Nota>, Error>(notas);
        } else {
            return Either.makeRight<Iterable<Nota>, Error>(
                new Error(`Error al obtener los notas del usuario ${idGrupo}`),
            );
        }
    }
}