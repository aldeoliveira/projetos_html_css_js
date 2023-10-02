// Implementar contagem de caracteres
// Implementar contagem de palavras


// Elements
let inputArea = document.querySelector("#input");
let counter = document.querySelector("#count");
let toggleBtn = document.querySelector("#toggle-button");

let countingWords = true;


// Functions
function countContent() {
    let count;
    let countedElement;
    let text = inputArea.value;

    if (countingWords) {        
        let whiteSpaces = text.split(/\s+/).filter(function(n){ return n != ""; });
        count = whiteSpaces.length;

        console.log(whiteSpaces);
        countedElement = "palavra(s)";
    } else {
        count = text.length;
        countedElement = "caractere(s)";
    }

    counter.textContent = `${count} ${countedElement}`
}

function changeCountedElement() {
    countingWords = !countingWords;
    countContent();
}


// Events
inputArea.addEventListener("input", countContent);
toggleBtn.addEventListener("click", changeCountedElement);


countContent();
