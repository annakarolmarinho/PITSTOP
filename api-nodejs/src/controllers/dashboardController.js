var dashboardModel = require('../models/dashboardModel');

function pilotosVotos(req, res) {
    dashboardModel.obterPilotosVotos()
    .then(result => {
            console.log(`Resultados: ${JSON.stringify(result)}`);
            res.status(200).json(result);
    }).catch(err => res.status(500).json(err));
}

module.exports = {
    pilotosVotos
}