
var formularioModel = require("../models/formularioModel");

function enviarFormulario(req, res){
    console.log(req.body);
    var nome= req.body.nomeFormulario;
    var genero = req.body.generoFormulario;
    var dtaNascimento = req.body.dtaNascimentoFormulario;
    var pilotoFavorito = req.body.pilotoFavoritoFormulario;
    var equipeQueTorce = req.body.equipeQueTorceFormulario;
    var assistiuCorridaAoVivo = req.body.assistiuCorridaAoVivoFormulario;
    var idUsuario = req.body.usuario;

    if (nome == undefined) {
        res.status(400).send("Seu nome está indefinido!");
    } else if (genero == undefined) {
        res.status(400).send("Seu genero está indefinido!");
    } else if (dtaNascimento == undefined) {
        res.status(400).send("Sua data de nascimento está indefinida!");
    } else if (pilotoFavorito == undefined) {
        res.status(400).send("Seu piloto favorito está indefinido!");
    } else if (equipeQueTorce == undefined) {
        res.status(400).send("Sua equipe está indefinida!");
    } else if (assistiuCorridaAoVivo == undefined) {
        res.status(400).send("Se você assistiu corrida ao vivo está indefinida!");
    }else {
        formularioModel.enviarFormulario(nome, genero, dtaNascimento, pilotoFavorito, equipeQueTorce, assistiuCorridaAoVivo, idUsuario)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`);

                    // {fieldCount: 0, affectedRows: 1, insertId: 3, info: '', serverStatus: 2, …} -> quando o servidor responde certo

                    if (resultadoAutenticar.affectedRows > 0) {
                        res.json(resultadoAutenticar);
                    }

                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao enviar o formulário! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function obterFormularioUsuario(req, res){
    var  usuario = req.query.idUsuario;

    if (usuario === undefined) {
        res.status(400).send('Usuário não especificado');
    } else {
        formularioModel.obterRespostaUsuarioFormularioLimit1(usuario)
        .then(resultado => {
            console.log("tamanho da resposta", resultado.length);
            if (resultado.length >= 1) {
                res.status(412).send('Usuário já respondeu');
            } else {
                res.status(200).send();
            }
        }).catch(err => res.status(500).json(err));
    }
    
}

module.exports = {
   enviarFormulario,
   obterFormularioUsuario
   
}

