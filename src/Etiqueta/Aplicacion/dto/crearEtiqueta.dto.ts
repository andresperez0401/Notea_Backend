import { IsNotEmpty, IsString } from 'class-validator';

export class crearEtiquetaDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;
}
