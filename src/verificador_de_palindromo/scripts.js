let verifyBtn = document.querySelector("#verify-button");
let wordInput = document.querySelector("#word");
let resultElement = document.querySelector("#result");

function verifyWord() {
    let word = wordInput.value.trim();

    if (word == "") {
        return;
    }

    let result = "";

    if (isPalindrome(word)) {
        result = `A expressão "${word}" é um palíndromo!`
    } else {
        result = `A expressão "${word}" não é um palíndromo.`
    }

    resultElement.textContent = result;
}

function isPalindrome(word) {
    let string = word.replace(/\s+/g, "").toLowerCase();
    let reversedString = string.split("").reverse().join("");

    return (string === reversedString ? true : false);
}

verifyBtn.addEventListener("click", verifyWord);
wordInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        verifyWord();
    }
});