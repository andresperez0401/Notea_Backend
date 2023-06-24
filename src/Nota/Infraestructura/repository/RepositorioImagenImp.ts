/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Either } from 'src/Utils/Either';
import { VOImagen } from 'src/Nota/Dominio/ValueObjectsNota/VOImagen';
import { RepositorioImagen } from 'src/Nota/Dominio/RepositorioImagen';
import EntidadImagen from '../entities/EntidadImagen';

@Injectable()
export class RepositorioImagenImp implements RepositorioImagen{

    constructor(
        @InjectRepository(EntidadImagen)
        private readonly repositorio: Repository<EntidadImagen>,
    ) {}

    async subirImagen(imagen: VOImagen): Promise<Either<VOImagen,Error>>{

        const img = await this.repositorio.create({
            nombre: imagen.getNombreImagen(),
            buffer: imagen.getBufferImagen(),
        });
 
        const response = await this.repositorio.save(img); //guardar en la base de datos usando TypeORM
        if (response){
            return Either.makeLeft<VOImagen,Error>(imagen);
        }else{ 
            return Either.makeRight<VOImagen,Error>(new Error('Error al subir la imagen'));
        }
    }

    async buscarImagen(id: number): Promise<Either<VOImagen,Error>>{
        const img = await this.repositorio.findOneBy({id: id});
        if (img){
            const imagen = VOImagen.crearImagenNota(img.nombre,img.buffer);
            return Either.makeLeft<VOImagen,Error>(imagen);
        }else{ 
            return Either.makeRight<VOImagen,Error>(new Error('Error al buscar la imagen'));
        }
    }
}