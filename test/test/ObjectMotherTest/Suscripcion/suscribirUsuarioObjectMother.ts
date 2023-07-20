import { cambiarTipoSuscripcionService } from "src/Suscripcion/Aplicacion/cambiarTipoSuscripcionService";
import { cambiarTipoSuscripcionDto } from "src/Suscripcion/Aplicacion/dto/CambiarTipoSuscripcionDto";
import { EditarUsuarioPO } from "src/Usuario/Aplicacion/dto/editarUsuarioPO";
import { MockRepositorioUsuario } from "test/test/Mocks/SuscribirUserMock";

export class SuscripcionUsuarioTest {
        
public static suscribirUsurio(): cambiarTipoSuscripcionDto{
//CASO DE PRUEBA SI LA FECHA ES NULA
const dto = new cambiarTipoSuscripcionDto();
dto.idUsuario = "1234-5678-91234-5678"
dto.tipo = "PREMIUM"


return dto;
}

public static CambiarSuscripcionService(): cambiarTipoSuscripcionService{
const repo: MockRepositorioUsuario = new MockRepositorioUsuario();
return new cambiarTipoSuscripcionService(repo);
    
}
}


