/* eslint-disable prettier/prettier */
import { Type } from 'class-transformer';
import { IsJSON, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { json } from 'stream/consumers';

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
  
  tareas?: { titulo: string, check: boolean }; 

  imagenes?: { nombre: string, buffer: Buffer }[]; 
}
