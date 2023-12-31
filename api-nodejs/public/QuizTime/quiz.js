var pageQuestion = 0;
if (!sessionStorage.LATEST_PAGE_QUESTION) {
    sessionStorage.LATEST_PAGE_QUESTION = 0;
}



// Foi feito uma alteração no html que inclui um elemento do tipo <b> para incluir o usuário
var b_usuario = document.getElementById("nome_usuario"); // essa linha obtem o elemento <b> do html pelo id
b_usuario.innerHTML = sessionStorage.NOME_USUARIO; // obtem o nome do usuário do sessionStorage e inclui no html

function changeContentPageToQuiz() {
    var idUsuario = sessionStorage.ID_USUARIO; // obtem o id Usuario do session storage

    console.log(window.location.pathname)

    if (idUsuario === null || idUsuario === undefined || idUsuario.trim() === "") { // verifica se o usuario não está "logado" para enviar ele a página de cadastro
        sessionStorage.LATEST_PAGE = window.location.pathname;
        window.location = '../cadastro/Cadastro_login.html';
        return;
    }

    sessionStorage.removeItem('LATEST_PAGE');

    var contentAll = document.getElementById('content-all');
    contentAll.remove();
    var nextQuestionButton = document.getElementById('next-question');
    nextQuestionButton.style.display = "none"
    showQuestion();
}

function showQuestion() {

    var questionElement = document.getElementById('question');
    var answerButtonsElement = document.getElementById('answer-buttons');
    console.log(sessionStorage.LATEST_PAGE_QUESTION);
    questionElement.textContent = questions[sessionStorage.LATEST_PAGE_QUESTION].question;


    answerButtonsElement.innerHTML = '';

   
    for (var i = 0; i < questions[sessionStorage.LATEST_PAGE_QUESTION].answers.length; i++) {
        var answerButton = document.createElement('button');
        answerButton.classList.add('answer-button');
        answerButton.textContent = questions[sessionStorage.LATEST_PAGE_QUESTION].answers[i].option;
        answerButton.onclick = function () {
            checkAnswer(this);
        };
        answerButtonsElement.appendChild(answerButton);
    }


    questionElement.style.display = 'block';
    answerButtonsElement.style.display = 'grid';
    var nextQuestionButton = document.getElementById('next-question');
    nextQuestionButton.style.display = "none"
}

function nextQuestion() {
    document.body.style.backgroundColor = "#000";

    sessionStorage.LATEST_PAGE_QUESTION = Number(sessionStorage.LATEST_PAGE_QUESTION) + 1

    console.log(sessionStorage.LATEST_PAGE_QUESTION);

    pageQuestion++;

    if (pageQuestion > 9) {
        console.log("chegou aqui")
        registrarRespostasQuiz();
        window.location = "QuizTime.html"
    } else {
        showQuestion();
    }
}

function checkAnswer(button) {

    if (sessionStorage.answersUsuario || sessionStorage.answersUsuario === undefined) {
        var answers = [button.textContent];
        sessionStorage.answersUsuario = JSON.stringify(answers);
    } else {
        var answersUsuarioLocalStorage = JSON.parse(sessionStorage.answersUsuario);
        answersUsuarioLocalStorage.push(button.textContent);
        sessionStorage.answersUsuario = JSON.stringify(answersUsuarioLocalStorage);d
    }


    var isCorrect = questions[sessionStorage.LATEST_PAGE_QUESTION].answers.find(answer => answer.option === button.textContent).correct;

    
    if (isCorrect) {
        button.style.backgroundColor = '#4CAF50'; 
        document.body.style.backgroundColor = '#4CAF50'; 
        score++; 
    } else {
        button.style.backgroundColor = '#FF5733'; 
        document.body.style.backgroundColor = '#FF5733'; 
    }

    // Disabilita o botão para caso a resposta esteja correta
    var answerButtons = document.querySelectorAll('.answer-button');
    answerButtons.forEach(function (btn) {
        btn.disabled = true;
    });

    
    var nextQuestionButton = document.getElementById('next-question');
    nextQuestionButton.style.display = 'block';
    nextQuestionButton.textContent = 'Próxima Pergunta (' + score + ' ponto' + (score !== 1 ? 's' : '') + ')';
    if (pageQuestion > 9) {
        nextQuestionButton.textContent = 'Finalizar Quiz'
    }
}

var score = 0; 
var questions = [
    {
        question: "Quem detém o recorde de mais títulos mundiais na Fórmula 1?",
        answers: [
            { option: "Ayrton Senna", correct: false },
            { option: "Sebastan Vettel ", correct: false },
            { option: "Lewis Hamilton", correct: true },
            { option: "Michael Schumacher", correct: false },
        ],
    },
    {
        question: "Qual equipe de Fórmula 1 é conhecida como 'Scuderia'?",
        answers: [
            { option: "Ferrari", correct: true },
            { option: "Red Bull Racing ", correct: false },
            { option: "Mercedes", correct: false },
            { option: "Mclaren", correct: false },
        ],
    },
    {
        question: "Em que ano a primeira corrida de Fórmula 1 aconteceu?",
        answers: [
            { option: "1946", correct: false },
            { option: "1962 ", correct: false },
            { option: "1950", correct: true },
            { option: "1975", correct: false },
        ],
    },
    {
        question: "Quantas vezes Ayrton Senna foi campeão mundial de Fórmula 1?",
        answers: [
            { option: "1", correct: false },
            { option: "2", correct: false },
            { option: "3", correct: true },
            { option: "4", correct: false },
        ],
    },
    {
        question: "Qual circuito é conhecido como 'Templo da Velocidade'?",
        answers: [
            { option: "Circuit de Monaco", correct: false },
            { option: "Silverstone Circuit ", correct: false },
            { option: " Spa-Francorchamps", correct: false },
            { option: "Autódromo Nazionale Monza ", correct: true },
        ],
    },
    {
        question: "Qual piloto é conhecido como 'O Profeta'?",
        answers: [
            { option: "Alain Prost", correct: true },
            { option: "Niki Lauda", correct: false },
            { option: "Emerson Fittipaldi", correct: false },
            { option: "Juan Manuel Fangio", correct: false },
        ],
    },
    {
        question: "Quantas equipes competem na Fórmula 1 atualmente?",
        answers: [
            { option: "8", correct: false },
            { option: "9", correct: false },
            { option: "10", correct: true },
            { option: "12", correct: false },
        ],
    },
    {
        question: "Qual é a pista mais longa do calendário da Fórmula 1?",
        answers: [
            { option: " Circuit de Spa-Francorchamps", correct: true },
            { option: "Circuit of the Americas", correct: false },
            { option: "Baku City Circuit", correct: false },
            { option: "Yas Marina Circuit", correct: false },
        ],
    },
    {
        question: "Quem é o piloto mais jovem a vencer uma corrida de Fórmula 1?",
        answers: [
            { option: "Sebastian Vettel", correct: false },
            { option: "Max Verstappen", correct: true },
            { option: "Lewis Hamilton", correct: false },
            { option: "Fernando Alonso", correct: false },
        ],
    },
    {
        question: "Quantos pontos são concedidos ao piloto que faz a volta mais rápida na corrida?",
        answers: [
            { option: "1 ponto", correct: true },
            { option: "2 pontos", correct: false },
            { option: "3 pontos", correct: false },
            { option: "4 pontos", correct: false },
        ],
    },
];


function registrarRespostasQuiz() {
    var usuario = sessionStorage.ID_USUARIO;
    var respostasUsuario = JSON.parse(sessionStorage.answersUsuario);
    
    if (usuario !== undefined && respostasUsuario !== undefined) {

        console.log(respostasUsuario);

        sessionStorage.removeItem('answersUsuario');
        sessionStorage.removeItem('LATEST_PAGE_QUESTION');

        fetch('/quiz', {
            body: JSON.stringify({
                respostas: respostasUsuario,
                usuario: usuario,
            }),
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
        }).then((res) => {
            res.json(json => {
                console.log(res);
            })
        }).catch();
    }
}

