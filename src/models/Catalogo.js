const mongoose = require('mongoose');

const secao = {
    nome: String, 
    descricao: String, 
    dataInc: { type: Date, default: Date.now },
    userInc: {
        type : mongoose.ObjectId,
        ref : 'User',
        default : null
    },
}

const modelSchema = new mongoose.Schema({
    nome: String,
    descricao: String,
    secoes: [secao],
    solicitacoes: {type: [mongoose.ObjectId]},
    dataInc: { type: Date, default: Date.now },
    userInc: {
        type : mongoose.ObjectId,
        ref : 'User',
        default : null
    },

});

const modelName = 'Catalogo';

if (mongoose.connection && mongoose.connection.models[modelName]) {
    module.exports = mongoose.connection.models[modelName];
} else {
    module.exports = mongoose.model(modelName, modelSchema);
}