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

const Cadastro = require('./model/cadastro')

//Acesso ao BD
const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb+srv://jrmartins89:hsnl3ZjyAzN4A0eW@meubackendarduino.v0krp.mongodb.net/MeuBackendArduino?retryWrites=true&w=majority';
const database_name = 'MeuBackendArduino';
const collection_name= 'Cadastro'
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

app.post('/Cadastro', (req, res, next) => {
    var lampada = new Cadastro({
        "nome_lampada": req.body.nome_lampada,
        "voltagem_lampada": req.body.voltagem_lampada,
        "status_lampada": req.body.status_lampada
     });
    db.insertOne(lampada, (err, result) => {
        if (err) return console.log("Error: " + err);
        console.log('Lampada cadastrado com sucesso!');
        res.send('Lampada cadastrado com sucesso!');
    });
});

// Obtém todos os cadastros
app.get('/Cadastro', (req, res, next) => {
    db.find({}).toArray((err, result) => {
        if (err) return console.log("Error: " + err);
        res.send(result);
    });
});

// Obtém cadastro do usuário com base no nome_lampada
app.get('/Cadastro/:nome_lampada', (req, res, next) => {
    const result = db.findOne({ "nome_lampada": req.params.nome_lampada }, (err, result) => {
    if (err) return console.log("Lampada não encontrado")
    res.send(result);
    });
});

// Altera um cadastro
app.put('/Cadastro/:nome_lampada', (req, res, next) => {
    db.updateOne({"nome_lampada": req.params.nome_lampada }, {
        $set: {
          "nome_lampada": req.body.nome_lampada,
          "voltagem_lampada": req.body.voltagem_lampada        }
    }, (err, result) => {
        if (err) return console.log("Error: " + err);
        console.log('Cadastro da lampada alterado com sucesso!');
        res.send('Cadastro da lampada alterado com sucesso!');
    });
});

//Remover cadastro de usuário
app.delete('/Cadastro/:nome_lampada', (req, res, next) => {
    db.deleteOne({nome_lampada: req.params.nome_lampada },(err, result) => {
        if (err) return console.log("Error: " + err);
        console.log('Cadastro da lampada removido!');
        res.send('Cadastro da lampada removido!');
    });
});