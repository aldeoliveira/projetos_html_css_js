const button = document.querySelector("button");
const billValueElement = document.querySelector("#bill-value");
const serviceQualityElement = document.querySelector("#service-quality");
const tipValueElement = document.querySelector("#tip-value");
const totalValueElement = document.querySelector("#total-value");

function calculateTip() {
    if(billValueElement.value === "") {
        alert("Por favor, insira o valor da conta.");
        return;
    }

    const billValue = parseFloat(billValueElement.value);
    const tipPercentage = parseFloat(serviceQualityElement.value);

    let tipValue = (billValue * tipPercentage);
    let totalValue = (billValue + tipValue);

    tipValueElement.value = tipValue.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
    totalValueElement.value = totalValue.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
};

button.addEventListener("click", calculateTip);
