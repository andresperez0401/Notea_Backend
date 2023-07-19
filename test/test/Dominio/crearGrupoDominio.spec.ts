import { Grupo } from "src/Grupo/Dominio/AgregadoGrupo";
import { RepositorioGrupoImp } from "src/Grupo/Infraestructura/repository/RepositorioGrupoImpl";
import { RepositorioGrupoPruebaObjectMother } from "../ObjectMotherTest/Grupo/repositorioGrupoObjectMother";





describe('CrearGrupoDominio', () => {

    test('Salvar Grupo con usuario valido', async () => {
        //Arrange
        const grupo: Grupo = RepositorioGrupoPruebaObjectMother.crearGupoConIdUsuarioExistente();
        const repo = await RepositorioGrupoPruebaObjectMother.obtenerRepositorioGrupo();
        
        //Act
        const result = repo.creargrupo(grupo);
    
        //Assert
        expect(result).toBeTruthy();
     });
});
