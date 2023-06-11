# anotaciones para no cagarla tanto

(se divide en modulos)

- Module: es el intermediario entre el service y el controller "nest g module [name]"
- Service: es el que ejecuta las acciones/metodos (puede ser el repositorio por ejemplo) "nest g service [name]"
- Controller: estan los endpoints (del modulo) "nest g controller [name]"

Service:
    Es inyecatable, por lo tanto se inyectara esta dependencia en el constructor del controller
    dentro de un servicio se encuentra el crud por ejemplo

Controller:
    Empieza con el decorador @Controller([endpointName]), y dentro los metodos GET, PUT, POST, DELETE
    Se usan DTO para transferir datos entre el cliente y el servidor, y viceversa
    se usa un DTO por cada accion del  Controller
