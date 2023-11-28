var database = require("../database/config")

function enviarRespostasQuiz(respostas, fkUsuario, fkPergunta) {
    console.log(respostas);
    var instrucao = `
        insert into quizResultado (resultado, fkUsuario, fkPergunta) values
        (JSON_ARRAY('${respostas[0]}', '${respostas[1]}', '${respostas[2]}', '${respostas[3]}', '${respostas[4]}', '${respostas[5]}', '${respostas[6]}', '${respostas[7]}', '${respostas[8]}', '${respostas[9]}'), ${fkUsuario}, ${fkPergunta});
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    enviarRespostasQuiz
}