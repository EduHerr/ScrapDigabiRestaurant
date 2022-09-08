const { scrapeData } = require('../datasource/scrappinData');
const { writeEvent } = require('../../utils/handle/logger.handle');
const SourceController = require('./source.controller');
const DishController = require('./dish.controller')
const { writeFile } = require('fs');

//@exports
const downloadInfo = async() => {
    try{
        //Obtener [data] de los scrappers
        const _dataScrappers = await scrapeData();

        //Generar respaldo
        await createBackSource(_dataScrappers);

        //Iterar para insercion en BD
        for(const Scrapper of _dataScrappers){
            //getSection()
            const Source = Scrapper[0];

            //Insertar [Source]
            const _idSource = await SourceController.create(Source);

            //Iterar los objetos[Product] e insertarlos
            Scrapper.map(async(Producto, i) => {
                if(i != 0){
                    //Alteramos el objeto[Product] para pasarle la -FK- de [Source]
                    Object.assign(Producto, { Source: _idSource })

                    //Insertar data [Product => Dish]
                    await DishController.create(Producto);
                }
            });
        }

        //
        writeEvent('Informacion Scrapped respaldada y guardada en la base de datos!!');

        //
        return 'Operacion realizada con exito!!';
    } 
    catch(e){
        throw e;
    }
}

//@static
const createBackSource = (data) => {
    //Escribir documento JSON
    return new Promise((resolve, reject) => {
        //Convertir mi -_Collection- en un String
        const _Collection = JSON.stringify(data, null, 2);

        //Conseguir la fecha de hoy para poderla ocupar en el nombre del archivo
        let name = new Date();
        name = name.getDate() + '-' + (name.getMonth() + 1) + '-' + name.getFullYear();
        name = name + '.json';
        
        //Escribir el archivo
        writeFile('./src/backsource/' + name, _Collection, { encoding: 'utf8' }, (err) => {
            if(!err){
                writeEvent('Backsource from dataScrapped, generated successfully');
                resolve(true);
            }

            reject(err);
        });
    });
}

//
module.exports = { downloadInfo };