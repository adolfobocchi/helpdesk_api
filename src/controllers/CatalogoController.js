const mongoose = require("mongoose");
const Catalogo = require("../models/Catalogo");

module.exports = {
    add: async (req, res) => {
        let {
            nome,
            descricao,
            userInc,
        } = req.body;

        const catalogo = await new Catalogo({
            nome,
            descricao,
            userInc,
        }).save();
        if (!catalogo) {
            res.status(500).json({
                error: "Erro desconhecido!",
            });
            return;
        }
        res.status(200).json(catalogo);
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
        Catalogo.findByIdAndUpdate(id,{nome, descricao, secoes, userInc}, {new: true}).exec((err, catalogo) => {
            if (err) {
                res.status(500).json({
                    error: "Erro desconhecido!",
                });
                return;
            }
            if (!catalogo) {
                res.status(400).json({
                    error: "Catalogo Inválido!",
                });
                return;
            }
            res.status(200).json(catalogo);
            return;
        });

        
        
    },

    
    findById: async (req, res) => {
        const id = req.params.id;
        Catalogo.findById(id, (err, catalogo) => {
            if (err) {
                res.status(500).json({
                    error: "Erro desconhecido!",
                });
                return;
            }
            if (!catalogo) {
                res.status(400).json({
                    error: "catalogo Inválido!",
                });
                return;
            }
            res.status(200).json(catalogo);
            return;
        })
    },
    
    findAll: async (req, res) => {
        Catalogo.find().sort({nome: 0}).exec((err, catalogo) => {
            if (err) {
                res.catalogo(500).json({
                    error: "Erro desconhecido!",
                });
                return;
            }
            if (!catalogo) {
                res.catalogo(400).json({
                    error: "catalogo Inválido!",
                });
                return;
            }
            res.status(200).json(catalogo);
            return;
        })
    }
}