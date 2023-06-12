import { apellidoUsuario } from "../Dominio/apellidoUsuario-VO";
import { idUsuario } from "../Dominio/idUsuario_VO"
import { nombreUsuario } from "../Dominio/nombreUsuario-VO";
import { _user } from "./user.entity"

export class getUserDto {
    id: idUsuario;
    name: nombreUsuario;
    apellido: apellidoUsuario;
}