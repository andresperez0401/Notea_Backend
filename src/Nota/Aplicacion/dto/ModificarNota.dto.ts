export class ModificarNotaDto {
  titulo: string;
  fechaCreacion: Date;
  latitud?: number;
  longitud?: number;
  grupo: string;

  contenido: string;

  imagenes?: { nombre: string; buffer: Buffer; orden: number }[];
}
