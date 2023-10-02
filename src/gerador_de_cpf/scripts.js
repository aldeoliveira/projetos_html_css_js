const generateCpfButton = document.querySelector("#generate-cpf");
const copyCpfButton = document.querySelector("#copy-cpf");
const cpf = document.querySelector("#cpf");


function generateCpf() {    
    cpf.textContent = `${getRandomNumber(999, 3)}.${getRandomNumber(999, 3)}.${getRandomNumber(999, 3)}-${getRandomNumber(99, 2)}`;
}

function getRandomNumber(max, chars) {
    return String(Math.floor(Math.random() * max)).padStart(chars, "0");
}

function copyCpf() {
    navigator.clipboard.writeText(cpf.innerText).then(() => {
        alert("CPF copiado para área de transferência!");
    },
    (err) => {
        console.log("Erro ao copiar.");
    });
}


generateCpfButton.addEventListener("click", generateCpf);
copyCpfButton.addEventListener("click", copyCpf);
