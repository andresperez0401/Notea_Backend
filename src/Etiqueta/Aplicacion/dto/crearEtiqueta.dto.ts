import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { colorEtiqueta } from 'src/Etiqueta/Dominio/ValueObjectsEtiqueta/colorEtiqueta';

export class crearEtiquetaDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsEnum(colorEtiqueta)
  color: colorEtiqueta;

  @IsString()
  @IsNotEmpty()
  idUsuario: string; 
}

