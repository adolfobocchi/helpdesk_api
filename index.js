require('dotenv').config();

const express = require('express');
const cors = require('cors');
const routesApi = require('./src/routes/index.js');
const mongodb = require('./src/database/mongodb');

mongodb();

const server = express();

server.use(cors( //configurar o cors, origin, metodos, headers permitidos nos pacotes de requisicao
{
    origin: '*',
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'UPDATE', 'PATCH'],
    allowedHeaders: ['Content-Type']
}
));

server.use(express.json());
server.use(express.urlencoded({extended: true}));

server.use('/', routesApi);

server.listen(process.env.PORT, () => {
    console.log(`- Rodando no endereco: ${process.env.BASE}.`);
});
