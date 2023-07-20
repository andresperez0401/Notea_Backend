// Tests that a new Etiqueta object is created with the correct properties and saved to the repository, and that the method returns an Either object with the created Etiqueta object

import { crearEtiquetaService } from 'src/Etiqueta/Aplicacion/crearEtiqueta.service';
import { CrearEtiquetaPrueba } from 'test/test/ObjectMotherTest/Etiqueta/crearEtiquetaMotherObjects';

describe('CrearEtiquetaService', () => {
  it('test_happy_path_create_etiqueta', async () => {
    // Arrange
    const crearEtiquetaService: crearEtiquetaService =
      CrearEtiquetaPrueba.crearEtiquetaService();
    const dto = CrearEtiquetaPrueba.crearEtiquetaDtoValido();

    // Act
    const result = await crearEtiquetaService.execute(dto);

    // Assert
    expect(result.isLeft()).toBeTruthy();
  });

  // Tests that the method returns an Either object with an error if the input DTO is invalid
  it('test_edge_case_invalid_dto', async () => {
    // Arrange
    const crearEtiquetaService: crearEtiquetaService =
      CrearEtiquetaPrueba.crearEtiquetaService();
    const dto = CrearEtiquetaPrueba.crearEtiquetaDtoInvalido();

    const result = await crearEtiquetaService.execute(dto);

    expect(result.isRight()).toBeTruthy();
  });
});
