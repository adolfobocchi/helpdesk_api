const mongoose = require('mongoose');
const Catalogo = require('./Catalogo');
const Usuario = require('./Usuario');

const andamento = {
    descricao: String,
    userInc: mongoose.ObjectId,
}

const modelSchema = new mongoose.Schema({
    nome: String,
    email: String,
    unidade: {
        type : mongoose.ObjectId,
        ref : 'Unidade',
        default : null
    },
    telefone: String,
    descricao: String,
    catalogo: {
        type : mongoose.ObjectId,
        ref : 'Catalogo',
        default : null
    },
    secao: {type: mongoose.ObjectId, default: null},
    andamentos: {type: [andamento]},
    status: {
        type : mongoose.ObjectId,
        ref : 'Status',
        default : null
    },
    dataInc: { type: Date, default: Date.now },
    dataFechamento: { type: Date, default: null },
    userInc: {
        type : mongoose.ObjectId,
        ref : 'User',
        default : null
    },
    userAtendimento: {
        type : mongoose.ObjectId,
        ref : 'User',
        default : null
    },
    userFechamento: {
        type : mongoose.ObjectId,
        ref : 'User',
        default : null
    },
});

modelSchema.post('save', function(doc) {
    Usuario.updateOne({_id: doc.userInc}, {$push: {solicitacoes: doc._id}}).exec(); 
    Catalogo.updateOne({_id: doc.catalogo}, {$push: {solicitacoes: doc._id}}).exec(); 
    
  });


const modelName = 'Solicitacao';

if (mongoose.connection && mongoose.connection.models[modelName]) {
    module.exports = mongoose.connection.models[modelName];
} else {
    module.exports = mongoose.model(modelName, modelSchema);
}