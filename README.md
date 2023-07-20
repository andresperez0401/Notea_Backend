# Notea Backend 

Aplicacion desarrollada con el framework Nest.JS, Backend de la aplicacion NoteaApp, creada por el equipo Solid Coders Rojo.

## Acerca de Notea App

Notea App es una app de gestion y manejo de notas. En esta app podras crear, editar y eliminar tus notas, de una manera sencilla y agradable.

Entre las funcionalidades que ofrece Notea App, se encuentran:
- Crear notas con ubicacion actual, al crear una nota podras agregarle tu ubicacion actual.

- Crear notas con imagenes, al crear una nota podras agregarle varias imagenes.

- Crear Notas con tareas, si necesita colocar una lista de tareas en una nota, podras hacerlo.

- Si cuentas con la suscripcion Premium, podras crear notas con herrramientas de inteligencia artificial (IA), como reconocimiento de texto en imagenes y  reconocimiento de texto en audio.

- Papelera de notas, si eliminas una nota por equivocacion, No te preocupes!; podras recuperarla desde la papelera de notas.

- Manejo por grupos, tus notas se organizaran en base a grupos que hayas creado para asi poder tener una mejor organizacion de las mismas.

- Etiquetas, podras agregar etiquetas a las notas para que tengas una mejor visualizacion de las mismas.

## Instalacion

Para instalar Notea App, deberas seguir los siguientes pasos:

- Instalar las dependencias con el comando de Node.JS:

```bash
$ npm install
```

- Se debera configurar o instalar el archivo .env, en el directorio Notea_Backend, especificando las siguientes varaibles de entorno, segun la configuracion requerida:

```bash
 DB_HOST = tu_host, example: localhost
 DB_PORT = tu_puerto, example: 5432
 DB_USER = tu_usuario, example: postgres
 DB_PASSWORD = tu_contraseña, example: 1234
 DB_NAME =  tu_nombre_de_base_de_datos, example: notea
```

- Para instalar multer
    
```bash
$ npm install --save multer
```
ccccccccc
## Para correr la Aplicacion

Una vez instaladas las dependencias, deberas correr el siguiente comando para ejecutar la aplicacion:

```bash
#development
$ npm run start
#watch mode
$ npm run start:dev

#production mode
$ npm run start:prod
```

## Aportes mas significativos de cada integrante:
### _Andres Perez_
| Actividades                                                                                                            | Detalles de commit                                               |
|----------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------|
| Crear Usuario (Servicio de aplicacion, controller e implentacion del repositorio). | https://github.com/Solid-Coders-Rojo-UCAB/Notea_Backend/commit/ed1f58192b1136cfcab56163fcb20a97cbb0ff19
| Busqueda de usuario por email (Servicio de Aplicacion, controller e implementacion del repositorio).| https://github.com/Solid-Coders-Rojo-UCAB/Notea_Backend/commit/670c62c28918c3fd8a5d0a8969bafa7fe0e9a905
| Agregado grupo con su modelo de dominio completo | https://github.com/Solid-Coders-Rojo-UCAB/Notea_Backend/commit/18f83cf27115125a3195cb3de0adb611adb6ef0a
| (Servicios de aplicacion para grupo (crear, eliminar, buscar, editar); con sus controllers e implementacion del repositorio. | https://github.com/Solid-Coders-Rojo-UCAB/Notea_Backend/commit/262671ad31d9d9bda030e1ff83a301c15e0f9366
| Desacoplamiento de todos los servicios de aplicacion, controllers e implementaciones de los repositorios de nest. | https://github.com/Solid-Coders-Rojo-UCAB/Notea_Backend/commit/267c92c5360cc6f0a2e7c2e870bc53fc4ed61544
| Creacion del decorador, Logger Service y Ilogger con su implementacion | [https://github.com/Solid-Coders-Rojo-UCAB/Notea_Backend/commit/267c92c5360cc6f0a2e7c2e870bc53fc4ed61544](https://github.com/Solid-Coders-Rojo-UCAB/Notea_Backend/commit/75eb87660c817a576781a5c7f9fc9ccc85472511)
|Implementacion del loggerService(decorador) en todos los servicios de aplicacion | https://github.com/Solid-Coders-Rojo-UCAB/Notea_Backend/commit/f9199b35c89c34228fbad6bf99d16d085eabd6c3
|Segregacion de todos los controller para cumplir SRP | https://github.com/Solid-Coders-Rojo-UCAB/Notea_Backend/commit/8df8f1057d8c7a62f86bd500bb4239b42410e9a6
|Agregado Suscripcion, con su modelo de dominio | https://github.com/Solid-Coders-Rojo-UCAB/Notea_Backend/commit/a830c0393913b5f8578686e2894b4ffca58e03f9
|Servicios de aplicacion, controllers e implmenetacion del repositorio suscripcion | https://github.com/Solid-Coders-Rojo-UCAB/Notea_Backend/commit/58f1c036425a9598681ed179d94139aa9693c37b
|Filtro buscar por palabra en titulo o contenido de nota | https://github.com/Solid-Coders-Rojo-UCAB/Notea_Backend/commit/001411535a1bc1c5729bfc1835e774569d782193


### _Angel Hernandez_
| Actividades                                                                                                            | Detalles de commit                                              |
|----------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------|
| Configuración de TypeORM | [https://github.com/Solid-Coders-Rojo-UCAB/Notea_Backend/commit/1b175a7061177a9aff0213b423bde5d0be87b1ef](https://github.com/Solid-Coders-Rojo-UCAB/Notea_Backend/commit/1b175a7061177a9aff0213b423bde5d0be87b1ef)
| Creacion del usuario y guardado en la base de datos | [https://github.com/Solid-Coders-Rojo-UCAB/Notea_Backend/commit/27c5a03cdfe9b6ae437f2a154de872a75ba34921](https://github.com/Solid-Coders-Rojo-UCAB/Notea_Backend/commit/27c5a03cdfe9b6ae437f2a154de872a75ba34921)
| Endpoint EditarUsuario funcional | [https://github.com/Solid-Coders-Rojo-UCAB/Notea_Backend/commit/a1abb751fd5817693eef5f215208c8cc2dc7c842](https://github.com/Solid-Coders-Rojo-UCAB/Notea_Backend/commit/a1abb751fd5817693eef5f215208c8cc2dc7c842)
| Editar usuario | [https://github.com/Solid-Coders-Rojo-UCAB/Notea_Backend/commit/b2544f746dc858dc5afaf4ddfbf79296111eb4bb](https://github.com/Solid-Coders-Rojo-UCAB/Notea_Backend/commit/b2544f746dc858dc5afaf4ddfbf79296111eb4bb)
| Eliminar usuario | [https://github.com/Solid-Coders-Rojo-UCAB/Notea_Backend/commit/b2544f746dc858dc5afaf4ddfbf79296111eb4bb](https://github.com/Solid-Coders-Rojo-UCAB/Notea_Backend/commit/b2544f746dc858dc5afaf4ddfbf79296111eb4bb)
|Trabajando con variables de entorno | [https://github.com/Solid-Coders-Rojo-UCAB/Notea_Backend/commit/c30629fd211f86f6a6aae8326f81cb7f0dcd6037](https://github.com/Solid-Coders-Rojo-UCAB/Notea_Backend/commit/c30629fd211f86f6a6aae8326f81cb7f0dcd6037)
|Servicio para la busqueda de las notas segun id grupo | [https://github.com/Solid-Coders-Rojo-UCAB/Notea_Backend/commit/2b71702503e7be815202852804557a1ff4bec1f6](https://github.com/Solid-Coders-Rojo-UCAB/Notea_Backend/commit/2b71702503e7be815202852804557a1ff4bec1f6)

### _Italo Visconti_
| Actividades                                                                                                            | Detalles de commit                                               |
|----------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------|
| | 
| | 




### _José Nuñez_
| Actividades                                                                                                            | Detalles de commit                                               |
|----------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------|
|Eliminar nota | https://github.com/Solid-Coders-Rojo-UCAB/Notea_Backend/commit/b9594ce36625f725f2172b90e55274eebeee42bf 
|Modificar nota | https://github.com/Solid-Coders-Rojo-UCAB/Notea_Backend/commit/8851e13d28505eb83a0c1d646469df60736af599
|Buscar grupo por usuario | https://github.com/Solid-Coders-Rojo-UCAB/Notea_Backend/commit/a0314c21dbedf1f5cf90d4532bb2acc78a49ba1d
|Asignar nota a grupo| https://github.com/Solid-Coders-Rojo-UCAB/Notea_Backend/commit/f7c2b55ea9b1a8f206bf91b00126e1abd908ef80
|Mover nota grupo | https://github.com/Solid-Coders-Rojo-UCAB/Notea_Backend/commit/5abba0404031741e191a80b0f346d424417dda91



### _Sergio Capon_
| Actividades                                                                                                            | Detalles de commit                                               |
|----------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------|
| | 
| | 

## Diagrama de Clases

![Diagrama de clases- ORIGINAL](https://github.com/Solid-Coders-Rojo-UCAB/Notea_Backend/assets/108308939/01477c48-f62a-424c-b1b5-5d67566fa102)


## Diagrama Hexagonal

![Diagrama Hexagonal - ORIGINAL](https://github.com/Solid-Coders-Rojo-UCAB/Notea_Backend/assets/108308939/1af02677-3aa9-4c21-af4a-b346aaa4397f)

