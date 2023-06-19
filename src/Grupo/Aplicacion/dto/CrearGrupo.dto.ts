import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CrearGrupoDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;
  @IsString()
  @IsNotEmpty()
  idUsuario: string;
}
