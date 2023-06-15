import { IsString, IsNotEmpty, IsEmail, IsBoolean } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CrearUsuarioDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  nombre: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  apellido: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  clave: string;

  @IsBoolean()
  @IsString()
  @ApiProperty()
  suscripcion: boolean;
}
export class UpdateUsuarioDto extends PartialType(CrearUsuarioDto) {}

// @MinLength(4)
// @MaxLength(16)
