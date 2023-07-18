/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RepositorioNota } from '../../Dominio/RepositorioNota';
import { Nota } from '../../Dominio/AgregadoNota';
import { Either } from 'src/Utils/Either';
import { EntidadNota } from '../entities/EntidadNota';

import { Optional } from 'src/Utils/Opcional';
import { AggNotaToEntityService } from '../servicios/AggNotaToEntityService';
import { IInfraestructureService } from 'src/core/domain/infService/IInfraestructureService';
import { EntityToStringService } from '../servicios/EntityToStringService';

@Injectable()
export class RepositorioNotaImp implements RepositorioNota{

    constructor(
        @InjectRepository(EntidadNota)
        private readonly repositorio: Repository<EntidadNota>,
        @Inject(AggNotaToEntityService)
        private readonly AggNotaToEntity: IInfraestructureService<Nota,EntidadNota>,
        //@Inject(EntityToAggNotaService)
        //private readonly EntityToAggNota: IInfraestructureService<Array<EntidadNota>, Array<Nota>>,
        @Inject(EntityToStringService)
        private readonly EntityToString: IInfraestructureService<Array<EntidadNota>, string>,
    ){}

    async crearNota(nota: Nota): Promise<Either<Nota,Error>>{

        const entidadNota = this.AggNotaToEntity.execute(nota);
        
        const response = await this.repositorio.save(entidadNota.getLeft()); //guardar en la base de datos usando TypeORM
        if (response){
            return Either.makeLeft<Nota,Error>(nota);
        }else{
            return Either.makeRight<Nota,Error>(new Error('Error al crear la nota'));
        }
    }
    
    async updateNota(nota : Nota): Promise<Either<string,Error>>{

        const entidadNota = this.AggNotaToEntity.execute(nota);

        if (entidadNota.isLeft()) {
            const responde = await this.repositorio.save(entidadNota.getLeft())
            //recorrer el arreglo de contenido y guardar cada uno puede funcionar
            //si no se puede entonces hay que hacer la vaina manual
            if (responde){
                //await this.repositorio.save(nota)
                return Either.makeLeft("Nota actualizada");
            }else{ 
                return Either.makeRight(new Error('Error al modificar nota'));
            }
        } else {
            return Either.makeRight(new Error('Error con formato de nota'));
        }
    
    }
    
    async cambiarEstadoNota(id: string, estado: string): Promise<Either<string, Error>> {
            const response = await this.repositorio.update(id, {estado: estado});
            if (response.affected > 0){
                return Either.makeLeft("Estado actualizado");
            }else{
                return Either.makeRight(new Error('La nota no existe'));
            }
    }

    async cambiarGrupoNota(id: string, idGrupo:string): Promise<Either<string,Error>> {
         const response = await this.repositorio.update(id, {grupo: idGrupo});
            if (response.affected > 0){
                return Either.makeLeft("Nuevo grupo de la nota actualizado");
            }else{
                return Either.makeRight(new Error('La nota no existe'));
            }
    }

    async buscarNotas(): Promise<Either<string,Error>>{
        const respuesta: EntidadNota[] = await this.repositorio.find();

        if (respuesta) {
            const notas = this.EntityToString.execute(respuesta);
            if (notas.isLeft()) 
                return Either.makeLeft(notas.getLeft());
            else 
                return Either.makeRight(new Error('Error al buscar las notas'));
            
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

    async buscarNotasDeGrupo(idGrupo: string,): Promise<Either<string, Error>> {
        const respuesta: EntidadNota[] = await this.repositorio.find({
            where: { grupo: idGrupo },
        });

        if (respuesta) {
            const notas = this.EntityToString.execute(respuesta);
            return notas;
        } else {
            return Either.makeRight<string, Error>(
                new Error(`Error al obtener los notas del usuario ${idGrupo}`),
            );
        }
    }

    async buscarNotasDeGrupos(grupos: Iterable<string>,): 
        Promise<Either<string, Error>> {

            const listaGrupos : string[] = [...grupos];
            let listaNotas : Optional<string[]> = new Optional<string[]>();

        for (const grupo of listaGrupos){
            const respuesta: EntidadNota[] = await this.repositorio.find({
                where: { grupo: grupo },
            });

            if (respuesta) {
                const notas = this.EntityToString.execute(respuesta);

                if (notas.isLeft()){
                    if (!listaNotas.hasvalue()){
                        listaNotas = new Optional<string[]>([...notas.getLeft()]);
                    }
                    else{
                    listaNotas.getValue().push(...notas.getLeft());
                   }
                }          
            } 
        }

        if(listaNotas.hasvalue()){
            const nuevaLista = JSON.parse(JSON.stringify(listaNotas.getValue()));
            return Either.makeLeft<string, Error>(nuevaLista);
        }
        else{
            return Either.makeRight<string, Error>(
                new Error(`Error al obtener los notas del usuario`),
            );
        }
    }
}