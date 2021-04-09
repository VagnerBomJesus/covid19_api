var mongoose = require('mongoose');

//schema

var covidSchema = mongoose.Schema({
    data: {
        type: String,
        required: true
    },
    confirmados_novos: {
        type: Number,
        required: true
    },
    eminternados_uci: {
        type: Number,
        required: true
    }
});

// Exportar Dados Model
var Dados = module.exports = mongoose.model('dadosCovid', covidSchema);

module.exports.get = function (callback, limit) {
    Dados.find(callback).limit(limit);
}

