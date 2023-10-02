const body = document.querySelector("body");
const history = document.querySelector(".history-container");
const challengeText = document.querySelector("#challenge-text");
const inputElement = document.querySelector("#input-text");
const feedbackMessage = document.querySelector("#feedback-message")
const resetBtn = document.querySelector("#reset-button");
const changeThemeBtn = document.querySelector("#change-theme-button");


const texts = [
    "Exemplo de texto para digitar.",
    "Outro exemplo de texto para digitar.",
    "Mais um exemplo de texto para digitar.",
    "Ser ou não ser, eis a questão.",
];


function changeTheme() {
    body.classList.toggle("light");
    body.classList.toggle("dark");

    let currentTheme = body.classList.contains("light") ? "light" : "dark";

    localStorage.setItem("theme", currentTheme);
}


function setNewText() {
    let index = Math.floor(Math.random() * texts.length);

    challengeText.textContent = texts[index];
}


function updateTest() {
    let testIsOn = JSON.parse(localStorage.getItem("testIsOn"));

    if (testIsOn) {
        checkForSuccess();
    } else {
        startTest();
    }
}


function startTest() {
    localStorage.setItem("initialTime", new Date().getTime());
    localStorage.setItem("testIsOn", true);
}


function checkForSuccess() {
    if (inputElement.value == challengeText.textContent) {
        finishTest();
    }
}


function finishTest() {
    let initialTime = JSON.parse(localStorage.getItem("initialTime"))
    let finalTime = new Date().getTime();
    let testTime = (finalTime - initialTime) / 1000;
    let testText = challengeText.textContent;

    feedbackMessage.textContent = `Parabens! Você levou ${testTime} segundos!`;
    addToHistory(testText, testTime);
    localStorage.setItem("testIsOn", false);
    inputElement.value = "";
    setNewText();
}


function addToHistory(testText, testTime) {
    let itemHistory = document.createElement("p");

    itemHistory.textContent = `Texto "${testText}" - Tempo: ${testTime} segundos.`;

    history.appendChild(itemHistory);
}


function resetTest() {
    localStorage.setItem("testIsOn", false);
    localStorage.removeItem("initialTime");

    inputElement.value = "";
    feedbackMessage.textContent = "";
    history.innerHTML = "";

    setNewText();
}


changeThemeBtn.addEventListener("click", changeTheme);
inputElement.addEventListener("input", updateTest);
resetBtn.addEventListener("click", resetTest);


if (localStorage.getItem("theme") == "dark") {
    body.classList.remove("light");
    body.classList.add("dark");
}


setNewText();
