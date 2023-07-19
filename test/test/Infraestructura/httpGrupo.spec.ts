import { UrlCrearGrupo } from '../ObjectMotherTest/http-protocols/crearGrupohttp';

describe('HttpGrupo', () => {

    test('Url Grupo', () => {
        const parseUrl = UrlCrearGrupo.parseUrl("http://localhost:3000/grupo");

        expect(parseUrl.href).toBe("http://localhost:3000/grupo");

    })
});
