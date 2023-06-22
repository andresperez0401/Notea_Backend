/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { VOImagen } from 'src/Nota/Dominio/ValueObjectsNota/VOImagen';

export class CrearNotaDto {
  @IsString()
  @IsNotEmpty()
  titulo: string;
  @IsString()
  @IsNotEmpty()
  contenido: string;
  @IsNotEmpty()
  fechaCreacion: Date;
  @IsNumber()
  latitud?: number;
  @IsNumber()
  longitud?: number;
  @IsString()
  @IsNotEmpty()
  grupo: string;

  imagenes: Array<{ nombre: string, buffer: Buffer }>; //no se jeje
}
