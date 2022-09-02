const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const modelSchema = new mongoose.Schema({
    nome: String,
    email: String,
    password: { type: String, toJSON: false },
    permissao: { type: String, default: 'User' },
    dataInc: { type: Date, default: Date.now },
    userInc: {
        type : mongoose.ObjectId,
        ref : 'User',
        default : null
    },
    solicitacoes: {type: [mongoose.ObjectId]}
});

modelSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        return next();
    } catch (error) {
        return next(error);
    }
});

modelSchema.options.toJSON = {
    transform: function (user) {
        var ret = user.toJSON({ transform: false });
        delete ret.password;
        return ret;
    }
}

modelSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};


const modelName = 'Usuario';

if (mongoose.connection && mongoose.connection.models[modelName]) {
    module.exports = mongoose.connection.models[modelName];
} else {
    module.exports = mongoose.model(modelName, modelSchema);
}