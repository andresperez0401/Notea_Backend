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
import { moverNotaGrupo } from 'src/Nota/Aplicacion/dto/moverNotaGrupoDto';
import { VOImagen } from 'src/Nota/Dominio/ValueObjectsNota/VOImagen';
import EntidadImagen from '../entities/EntidadImagen';

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
        
        const entidadNota : EntidadNota = {
            id: nota.getId(),
            titulo: nota.getTitulo(),
            contenido: nota.getContenido(),
            fechaCreacion: nota.getFechaCreacion(),
            estado: nota.getEstado(),
            ubicacion: { latitud: nota.getUbicacion().get('latitud'),
            longitud: nota.getUbicacion().get('longitud'), },
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
            return Either.makeRight(new Error('No se encontro usuario con id' + infoNota.id));
        }
    }
    async moverNota(moveNota : moverNotaGrupo): Promise<Either<string,Error>>{

        const nota =  await this.repositorio.findOneBy({id : moveNota.id});
        if (nota){
            const responde = this.repositorio.merge(nota, moveNota)
            if (responde){
                await this.repositorio.save(nota)
                return Either.makeLeft("Nota actualizada");
            }else{ 
                return Either.makeRight(new Error('Error al modificar nota'));
            }
        }else {
            return Either.makeRight(new Error('No se encontro usuario con id' + moveNota.id));
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
            nota.ubicacion.latitud,
            nota.ubicacion.longitud,
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
        
        
            const notaAEliminar = await this.repositorio.findOne({where: {id}});
            if (notaAEliminar){
            const respuesta =  await this.repositorio.remove(notaAEliminar); //cambie de delete a remove (no se si es correcto)
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
}