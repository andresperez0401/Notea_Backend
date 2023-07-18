import { IsString, IsNotEmpty, IsEmail, IsBoolean } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CrearUsuarioDto {
  nombre: string;

  apellido: string;

  email: string;

  clave: string;

  suscripcion: boolean;
}
export class UpdateUsuarioDto extends PartialType(CrearUsuarioDto) {}

// @MinLength(4)
// @MaxLength(16)
