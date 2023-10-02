const form = document.querySelector("form");
const inputName = document.querySelector("#username");
const inputEmail = document.querySelector("#email");
const inputSubject = document.querySelector("#subject");
const inputMessage = document.querySelector("#message");
const errorMessages = document.querySelectorAll(".error-message")

button.addEventListener("submit", (event) => {
    event.preventDefault();
    resetErrors();
    validateInputs();
});

function setError(input, errorMessage) {
    const errorMessageElement = input.nextElementSibling;

    errorMessageElement.textContent = errorMessage;
    input.parentElement.classList.add("error");
};

function resetErrors() {
    errorMessages.forEach((msg) => {
        msg.textContent = "";
    });

    inputName.parentElement.classList.remove("error");
    inputEmail.parentElement.classList.remove("error");
    inputSubject.parentElement.classList.remove("error");
    inputMessage.parentElement.classList.remove("error");
};

function validateInputs() {
    const valueName = inputName.value.trim();
    const valueEmail = inputEmail.value.trim();
    const valueSubject = inputSubject.value.trim();
    const valueMessage = inputMessage.value.trim();

    if(valueName === "") {
        setError(inputName, "O nome não pode ficar em branco");
    };

    if(valueEmail === "") {
        setError(inputEmail, "O e-mail não pode ficar em branco");
    } else if (!isValidEmail(valueEmail)) {
        setError(inputEmail, "E-mail inválido")
    };

    if(valueSubject === "") {
        setError(inputSubject, "O assunto não pode ficar em branco");
    };

    if(valueMessage === "") {
        setError(inputMessage, "A mensagem não pode ficar em branco");
    };
};

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};