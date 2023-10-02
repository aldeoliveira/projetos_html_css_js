const tooLowMessage = "Muito baixo. Tente novamente.";
const tooHighMessage = "Muito alto. Tente novamente.";
let remainingTries = null;
let goalNumber = null;
let tries = 0;

// Divs
const difficultySelectionDiv = document.querySelector(".difficulty-selection");
const gameDiv = document.querySelector(".game-container");

// Input fields
const difficultySelector = document.querySelector("#difficultySelector");
const guessForm = document.querySelector(".guess-form");
const guessElement = document.querySelector("#guess");
const evaluateGuessBtn = document.querySelector("#evaluateGuessBtn");
const resetBtn = document.querySelector("#resetBtn");

// Outputs
const remainingTriesElement = document.querySelector("#remainingTries");
const feedbackElement = document.querySelector(".feedback");


function selectDifficulty() {
    const difficultyLevel = difficultySelector.value;

    if (difficultyLevel) {
        startGame(difficultyLevel);
    }
}

function startGame(difficultyLevel) {
    difficultySelectionDiv.style.display = "none";
    guessForm.style.display = "block";
    gameDiv.style.display = "block";
    tries = 0;

    switch (difficultyLevel) {
        case "easy":
            remainingTries = 10;
            break;
        case "medium":
            remainingTries = 7;
            break;
        case "hard":
            remainingTries = 5;
            break;
        default:
            remainingTries = 10;
            break;
    }

    remainingTriesElement.textContent = remainingTries;
    goalNumber = Math.floor(Math.random() * 100 + 1);
    console.log(goalNumber);
}

function evaluateGuess() {
    const guess = guessElement.value;
    let response = "";

    guessElement.value = "";
    tries ++;

    if (isNaN(guess) || guess == "" || guess < 1 || guess > 100) {
        feedbackElement.style.display = "block";
        feedbackElement.textContent = "Por favor insira um número de 1 a 100.";
        return;
    } else if (guess > goalNumber) {
        response = tooHighMessage;
    } else if (guess < goalNumber) {
        response = tooLowMessage;
    } else if (guess == goalNumber) {
        showWin();
        return;
    } else {
        return;
    }

    feedbackElement.textContent = response;
    feedbackElement.style.display = "block";

    if (remainingTries == 1) {
        showLoss();
    }

    remainingTries --;
    remainingTriesElement.textContent = remainingTries;
}

function showWin() {
    guessForm.style.display = "none";
    feedbackElement.style.display = "block";
    feedbackElement.textContent = `Parabéns, você acertou em ${tries} tentativas!`;
    resetBtn.style.display = "block";
}

function showLoss() {
    guessForm.style.display = "none";
    feedbackElement.style.display = "block";
    feedbackElement.textContent = `Suas tentativas acabaram. O número correto era ${goalNumber}.`;
    resetBtn.style.display = "block";
}

function reset() {
    difficultySelectionDiv.style.display = "block";
    difficultySelector.value = "";

    gameDiv.style.display = "none";
    feedbackElement.style.display = "none";
    guessForm.style.display = "none";
    resetBtn.style.display = "none";
}

difficultySelector.addEventListener("change", selectDifficulty);
evaluateGuessBtn.addEventListener("click", (e) => {
    e.preventDefault();
    evaluateGuess();
});
resetBtn.addEventListener("click", reset);
