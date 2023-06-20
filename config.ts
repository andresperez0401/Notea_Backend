//Si PORT existe es porque el servidor de la nube ya me dio una variable reservada
export const PORT = process.env.PORT1 || 3000;
export const DB_HOST = process.env.DB_HOST1 || 'localhost';
export const DB_PORT = process.env.DB_PORT1 || '5432';
export const DB_USER = process.env.DB_USER1 || 'postgres';
export const DB_PASSWORD = process.env.DB_PASSWORD1 || '1234';
export const DB_NAME = process.env.DB_NAME1|| 'New_Note_App_DB';