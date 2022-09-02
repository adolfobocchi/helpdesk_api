const mongoose = require("mongoose");
const Status = require("../models/Status");

module.exports = {
    add: async (req, res) => {
        let {
            nome,
        } = req.body;

        const status = await new Status({
            nome,
        }).save();
        if (!status) {
            res.status(500).json({
                error: "Erro desconhecido!",
            });
            return;
        }
        res.status(200).json(status);
        return;
    },

    update: async (req, res) => {
        const id = req.params.id;
        let {
            nome,
        } = req.body;
        Status.findByIdAndUpdate(id,{nome}, {new: true}).exec((err, status) => {
            if (err) {
                res.status(500).json({
                    error: "Erro desconhecido!",
                });
                return;
            }
            if (!status) {
                res.status(400).json({
                    error: "Status Inválido!",
                });
                return;
            }
            res.status(200).json(status);
            return;
        });

        
        
    },
    
    findById: async (req, res) => {
        const id = req.params.id;
        Status.findById(id, (err, status) => {
            if (err) {
                res.status(500).json({
                    error: "Erro desconhecido!",
                });
                return;
            }
            if (!status) {
                res.status(400).json({
                    error: "status Inválido!",
                });
                return;
            }
            res.status(200).json(status);
            return;
        })
    },

    findAll: async (req, res) => {
        Status.find().sort({nome: 0}).select({__v: 0}).exec((err, status) => {
            console.log(err);
            if (err) {
                res.status(500).json({
                    error: "Erro desconhecido!" + err,
                });
                return;
            }
            if (!status) {
                res.status(400).json({
                    error: "status Inválido!",
                });
                return;
            }
            res.status(200).json(status);
            return;
        });
    }
}