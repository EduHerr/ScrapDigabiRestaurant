require('dotenv').config();
const mongoose = require('mongoose');
const db = mongoose.connection;

/* Connect configuration */
mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//Connection open
db.once('open', _ => {
    console.log('Base de datos conectada en:'+process.env.DB_URI);
});

//Connection close
db.on('error', (error) => {
    console.log(error);
});