import { IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { colorEtiqueta } from 'src/Etiqueta/Dominio/ValueObjectsEtiqueta/colorEtiqueta';

export class actualizarEtiquetaDto {
  id: string;

  @IsString()
  nombre?: string;

  @IsEnum(colorEtiqueta)
  color?: colorEtiqueta;

  @IsString()
  idUsuario: string; // Añade esta línea
}
