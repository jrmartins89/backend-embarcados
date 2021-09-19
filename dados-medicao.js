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