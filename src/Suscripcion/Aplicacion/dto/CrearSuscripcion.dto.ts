import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';


export class CrearSuscripcionDto {
 
  fechaFin?: Date;

  @IsString()
  @IsNotEmpty()
  idUsuario: string;
}

export class UpdateSuscripcionDto extends PartialType(CrearSuscripcionDto) {}