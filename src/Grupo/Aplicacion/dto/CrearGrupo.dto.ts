import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';


export class CrearGrupoDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;
  @IsString()
  @IsNotEmpty()
  idUsuario: string;
}

export class UpdateGrupoDto extends PartialType(CrearGrupoDto) {}

