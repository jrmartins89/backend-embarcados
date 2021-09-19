const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Hello
app.get('/hello', (req, res) => {
 res.send('Hello World');
});

//Servidor
let porta = 8080;
app.listen(porta, () => {
 console.log('Servidor em execução na porta: ' + porta);
});

const DadosSensores = require('./model/cadastro')

//Acesso ao BD
const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb+srv://jrmartins89:<password>@meubackendarduino.v0krp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const database_name = 'MeuBeckendArduino';
const collection_name= 'DadosSensores'
var db;
MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(database_name).collection(collection_name);
        console.log('Conectado à base de dados ` ' + database_name + ' `!');
    });
//Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


//Método para cadastro de dados da lâmpada
app.post('/Cadastro', (req, res, next) => {
    var dados_lampada = new Cadastro({
        "status_lampada": req.body.status_lampada,
        "tipo_lampada": req.body.tipo_lampada,
        "voltagem": req.body.voltagem
     });
    db.insertOne(dados_lampada, (err, result) => {
        if (err) return console.log("Error: " + err);
        console.log('Dados da lâmpada cadastrado com sucesso!');
        res.send('Dados da lâmpada cadastrado com sucesso!');
    });
});