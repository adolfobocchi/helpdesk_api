const mongoose = require("mongoose");
const Unidade = require("../models/Unidade");

module.exports = {
    add: async (req, res) => {
        let {
            nome,
        } = req.body;

        const unidade = await new Unidade({
            nome,
        }).save();
        if (!unidade) {
            res.status(500).json({
                error: "Erro desconhecido!",
            });
            return;
        }
        res.status(200).json(unidade);
        return;
    },

    update: async (req, res) => {
        const id = req.params.id;
        let {
            nome,
        } = req.body;
        Unidade.findByIdAndUpdate(id,{nome}, {new: true}).exec((err, unidade) => {
            if (err) {
                res.status(500).json({
                    error: "Erro desconhecido!",
                });
                return;
            }
            if (!unidade) {
                res.status(400).json({
                    error: "Unidade Inválido!",
                });
                return;
            }
            res.status(200).json(unidade);
            return;
        });

        
        
    },

    
    findById: async (req, res) => {
        const id = req.params.id;
        Unidade.findById(id, (err, unidade) => {
            if (err) {
                res.status(500).json({
                    error: "Erro desconhecido!",
                });
                return;
            }
            if (!unidade) {
                res.status(400).json({
                    error: "unidade Inválido!",
                });
                return;
            }
            res.status(200).json(unidade);
            return;
        })
    },
    findAll: async (req, res) => {
        Unidade.find().sort({nome: 0}).select({__v: 0}).exec((err, unidade) => {
            if (err) {
                res.status(500).json({
                    error: "Erro desconhecido!",
                });
                return;
            }
            if (!unidade) {
                res.status(400).json({
                    error: "unidade Inválido!",
                });
                return;
            }
            res.status(200).json(unidade);
            return;
        })
    }
}