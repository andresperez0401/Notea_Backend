import { ILogger } from "../Aplicacion/ILogger";
import * as fs from 'fs';
import * as path from 'path';
import { Injectable } from '@nestjs/common';
import { Either } from "src/Utils/Either";



export class ILoggerImplementation implements ILogger {

    private readonly fileName = 'ArchivoLog.txt';
    private readonly filePath = path.join(__dirname, '../../../..');
    

   async execute(message: string): Promise<Either<string, Error>>{
        
        const currentTime = new Date().toLocaleTimeString();
        const date = new Date().toLocaleDateString();
        const fileContent = ` ${date} - ${currentTime}: ${message}\n` + '\n';
    
        if (fs.existsSync(this.fileName)) {
         
         try {
            fs.appendFileSync(this.fileName, fileContent);
            return Either.makeLeft<string, Error>("Archivo guardado exitosamente");

         } catch (error) {
            return Either.makeRight<string,Error>(new Error("Error al guardar en el archivo"));
         }
        } else {

            try {
                fs.appendFileSync(this.fileName, fileContent);
                return Either.makeLeft<string, Error>("Archivo creado y guardado exitosamente");

            } catch (error) {
                return Either.makeRight<string,Error>(new Error("Error al crear en el archivo"));
            }
          
        }
    }

}