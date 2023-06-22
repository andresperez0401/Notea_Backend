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
import { moverNotaGrupo } from 'src/Nota/Aplicacion/dto/moverNotaGrupoDto';

@Injectable()
export class RepositorioNotaImp implements RepositorioNota{

    constructor(
        @InjectRepository(EntidadNota)
        private readonly repositorio: Repository<EntidadNota>,
    ){}

    async crearNota(nota: Nota): Promise<Either<Nota,Error>>{

        const entidadNota : EntidadNota = {
            id: nota.getId(),
            titulo: nota.getTitulo(),
            contenido: nota.getContenido(),
            fechaCreacion: nota.getFechaCreacion(),
            estado: nota.getEstado(),
            ubicacion: { latitud: nota.getUbicacion().get('latitud'),
                        longitud: nota.getUbicacion().get('longitud'), },
            grupo: nota.getIdGrupo(),
        }
 
        const response = await this.repositorio.save(entidadNota); //guardar en la base de datos usando TypeORM
        if (response){
            return Either.makeLeft<Nota,Error>(nota);
        }else{ 
            return Either.makeRight<Nota,Error>(new Error('Error al crear la nota'));
        }
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
            nota.ubicacion.latitud,
            nota.ubicacion.longitud,
            nota.grupo,
            nota.id,
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
}