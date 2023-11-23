

var pageQuestion = 0;

function changeContentPageToQuiz() {
    var contentAll = document.getElementById('content-all');
    contentAll.remove();
    showQuestion();
}

function showQuestion() {
    var questionElement = document.getElementById('question');
    var answerButtonsElement = document.getElementById('answer-buttons');

    questionElement.textContent = questions[pageQuestion].question;

    // Remove previous answer buttons
    answerButtonsElement.innerHTML = '';

    // Add new answer buttons for the current question
    for (var i = 0; i < questions[pageQuestion].answers.length; i++) {
        var answerButton = document.createElement('button');
        answerButton.classList.add('answer-button');
        answerButton.textContent = questions[pageQuestion].answers[i].option;
        answerButton.onclick = function () {
            checkAnswer(this);
        };
        answerButtonsElement.appendChild(answerButton);
    }

    // Show the question and answer buttons
    questionElement.style.display = 'block';
    answerButtonsElement.style.display = 'grid';

    // Show next question button if not the last question
    var nextQuestionButton = document.getElementById('next-question');
    nextQuestionButton.style.display = (pageQuestion < questions.length - 1) ? 'block' : 'none';
}

function checkAnswer(button) {
    var isCorrect = questions[pageQuestion].answers.find(answer => answer.option === button.textContent).correct;

    // You can handle the correct/incorrect logic here (e.g., change button color)

    // Move to the next question
    pageQuestion++;
}

function nextQuestion() {
    showQuestion();
}

var nextQuestionButton = document.getElementById('next-question');
nextQuestionButton.addEventListener('click', function () {
    pageQuestion++;
    showQuestion();
});

function checkAnswer(button) {
    var isCorrect = questions[pageQuestion].answers.find(answer => answer.option === button.textContent).correct;

    // Example: Change button color based on correctness
    if (isCorrect) {
        button.style.backgroundColor = '#4CAF50'; // Correct answer color
        document.body.style.backgroundColor = '#4CAF50'; // Change background color to green
        score++; // Increment the score for correct answers
    } else {
        button.style.backgroundColor = '#FF5733'; // Incorrect answer color
        document.body.style.backgroundColor = '#FF5733'; // Change background color to red
    }

    // Disable answer buttons after an answer is selected
    var answerButtons = document.querySelectorAll('.answer-button');
    answerButtons.forEach(function (btn) {
        btn.disabled = true;
    });

    // Enable "Next Question" button and display score
    nextQuestionButton.style.display = 'block';
    nextQuestionButton.textContent = 'Próxima Pergunta (' + score + ' ponto' + (score !== 1 ? 's' : '') + ')';
}
function resetBackground() {
    // Reset background color
    document.body.style.backgroundColor = '';
}

var score = 0; // Variable to store the score

var restartButton = document.createElement('button');
restartButton.textContent = 'Refazer Quiz';
restartButton.classList.add('restart-button');
restartButton.addEventListener('click', function () {
    // Reset variables and restart the quiz
    pageQuestion = 0;
    score = 0;
    showQuestion();
    resetBackground();
});

document.body.appendChild(restartButton);



// var questionElement = document.getElementById("question");
// var answerButtons = document.getElementById("answer-button");
// var nextButton = document.getElementById("next-question");


// let currentQuestionIndex = 0;
// let score = 0;

// function startQuiz() {
//     let currentQuestionIndex = 0;
//     let score = 0;
//     nextButton.innerHTML = "Próxima Pergunta"
//     showQuestion()
// }

// function showQuestion(){

//     resetState();
//     let currentQuestion = questions[currentQuestionIndex];
//     let questionNo = currentQuestionIndex + 1;
//     questionElement.innerHTML = questionNo + "." + currentQuestion.question;


//     currentQuestion.answers.forEach(answer => {
//         const button = document.createElement("button")
//         button.innerHTML = answer.option;
//         button.classList.add("answer-button");
//         answerButtons.appenChild(button);
//         if(answer.correct){
//             button.dataset.correct = answer.correct
//         }
//         button.addEventListener("click", selectAnswer);
//     });
// }

// function resetState(){
//     nextButton.style.display = "none";
//     while(answerButtons.firstChild){
//         answerButtons.removeChild(answerButtons.firstChild);
//     }
// }

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



// lógica para obter a pergunta - OK
// lógica para passar para a próxima pergunta e incrementar a pergunta para ir para a próxima - NOK
// logica para obter obter as respostas e passa-las nos botões - NOK
// lógica para obter a resposta certa, pode armazenar em uma variável, se o cara apertou no botão certo, troca a cor do botão pra verde
// 