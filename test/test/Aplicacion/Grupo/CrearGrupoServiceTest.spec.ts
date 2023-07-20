import { CrearGrupoPrueba } from '../../ObjectMotherTest/Grupo/crearGrupoMotherObject';
import { CrearGrupoService } from 'src/Grupo/Aplicacion/crearGrupoService';
import { CrearGrupoDto } from 'src/Grupo/Aplicacion/dto/CrearGrupo.dto';
import { Grupo } from 'src/Grupo/Dominio/AgregadoGrupo';
import { Either } from 'src/Utils/Either';

describe('CrearGrupoService', () => {
  test('test_create_group_with_valid_user_id', async () => {
    //Arrange
    const crearGrupoService: CrearGrupoService =
      CrearGrupoPrueba.crearGrupoService();
    const dto: CrearGrupoDto = CrearGrupoPrueba.crearGrupoDtoValido();

    //Act
    const result: Either<Grupo, Error> = await crearGrupoService.execute(dto);

    //Assert
    expect(result.isLeft()).toBeTruthy();
  });

  it('test_create_group_with_invalid_user_id', async () => {
    //Arrange
    const crearGrupoService = CrearGrupoPrueba.crearGrupoService();
    const dto = CrearGrupoPrueba.crearGrupoDtoInvalido();

    //Act
    const result = await crearGrupoService.execute(dto);

    //Assert
    expect(result.isRight()).toBeTruthy();
  });
});
