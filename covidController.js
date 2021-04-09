// Importar  Dados Model
Dados = require('./covidModel');

//Para Index
exports.index = function (req, res) {
    Dados.get(function (err, dados) {
        if (err)
            res.json({
                status: "error",
                message: "Erro na obtenção de dados"
            });
        res.json({
            status: "ok",
            message: "Dados Obtidos com Sucesso!",
            data: dados
        });

    });
};

//Criar dados 
exports.add = function (req, res) {
    var dados = new Dados();
    dados.data = req.body.data ? req.body.data : dados.data;
    dados.confirmados_novos = req.body.confirmados_novos;
    dados.eminternados_uci = req.body.eminternados_uci;

    //Guardar dados e verificar erros
    dados.save(function (err) {
        if (err)
            res.json(error);

        res.json({
            message: "Dados novos Adicionado!",
            data: dados
        });

    });
};

//Ver dados
exports.view = function (req, res) {
    Dados.findById(req.params.dados_id, function (err, dados) {
        if (err)
            res.send(err);
        res.json({
            message: "Detalhes dos Dados",
            data: dados
        });
    });
};

//Total casos de
exports.total = function (req, res) {
    Dados.get(function (err, dados) {
        if (err)
            res.json({
                status: "error",
                message: "Erro na obtenção de dados"
            });
        //CN
        var calcSomaN = dados.reduce((sum, cn) => {
            return sum + cn.confirmados_novos;
        }, 0);
        //UCI
        var calcSomaI = dados.reduce((sum, uci) => {
            return sum + uci.eminternados_uci;
        }, 0);

        res.json({
            message: "Total de casos da semana!",
            CN: "Casos novos Confirmador é de " + calcSomaN,
            UCI: "Casos Internados na Unidade de cuidados intensivos é de " + calcSomaI
        })

    });
};

//Listas De confirmados_novos
exports.lista1 = function (req, res) {

    Dados.get(function (err, dados) {
        if (err)
            res.json({
                status: "error",
                message: "Erro na obtenção de dados"
            });

        var casosListas = [];
        for (var i = 0; i < dados.length; i++) {
            casosListas.push(dados[i].confirmados_novos);
        }

        res.json({
            message: "Lista de Novos Casos Confirmado!",
            lista: casosListas
        });

    });
};

//Lista Casos Internados
exports.lista2 = function (req, res) {
    Dados.get(function (err, dados) {
        if (err)
            res.json({
                status: "error",
                message: "Erro na obtenção de dados"
            });
        var casosListas = [];

        for (var i = 0; i < dados.length; i++) {
            casosListas.push(dados[i].eminternados_uci);
        }

        res.json({
            message: "Lista de Novos Casos nos Cuidados Intensivo!",
            lista: casosListas
        })

    });
};

//Media Casos Novos
exports.media = function (req, res) {
    Dados.get(function (err, dados) {
        if (err)
            res.json({
                status: "error",
                message: "Erro na obtenção de dados"
            });
        var media = 0;

        for (var i = 0; i < dados.length; i++) {
            media += dados[i].confirmados_novos;
        }
        media = media / dados.length;

        res.json({
            message: "Media de casos Novos confirmados!",
            data: media.toFixed(2)
        })

    });
};

//Lista Casos Internados
exports.maxmin = function (req, res) {
    Dados.get(function (err, dados) {
        if (err)
            res.json({
                status: "error",
                message: "Erro na obtenção de dados"
            });
        var min = Infinity;
        var max = Number.NEGATIVE_INFINITY;

        for (var i = 0; i < dados.length; i++) {

            if (max < dados[i].confirmados_novos) {
                max = dados[i].confirmados_novos;
            }

            if (min > dados[i].confirmados_novos) {
                min = dados[i].confirmados_novos;
            }
        }
        res.json({
            message: "Casos por dia!",
            max: max + " novos casos por dia",
            min: min + " novos casos por dia"
        })

    });
};