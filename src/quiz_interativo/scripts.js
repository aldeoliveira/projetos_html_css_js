const questions = [
    {
        question: "Qual é a capital do Brasil?",
        choices: ["Brasília", "Rio de Janeiro", "São Paulo", "Salvador"],
        answer: "Brasília",
    },
    {
        question: "Qual é a capital da Argentina?",
        choices: ["Buenos Aires", "Brasília", "Lisboa", "Paris"],
        answer: "Buenos Aires",
    },
    {
        question: "Qual é a capital da França?",
        choices: ["Roma", "Madri", "Paris", "Londres"],
        answer: "Paris",
    },
    {
        question: "Qual é a capital da Espanha?",
        choices: ["Lisboa", "Madri", "Barcelona", "Valência"],
        answer: "Madri",
    },
    {
        question: "Qual é a capital da Itália?",
        choices: ["Veneza", "Milão", "Roma", "Nápoles"],
        answer: "Roma",
    },
    {
        question: "Qual é a capital do Canadá?",
        choices: ["Toronto", "Vancouver", "Ottawa", "Montreal"],
        answer: "Ottawa",
    },
    {
        question: "Qual é a capital dos Estados Unidos?",
        choices: ["Nova York", "Los Angeles", "Chicago", "Washington D.C."],
        answer: "Washington D.C.",
    },
    {
        question: "Qual é a capital do Reino Unido?",
        choices: ["Liverpool", "Manchester", "Edimburgo", "Londres"],
        answer: "Londres",
    },
];


// Elements
let scoreElement = document.querySelector("#score");
let mistakesElement = document.querySelector("#mistakes");
let questionElement = document.querySelector("#question");
let choicesDiv = document.querySelector(".choices");
let nextBtn = document.querySelector("button");

let correctOption;
let questionAnswered = false;
let score = 0;
let mistakes = 0;
let questionIndex = 0;


// Functions
function setNextQuestion() {
    let question = questions[questionIndex].question;
    let choices = questions[questionIndex].choices;
    correctOption = questions[questionIndex].answer;

    questionElement.textContent = question;

    questionIndex++;
    if (questionIndex >= questions.length) {
        questionIndex = 0;
    }

    questionAnswered = false;
    setChoices(choices);
}


function setChoices(choices) {
    choices = shuffleArray(choices);

    for (let i = 0; i < choices.length; i++) {
        let option = document.createElement("div");
        let optionText = choices[i];

        option.classList.add("option");
        option.textContent = optionText;
        option.addEventListener("click", (event) => checkAnswer(event.target.textContent));

        choicesDiv.appendChild(option);
    }
}


function checkAnswer(selectedOption) {
    if (questionAnswered) {
        return;
    }

    if (selectedOption === correctOption) {
        choseCorrectly();
    } else {
        choseWrongly();
    }

    questionAnswered = true;
}


function choseCorrectly() {
    score++;

    updateScores();
    alert("Correto!");
}

function choseWrongly() {
    mistakes++;

    updateScores();
    alert("Escolheu errado!");
}

function updateScores() {
    scoreElement.textContent = score;
    mistakesElement.textContent = mistakes;
}

function goToNextQuestion() {
    if (!questionAnswered) {
        return;
    }

    choicesDiv.innerHTML = "";
    setNextQuestion();
}

function shuffleArray(array) {
    var from, temp, to;

    for (to = array.length - 1; to > 0; to--) {
        from = Math.floor(Math.random() * (to + 1));
        temp = array[to];
        array[to] = array[from];
        array[from] = temp;
    }

    return array;
}


// Events
nextBtn.addEventListener("click", goToNextQuestion);


// Preparation
setNextQuestion();
