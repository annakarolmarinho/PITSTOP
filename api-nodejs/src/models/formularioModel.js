var database = require("../database/config")

function enviarFormulario(nomeCompletoForm, genero, dtaNascimento, pilotoFavorito, equipeQueTorce, assistiuCorridaAoVivo,  fkUsuariof) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ",  nomeCompletoForm, genero, dtaNascimento, pilotoFavorito, equipeQueTorce, assistiuCorridaAoVivo,  fkUsuariof)

    var instrucao = `
    insert into  formulario_user ( nomeCompletoForm, genero, dtaNascimento, pilotoFavorito, equipeQueTorce, assistiuCorridaAoVivo,  fkUsuariof) values
    ( '${nomeCompletoForm}', '${genero}', '${dtaNascimento}', '${pilotoFavorito}', '${equipeQueTorce}', '${assistiuCorridaAoVivo}', ${fkUsuariof}); 
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    enviarFormulario
};