import { IsString } from 'class-validator';

export class ModificarNotaDto {
  id: string;
  @IsString()
  titulo?: string;
  @IsString()
  contenido?: string;
  @IsString()
  grupo: string
  imagenes?: { nombre: string; buffer: Buffer }[];
}
