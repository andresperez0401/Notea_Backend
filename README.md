# Notea Backend (Solid Coders Rojo)

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
npm install --save multer
```


