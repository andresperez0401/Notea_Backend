/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

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

  imagenes: { nombre: string, buffer: Buffer }[]; //no se jeje
}
