const express = require('express');
const bodyParser = require('body-parser');

const app = express();


//Servidor
let porta = 8080;
app.listen(porta, () => {
 console.log('Servidor em execução na porta: ' + porta);
});

const DadosSensores = require('./model/Cadastro').default

//Acesso ao BD

//const uri = 'mongodb+srv://jrmartins89:Pillows@1@meubackendarduino.v0krp.mongodb.net/MeuBackendArduino?retryWrites=true&w=majority';
const database_name = 'MeuBeckendArduino';
const collection_name= 'DadosSensores'
var db;
const MongoClient = require('mongodb').MongoClient;
//const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://jrmartins89:b7Bd0o6vhkjzS8os@meubackendarduino.v0krp.mongodb.net/MeuBackendArduino?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("MeuBackendArduino").collection("DadosSensores");
  // perform actions on the collection object
  client.close();
});


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

// Obtém cadastro do usuário com base no tipo de lâmpada
app.get('/Cadastro/:tipo_lampada', (req, res, next) => {
    const result = db.findOne({ "tipo": req.params.tipo_lampada }, (err, result) => {
    if (err) return console.log("Tipo de lâmpada não encontrada!")
    res.send(result);
    });
});


//Método para cadastro de dados da lâmpada
app.post('/Cadastro', (req, res, next) => {
    var dados_lampada = new Cadastro({
        "status_lampada": req.body.status_lampada,
        "tipo_lampada": req.body.tipo_lampada,
        "voltagem": req.body.voltagem,
        "nome_lampada": req.body.nome_lampada
     });
    db.insertOne(dados_lampada, (err, result) => {
        if (err) return console.log("Error: " + err);
        console.log('Dados da lâmpada cadastrado com sucesso!');
        res.send('Dados da lâmpada cadastrado com sucesso!');
    });
});

// Altera um cadastro
app.put('/Cadastro/:nome_lampada', (req, res, next) => {
    db.updateOne({"nome": req.params.nome_lampada }, {
        $set: {
          "tipo_lampada": req.body.tipo_lampada,
          "voltagem": req.body.voltagem
              }
    }, (err, result) => {
        if (err) return console.log("Error: " + err);
        console.log('Cadastro de lâmpada alterado com sucesso!');
        res.send('Cadastro de lâmpada alterado com sucesso!');
    });
});

// Hello
app.get('/hello', (req, res) => {
    res.send('Hello World');
   });

//Remover cadastro de lâmpada
app.delete('/Cadastro/:nome_lampada', (req, res, next) => {
    db.deleteOne({nome_lampada: req.params.nome_lampada },(err, result) => {
        if (err) return console.log("Error: " + err);
        console.log('Cadastro de lâmpada removido!');
        res.send('Cadastro de lâmpada removido!');
    });
});