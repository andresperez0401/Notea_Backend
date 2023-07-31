/* eslint-disable prettier/prettier */

import { EditarUsuarioService } from "src/Usuario/Aplicacion/EditarUsuario.service";
import { EditarUsuarioPO } from "src/Usuario/Aplicacion/dto/editarUsuarioPO";
import { EditarUsuarioPrueba } from "test/test/ObjectMotherTest/Usuario/ObjectMotherEditarUsuario";


describe('Editando usuario desde servicio de aplicacion', () => {
  test('test_editar_usuario', async () => {
    //Arrange - Creamos las esturcturas de datos que necesitaremos
          //Creo mi dto
    const usuarioDTO: EditarUsuarioPO = EditarUsuarioPrueba.crearUsuarioDtoValido();
    const editarUsuarioServicio: EditarUsuarioService = EditarUsuarioPrueba.editarUsuarioService();     //Que passaaaaaa

    //Act - Se realiza la operacion
    const resultado = await editarUsuarioServicio.execute(usuarioDTO);

    //Asserts - Resultsdos
    expect(resultado.isLeft()).toBeTruthy();
  });
  test('test_editar_usuario_invalid_info', async () => {
    //Arrange - Creamos las esturcturas de datos que necesitaremos
    const usuarioDTO: EditarUsuarioPO = EditarUsuarioPrueba.crearUsuarioDtoNoValidoVacio();
    const editarUsuarioServicio: EditarUsuarioService = EditarUsuarioPrueba.editarUsuarioService();     //Que passaaaaaa

    //Act - Se realiza la operacion
    const resultado = await editarUsuarioServicio.execute(usuarioDTO);

    //Asserts - Resultsdos
    expect(resultado.isRight()).toBeTruthy();
  });
  test('test_editar_usuario_no_existe', async () => {
    //Arrange - Creamos las esturcturas de datos que necesitaremos
    const usuarioDTO: EditarUsuarioPO = EditarUsuarioPrueba.crearUsuarioDtoNoValidoIdNoEncontrada();
    const editarUsuarioServicio: EditarUsuarioService = EditarUsuarioPrueba.editarUsuarioService();     //Que passaaaaaa

    //Act - Se realiza la operacion
    const resultado = await editarUsuarioServicio.execute(usuarioDTO);

    //Asserts - Resultsdos
    expect(resultado.isRight()).toBeTruthy();
  });
});
