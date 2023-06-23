import { IsString } from 'class-validator';

export class ModificarNotaDto {
  id: string;
  @IsString()
  titulo?: string;
  @IsString()
  contenido?: string;

  imagenes?: { nombre: string; buffer: Buffer }[];
}
