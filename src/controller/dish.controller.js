const { crear, leer } = require('../dao/dish.dao');
const { Parser } = require('json2csv');
const { writeEvent } = require('../../utils/handle/logger.handle');
const { writeFile } = require('fs');

const exportar = () => {
    try{
        return new Promise(async(resolve, reject) => {
            const _Dishes = await read();
    
            //Validar que hay registros
            if(_Dishes.length > 0){
                //Fields to Parser-csv
                const fields = ['nombre', 'seccion', 'precio', 'descripcion', 'Source'];
    
                //Parser-CSV
                const parser = new Parser({ fields });
                const csv = parser.parse(_Dishes);
                
                //CSV-File
                //Conseguir la fecha de hoy para poderla ocupar en el nombre del archivo
                let name = new Date();
                name = name.getDate() + '-' + (name.getMonth() + 1) + '-' + name.getFullYear();
                name = (Math.random() * (100000000 - 1) + 1) + name;
                name = './src/backsource/csv/' + name + '.csv';
                
                //Escribir el archivo
                writeFile(name, csv, (err) => {
                    if(!err){
                        writeEvent('Backsource CSV, generated successfully');
                        resolve({ route: name, csv });
                    }
                    else{
                        reject(err);
                    }
                });
            }
            else{
                reject('No se cuenta con registros para exportar');
            }
        });
    }
    catch(e){
        throw e;
    }
}

/*#region CRUD*/
const create = async(data) => {
    try{
        const result = await crear(data);
        return result;
    }
    catch(e){
        throw e;
    }
}

const read = async() => {
    try{
        const _dishes = await leer();
        return _dishes;
    }
    catch(e){
        throw e;
    }
}
/*#endregion*/

module.exports = { create, read, exportar };