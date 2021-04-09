let express = require('express');

//importar o body parser
let bodyParser = require('body-parser');

//import mongoose
let mongoose = require('mongoose');

let app = express();

//Importar o Router
let apiRouter = require('./covidRoutes');

//configuração bodyParser para processar pedido
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());


//Ligar a BD
const dbPath = 'mongodb://localhost/covidApp';
const options = {useNewUrlParser: true, useUnifiedTopology: true}
const mongo = mongoose.connect(dbPath, options);

mongo.then(() => {
    console.log('Ligado BD');
}, err => {
    console.log(err, 'Error');
});

var db = mongoose.connection;

//Verificar Ligação
if(!db)
    console.log("Erro Connecting db");
else
    console.log("DB Connected Successfully");


//Porto Servidor
let port = process.env.PORT || 3000;

//Usar API routes na app
app.use('/api', apiRouter);

app.listen(port, () =>  console.log('Rodando no porto: ' + port));