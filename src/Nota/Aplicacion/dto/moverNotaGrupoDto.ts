import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class moverNotaGrupo{
    @IsString()
    @IsNotEmpty()
    id: string
    @IsString()
    @IsNotEmpty()
    grupo: string

}