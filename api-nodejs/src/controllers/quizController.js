var quizModel = require('../models/quizModel');

function registrarRespostasQuiz(req, res) {
    console.log(req.body);
    
    var respostas = req.body.respostas;
    var usuario = req.body.usuario;

    if (respostas.length != 10) {
        res.status(400).json('Respostas está incompleto');
    } else if (usuario === undefined) {
        res.status(400).json('Usuário não definido');
    } else {
        quizModel.enviarRespostasQuiz(respostas, usuario, 1)
        .then(function(resultado)  {
            console.log(`Resultados: ${JSON.stringify(resultado)}`);

            if (resultado.affectedRows > 0) {
                res.json(resultado);
            }
        }).catch(err => res.status(500).json(err))
    }
    res.status(200);
}

module.exports = {
    registrarRespostasQuiz
}