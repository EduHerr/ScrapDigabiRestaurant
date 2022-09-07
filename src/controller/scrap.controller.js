const { scrapeData } = require('../datasource/scrappinData');
const { writeEvent } = require('../../utils/handle/logger.handle');

//@exports
const downloadInfo = async() => {
    try{
        //Obtener [data] de los scrappers
        const _dataScrappers = await scrapeData();

        //Generar respaldo
        await createBackSource(_dataScrappers);

        //Iterar
        // for(const Scrapper of _dataScrappers){

        // }
    } 
    catch(e){
        throw e;
    }
}

//@static
const createBackSource = async(data) => {
    //Escribir documento JSON
    return new Promise((resolve, reject) => {
        //Convertir mi -_Collection- en un String
        const _Collection = JSON.stringify(data, null, 2);

        //Conseguir la fecha de hoy para poderla ocupar en el nombre del archivo
        let name = new Date();
        name = name.getDate() + '-' + (name.getMonth() + 1) + '-' + name.getFullYear();
        name = name + '.json';
        
        //Escribir el archivo
        fs.writeFile('./src/backsource/' + name, _Collection, { encoding: 'utf8' }, (err) => {
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