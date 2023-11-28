var config = require('../database/config');

function obterPilotosVotos() {
    var instrucao = `
        SELECT fu.pilotoFavorito as 'pilotoFavorito', COUNT(*) as total
        FROM PITSTOP.formulario_user fu 
        GROUP by fu.pilotoFavorito;
    `;

    return config.executar(instrucao);
}

function obterGenero() {
    var instrucao = `
    SELECT genero, COUNT(*) as 'generoMaisEnviado'
    FROM formulario_user
    JOIN usuario ON idUsuario = fkUsuariof
    GROUP BY genero
    ORDER BY COUNT(*) DESC
    LIMIT 1;
`;

    return config.executar(instrucao);

}

function obterRespostasCorretas(){
    var instrucao = `
        SELECT
            qr.idResultado,
            qr.resultado,
            qr.fkUsuario,
            u.nomeCompleto
        FROM PITSTOP.quizResultado qr 
        INNER JOIN usuario u
        ON qr.fkUsuario = u.idUsuario;
    `;

    return config.executar(instrucao);
}



module.exports = {
    obterPilotosVotos,
    obterGenero,
    obterRespostasCorretas
}