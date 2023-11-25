var database = require("../database/config")

function autenticar( email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucao = 
    `select idUsuario, email, senha, nomeCompleto from usuario where email = '${email}' and senha = '${senha}';`
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrar(nome, email, senha) {    
    var instrucao = `
        INSERT INTO usuario (nomeCompleto, email, senha) VALUES ('${nome}', '${email}', '${senha}');
    `;
  
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    autenticar,
    cadastrar
};