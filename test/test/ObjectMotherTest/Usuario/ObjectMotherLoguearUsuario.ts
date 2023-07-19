import { LoguearUsuarioService } from "src/Usuario/Aplicacion/LoguearUsuario.service";
import { loguearUsuarioDTO } from "src/Usuario/Aplicacion/dto/LoguearUsuario.dto";



export class objectMotherUsuario {

    public static UsuarioDatosValidos(): loguearUsuarioDTO {
        const dto = new loguearUsuarioDTO();
        dto.email = 'andres@gmail.com';
        dto.clave = '12345678';
        return dto;
    }

    public static UsuarioDatosInvalidos(): loguearUsuarioDTO {
        const dto = new loguearUsuarioDTO();
        dto.email = 'andresssss@gmail.com';
        dto.clave = '12345678';
        return dto;
    }
}