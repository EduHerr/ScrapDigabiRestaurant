require('dotenv').config();
const express = require('express');
const http = require('http');
const path = require('path');

//@initializations
const application = express();
const server = http.createServer(application);

//@settings
application.set('port', process.env.PORT); //Puerto de escucha
application.use('/backsource', express.static(path.join(__dirname, '/src/backsource')));

//@Routes configuration
const routes = require('./src/routes/routes.js');
application.use('/api', routes);

//@Arranque
server.listen(application.get('port'), () => {
	console.log('Servidor iniciado en el puerto: ', application.get('port'));
});
