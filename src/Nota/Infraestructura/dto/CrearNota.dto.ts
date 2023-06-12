import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CrearNotaDto {
  @IsString()
  @IsNotEmpty()
  id: string;
  @IsString()
  @IsNotEmpty()
  titulo: string;
  @IsString()
  @IsNotEmpty()
  contenido: string;
  @IsNotEmpty()
  fechaCreacion: Date;
  @IsString()
  @IsNotEmpty()
  professorName: string;
  @IsNumber()
  @IsNotEmpty()
  latitud: number;
  @IsNumber()
  @IsNotEmpty()
  longitud: number;
  @IsString()
  @IsNotEmpty()
  estado: string;
}
