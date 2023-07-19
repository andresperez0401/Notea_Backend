import { Grupo } from "src/Grupo/Dominio/AgregadoGrupo";
import { RepositorioGrupoImp } from "src/Grupo/Infraestructura/repository/RepositorioGrupoImpl";






describe('CrearGrupoDominio', () => {

    test('test_create_group_with_valid_user_id', async () => {
        //Arrange
        const grupo: Grupo = Grupo.crearGrupo("test", "c87eb4cb-0d04-49de-8aec-df4abe9c345b");
        let repo: RepositorioGrupoImp;
        
        //Act
        const result = repo.creargrupo(grupo);
    
        //Assert
        expect(result).toBeTruthy();
     });
});
