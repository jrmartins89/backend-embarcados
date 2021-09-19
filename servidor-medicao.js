const express = require('express');
const bodyParser = require('body-parser');

const app = express();


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


////////////////////////////////CHAMADAS DOS MÉTODOS///////////////////////////////////////////////////////////


// Obtém todos os cadastros
app.get('/Cadastro', (req, res, next) => {
    db.find({}).toArray((err, result) => {
        if (err) return console.log("Error: " + err);
        res.send(result);
    });
});

// Obtém cadastro do usuário com base no CPF
app.get('/Cadastro/:tipo', (req, res, next) => {
    const result = db.findOne({ "tipo": req.params.cpf }, (err, result) => {
    if (err) return console.log("Tipo de lâmpada não encontrada!")
    res.send(result);
    });
});


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

// Altera um cadastro
app.put('/Cadastro/:tipo', (req, res, next) => {
    db.updateOne({"tipo": req.params.tipo_lampada }, {
        $set: {
          "tipo_lampada": req.body.tipo_lampada
              }
    }, (err, result) => {
        if (err) return console.log("Error: " + err);
        console.log('Tipo de lâmpada alterado com sucesso!');
        res.send('Tipo de lâmpada alterado com sucesso!');
    });
});

// Hello
app.get('/hello', (req, res) => {
    res.send('Hello World');
   });

//Remover cadastro de usuário
app.delete('/Cadastro/:cpf', (req, res, next) => {
    db.deleteOne({cpf: req.params.cpf },(err, result) => {
        if (err) return console.log("Error: " + err);
        console.log('Cadastro do cliente removido!');
        res.send('Cadastro do cliente removido!');
    });
});