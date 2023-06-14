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
  @IsNotEmpty()
  latitud: number;
  @IsNumber()
  @IsNotEmpty()
  longitud: number;
}
