// Element selection
let generatePasswordBtn = document.querySelector("#generate-password");
let generatedPasswordElement = document.querySelector("#generated-password");

let openCloseGeneratorBtn = document.querySelector("#open-generate-password");
let generatedPasswordContainer = document.querySelector("#generate-options");
let lengthInput = document.querySelector("#length");
let numbersInput = document.querySelector("#letters");
let symbolsInput = document.querySelector("#symbols");
let copyPasswordBtn = document.querySelector("#copy-password");


// Functions
// letters, numbers, symbols
let getLetterLowerCase = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
};


let getLetterUpperCase = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
};


let getNumber = () => {
    return Math.floor(Math.random() * 10).toString();
};


let getSymbol = () => {
    const symbols = "()[]{},.!?<>-!@#$%&*";

    return symbols[Math.floor(Math.random() * symbols.length)];
};


let generatePassword = (getLetterLowerCase, getLetterUpperCase, getNumber, getSymbol) => {
    let password = "";
    const passwordLength = lengthInput.value;

    const generators = [];

    if (lengthInput.checked) {
        generators.push(getLetterLowerCase, getLetterUpperCase);
    }
    
    if (numbersInput.checked) {
        generators.push(getNumber);
    }
    
    if (symbolsInput.checked) {
        generators.push(getSymbol);
    }

    if (generators.length === 0) {
        return;
    }

    for (i = 0; i < passwordLength; i = i + generators.length) {
        generators.forEach(() => {
            let randomValue = generators[Math.floor(Math.random() * generators.length)]();

            password += randomValue;
        })
    }

    password = password.slice(0, passwordLength);
    
    generatedPasswordElement.style.display = "block";
    generatedPasswordElement.querySelector("h4").innerText = password;
};


// Events
generatePasswordBtn.addEventListener("click", () => {
    generatePassword(getLetterLowerCase, getLetterUpperCase, getNumber, getSymbol);
});

openCloseGeneratorBtn.addEventListener("click", () => {
    generatedPasswordContainer.classList.toggle("hide");
});

copyPasswordBtn.addEventListener("click", (event) => {
    event.preventDefault();

    let password = generatedPasswordElement.querySelector("h4").innerText;

    navigator.clipboard.writeText(password).then(() => {
        copyPasswordBtn.innerText = "Senha copiada";

        setTimeout(() => {
            copyPasswordBtn.innerText = "Copiar";
        }, 1000);
    });
});