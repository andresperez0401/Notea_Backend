import { cambiarTipoSuscripcionService } from "src/Suscripcion/Aplicacion/cambiarTipoSuscripcionService";
import { cambiarTipoSuscripcionDto } from "src/Suscripcion/Aplicacion/dto/CambiarTipoSuscripcionDto";
import { SuscripcionUsuarioTest } from "test/test/ObjectMotherTest/Suscripcion/suscribirUsuarioObjectMother";




describe('SuscribirUsuario', () => {
    it('test_happy_path_create_Suscripcion', async () => {
      // Arrange
      const suscripcionDTO: cambiarTipoSuscripcionDto = SuscripcionUsuarioTest.suscribirUsurio();
      const suscripcionServicio: cambiarTipoSuscripcionService = SuscripcionUsuarioTest.CambiarSuscripcionService();
      const resultado = await suscripcionServicio.execute(suscripcionDTO);
      expect(resultado.isLeft()).toBeTruthy();

    });
  
    // Tests that the method returns an Either object with an error if the input DTO is invalid
    it('test_edge_case_invalid_dto', async () => {
      // Arrange
     
    });
  });