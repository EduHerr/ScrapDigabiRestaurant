/*# Logger errors */
const winston = require('winston');

//@import
const writeError = (error) => {
    /* [Configuration Logger] */
    const Logger = winston.createLogger({
        level: 'error',
        format: winston.format.combine(
            winston.format.prettyPrint()
        ),
        transports: [
            new winston.transports.File({
                maxSize: 5120000, /* 5 MB */
                maxFiles: 5,
                filename: `${__dirname}/../loggs/error/errors-log.log`
            })
        ]
    });

    //Escribir error
    Logger.error(error, {
        message: error.message, 
        timestamp: new Date().toLocaleString('es-MX') 
    });
}

const writeEvent = (event) => {
    /* [Configuration Logger] */
    const Logger = winston.createLogger({
        level: 'info',
        format: winston.format.combine(
            winston.format.prettyPrint()
        ),
        transports: [
            new winston.transports.File({
                maxSize: 5120000, /* 5 MB */
                maxFiles: 5,
                filename: `${__dirname}/../loggs/event/events-log.log`
            })
        ]
    });

    //Escribir evento
    Logger.info(event, {
        message: event,
        timestamp: new Date().toLocaleString('es-MX')
    });
}

module.exports = { writeError, writeEvent };