/* eslint-disable prettier/prettier */
import { IsJSON, IsNotEmpty, IsString } from 'class-validator';

export class CrearNotaDto {
  @IsString()
  @IsNotEmpty()
  titulo: string;
  @IsString()
  @IsNotEmpty()
  contenido: string;
  @IsNotEmpty()
  fechaCreacion: Date;
  
  latitud?: number;

  longitud?: number;
  @IsString()
  @IsNotEmpty()
  grupo: string;
  
  tareas?: { titulo: string, check: boolean }[]; 

  imagenes?: { nombre: string, buffer: Buffer }[]; //realmente no se usa jeje
}
