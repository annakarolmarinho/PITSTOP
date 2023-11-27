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

function somaNormal(x, y) {
    return Number(x) + Number(y);
}

function somaPromise(x, y) {
    return new Promise((resolve, reject) => {
        const resultado = Number(x) + Number(y);
        resolve(resultado);
    })
}

console.log('somaNormal: ' + somaNormal(5, 5));
somaPromise(5, 5).then(soma => console.log(soma));
somaPromise(5, 5).then(function (soma) {
    console.log(soma);
}).catch(err => console.log(err));


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
                    label: 'Vendas',
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