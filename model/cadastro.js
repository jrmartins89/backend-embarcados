const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CadastroSchema = new Schema({
 status_lampada: {
  type: Boolean, 
  required: [true, 'Status Obrigatório'], 
  max: 20
 },
 tipo_lampada: {
  type: String, 
  required: [true, 'Tipo Obrigatório'], 
  max: 100
 },
 nome_lampada: {
    type: String, 
    required: [true, 'Nome Obrigatório'], 
    max: 100
},
 voltagem: {
  type: String, 
  required: [true, 'Voltagem Obrigatória']}
 });
// Exportar o modelo
module.exports = mongoose.model('cadastro', CadastroSchema);