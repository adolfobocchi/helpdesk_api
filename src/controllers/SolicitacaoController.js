const mongoose = require("mongoose");
const Solicitacao = require("../models/Solicitacao");

module.exports = {
    add: async (req, res) => {
        let {
            nome,
            email,
            unidade,
            telefone,
            descricao,
            catalogo,
            secao,
            status,
            userInc
        } = req.body;

        const solicitacao = await new Solicitacao({
            nome,
            email,
            unidade,
            telefone,
            descricao,
            catalogo,
            secao,
            status,
            userInc
        }).save();
        if (!solicitacao) {
            res.status(500).json({
                error: "Erro desconhecido!",
            });
            return;
        }
        res.status(200).json(solicitacao);
        return;
    },

    update: async (req, res) => {
        const id = req.params.id;
        let {
            nome,
            descricao,
            secoes,
            userInc,
        } = req.body;
        Solicitacao.findByIdAndUpdate(id,{nome, descricao, secoes, userInc}, {new: true}).exec((err, solicitacao) => {
            if (err) {
                res.status(500).json({
                    error: "Erro desconhecido!",
                });
                return;
            }
            if (!solicitacao) {
                res.status(400).json({
                    error: "solicitacao Inválido!",
                });
                return;
            }
            res.status(200).json(solicitacao);
            return;
        });

        
        
    },

    findById: async (req, res) => {
        const id = req.params.id;
        Solicitacao.findById(id, (err, solicitacao) => {
            if (err) {
                res.status(500).json({
                    error: "Erro desconhecido!",
                });
                return;
            }
            if (!solicitacao) {
                res.status(400).json({
                    error: "solicitacao Inválido!",
                });
                return;
            }
            res.status(200).json(solicitacao);
            return;
        })
    }
}