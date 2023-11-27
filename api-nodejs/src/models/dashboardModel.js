var config = require('../database/config');

function obterPilotosVotos() {
    var instrucao = `
        SELECT fu.pilotoFavorito as 'pilotoFavorito', COUNT(*) as total
        FROM PITSTOP.formulario_user fu 
        GROUP by fu.pilotoFavorito;
    `;

    return config.executar(instrucao);
}

module.exports = {
    obterPilotosVotos
}