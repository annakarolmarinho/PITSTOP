var nomeUsuarioElementHtml = document.getElementById("name-user");
var nomeUsuarioSessionStorage = sessionStorage.NOME_USUARIO;

if (nomeUsuarioSessionStorage !== undefined) {
    nomeUsuarioElementHtml.innerHTML = nomeUsuarioSessionStorage
} else {
    window.location = '../cadastro/Cadastro_login.html';
}

function logout() {
    sessionStorage.removeItem('NOME_USUARIO');
    sessionStorage.removeItem('ID_USUARIO');
    sessionStorage.removeItem('EMAIL_USUARIO');

    window.location = "../index.html";
}

loadChart();
kpiGenero();
kpiRespostas();




function obterDadosDashboardGenero() {


    return fetch("/dashboard/genero")
        .then(function (res) {
            return res.json().then(function (generos) {
                return {
                    genero: generos[0]
                };
            })
                .catch(function (error) {
                    console.error("Erro ao obter dados:", error);
                    throw error
                });

        });
}




function kpiGenero() {
    obterDadosDashboardGenero().then(function (dadosG) {
        var resultadoElemento = document.getElementById("resultadoGenero");


        var titleCard = document.getElementById("title-card");
        titleCard.innerHTML += dadosG.genero.genero.toUpperCase()

        var gender = document.getElementById("amount-gender");
        gender.innerHTML = dadosG.genero.generoMaisEnviado;
    });
}



// function 


function obterDadosDashboardPilotos() {
    var nomesPilotos = [];
    var votos = [];

    return fetch("/dashboard/pilotos")
        .then(function (res) {
            return res.json().then(function (listaPilotos) {

                for (var indexPiloto in listaPilotos) {
                    nomesPilotos.push(listaPilotos[indexPiloto].pilotoFavorito);
                    votos.push(listaPilotos[indexPiloto].total);
                }

                return {
                    nomes: nomesPilotos,
                    votos: votos
                };
            })
                .catch(function (error) {
                    console.error("Erro ao obter dados:", error);
                    throw error;
                });
        });
}


function loadChart() {

    obterDadosDashboardPilotos().then(function (dados) {

        var ctx = document.getElementById('grafico').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: dados.nomes,
                datasets: [{
                    label: 'Pilotos mais votados como favoritos',
                    data: dados.votos,
                    backgroundColor: 'rgb(203, 0, 6)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    });

}


var respostasCorretas = [
    "Lewis Hamilton",
    "Ferrari",
    "1950",
    "3",
    "Autódromo Nazionale Monza",
    "Alain Prost",
    "10",
    "Circuit de Spa-Francorchamps",
    "Max Verstappen",
    "1 ponto",
];


function obterRespostasCorretas() {

    return fetch("/dashboard/respostas")
        .then(function (res) {
            return res.json().then(function (respostasUsuario) {
                var jsonStringify = JSON.stringify(respostasUsuario);
                var array = JSON.parse(jsonStringify);

                var resultadosQuiz = array.map((resultadoQuiz) => {
                    var contagemAcertos = 0;

                    var resultadoParsed = JSON.parse(resultadoQuiz.resultado);

                    for (var i = 0; i < resultadoParsed.length; i++) {
                        if (respostasCorretas[i] === resultadoParsed[i]) {
                            contagemAcertos++;
                        }
                    }

                    return {
                        idResultado: resultadoQuiz.idResultado,
                        resultado: resultadoQuiz.resultado,
                        contagemAcertos,
                        nomeUsuario: resultadoQuiz.nomeCompleto.trim().split(' ')[0],
                    };

                });
                return resultadosQuiz;
            });
        })

        .catch(function (error) {
            console.error("Erro ao obter dados:", error);
            throw error;
        });

}

function kpiRespostas() {
    obterRespostasCorretas().then(function (resultadosQuiz) {
        var table = document.getElementById("table-results");

        resultadosQuiz.sort((a,b) => {
            return a.contagemAcertos - b.contagemAcertos;
        })




        for (const result in resultadosQuiz) {    
            var row = table.insertRow(1);
            var cell1 = row.insertCell(0); // nome
            var cell2 = row.insertCell(1); // quantidadeAcerto
            var cell3 = row.insertCell(2); // posição
            
            cell1.innerHTML = resultadosQuiz[result].nomeUsuario;
            cell2.innerHTML = resultadosQuiz[result].contagemAcertos;
            cell3.innerHTML = `${Number(resultadosQuiz.length - result)}º`
        }
    });
}


