var dashboardModel = require('../models/dashboardModel');

function pilotosVotos(req, res) {
    dashboardModel.obterPilotosVotos()
    .then(result => {
            console.log(`Resultados: ${JSON.stringify(result)}`);
            res.status(200).json(result);
    }).catch(err => res.status(500).json(err));
}

function genero(req, res){
    dashboardModel.obterGenero()
    .then(result =>{
        console.log(`Resultados: ${JSON.stringify(result)}`);
        res.status(200).json(result);
    }).catch(err => res.status(500).json(err));
  
}

function respostas(req, res){
    dashboardModel.obterRespostasCorretas()
    .then(result =>{
        console.log(`Resultados: ${JSON.stringify(result)}`);
        res.status(200).json(result);
    }).catch(err => res.status(500).json(err));
}


module.exports = {
    pilotosVotos,
    genero,
    respostas
}