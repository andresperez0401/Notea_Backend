/* eslint-disable prettier/prettier */
import { MockRepositorioUsuario } from 'test/test/Mocks/UsuarioMock';
import { EditarUsuarioPrueba } from 'test/test/ObjectMotherTest/Usuario/ObjectMotherEditarUsuario';

describe('Editando usuario desde servicio de aplicacion', () => {
  test('test_editar_usuario', async () => {
    //Arrange - Creamos las esturcturas de datos que necesitaremos
    const usuarioDTO = EditarUsuarioPrueba.crearUsuarioDtoValido();
    const editarUsuarioServicio: MockRepositorioUsuario = EditarUsuarioPrueba.editarUsuarioService();     //Que passaaaaaa
    
    //Act - Se realiza la operacion
    const resultado = await editarUsuarioServicio.editarUsuario(usuarioDTO);

    //Asserts - Resultsdos
    expect(resultado.isLeft()).toBeTruthy();
  });
});
