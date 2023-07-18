import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';


export class cambiarTipoSuscripcionDto {
 
  fechaFin?: Date;

  @IsString()
  @IsNotEmpty()
  idUsuario: string;

  @IsString()
  @IsNotEmpty()
   tipo: string;

}