const mongoose = require("mongoose");
const User = require("../models/Usuario");

module.exports = {
    signin: async (req, res) => {
        let { email, password } = req.body;
        User.findOne({ email }).exec( (err, user) => {
            if (err) {
                res.status(400).json({
                    error: "Erro desconhecido!",
                });
                return;
            }
            if(!user) {
                res.status(400).json({
                    error: "Usuário inválido!",
                });
                return;
            }
            user.comparePassword(password, function(err, isMatch) {
                if (err) {
                    res.status(400).json({
                        error: "Erro desconhecido!",
                    });
                    return;
                }
                if (!isMatch) {
                    res.status(400).json({
                        error: "Usuário inválido!",
                    });
                    return;
                }
                res.status(200).json(user.toJSON());
            });

        });
        
        
    },
    signup: async (req, res) => {
        let {
            nome,
            email,
            password,
            userInc,
        } = req.body;
        const userExist = await User.findOne({ email });
        if (userExist) {
            res.status(400).json({
                error: "Usuário inválido!",
            });
            return;
        }

        await User.create({
            nome,
            email,
            password,
            userInc
        });

        const user = await User.findOne({ email })
            .select({
                nome: 1,
                email: 1,
                permissao: 1,
                dataInc: 1,
                userInc: 1,
            })
            .exec();
        if (!user) {
            res.status(500).json({
                error: "Erro desconhecido!",
            });
            return;
        }
        res.status(200).json(user);
        return;
    },
}