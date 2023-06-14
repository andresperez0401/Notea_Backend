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
                        longitud: nota.getUbicacion().get('longitud'), } 
        }
 
        try{
            await this.repositorio.save(entidadNota); //guardar en la base de datos usando TypeORM
            return Either.makeLeft<Nota,Error>(nota);
        }catch(error){ //no se puede manejar el error en el mismo repositorio
            return Either.makeRight<Nota,Error>(new Error('Error al crear la nota'));
        }
    }
    
    async updateNota(infoNota : ModificarNotaDto): Promise<Either<string,Error>>{

        const nota =  await this.repositorio.findOneBy({id : infoNota.id}); 
        try{         
            await this.repositorio.merge(nota, infoNota)
        await this.repositorio.save(nota)  
            //guardar en la base de datos usando TypeORM
            return Either.makeLeft("Nota actualizada");
        }catch(error){ //no se puede manejar el error en el mismo repositorio
            return Either.makeRight(new Error('Error al modificar nota'));
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
        console.log('BuscarNotas RepoImp');

    try {
        const respuesta: EntidadNota[] = await this.repositorio.find();
        const notas: Nota[] = respuesta.map((nota) =>
            Nota.crearNota(
            nota.titulo,
            nota.contenido,
            nota.fechaCreacion,
            EstadoEnum[nota.estado],
            nota.ubicacion.latitud,
            nota.ubicacion.longitud,
            nota.id,
            ),
        );

        return Either.makeLeft(notas);
    } catch (error) {
        return Either.makeRight(new Error('Error al buscar las notas'));
    }
    }

    async eliminarNota(id: string): Promise<Either<string,Error>>{
        console.log('EliminarNota RepoImp');
        
        try{
            const notaAEliminar = await this.repositorio.findOne({where: {id}});
           await this.repositorio.delete(notaAEliminar);
            return Either.makeLeft('La nota ha sido eliminada');
        }catch(error){
            return Either.makeRight(error);
        }
    }

    // async buscarNotasPorEstado(estado: string): Promise<Either<Nota[],Error>>{
    //     console.log('BuscarNotasPorEstado RepoImp');
    //     try{
    //         const notas = await this.repositorio.find({estado: estado});
    //         return Either.right(notas);
    //     }catch(error){
    //         return Either.left(error);
    //     }
    // }

    // async buscarNotasPorKeyword(keyword: string): Promise<Either<Nota[],Error>>{
    //     console.log('BuscarNotasPorKeyword RepoImp');
    //     try{
    //         const notas = await this.repositorio.find({titulo: keyword});
    //         return Either.right(notas);
    //     }catch(error){
    //         return Either.left(error);
    //     }
    // }

    // async buscarNotasPorFecha(fecha: Date): Promise<Either<Nota[],Error>>{
    //     console.log('BuscarNotasPorFecha RepoImp');
    //     try{
    //         const notas = await this.repositorio.find({fechaCreacion: fecha});
    //         return Either.right(notas);
    //     }catch(error){
    //         return Either.left(error);
    //     }
    // }
}