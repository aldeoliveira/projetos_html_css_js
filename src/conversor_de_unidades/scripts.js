// Selecionar os elements
const inputElement = document.querySelector("#input")
const fromElement = document.querySelector("#from")
const toElement = document.querySelector("#to")
const outputElement = document.querySelector("#output")
const convertButton = document.querySelector("#convert-btn")
const messageElement = document.querySelector("#message")

// Função para converter as unidades
function convert() {
    const fromUnit = fromElement.value;
    const toUnit = toElement.value;

    if(fromUnit === toUnit) {
        outputElement.value = inputElement.value;
        messageElement.textContent = "";
    }

    // Converter a entrada para metros
    let meters = convertToMeters(inputElement.value, fromUnit)

    // Converter metros para unidade de saída
    let result = meters / convertToMeters(1, toUnit)

    // Exibir resultado no output
    outputElement.value = result;

    // Exibir resultado nas mensagens
    const fromLabel = fromElement.options[fromElement.selectedIndex].text;
    const toLabel = toElement.options[toElement.selectedIndex].text;

    const message = `${inputElement.value} ${fromLabel} equivalem a ${result} ${toLabel}`;
    messageElement.textContent = message;

    return;
}


function convertToMeters(value, unit) {
    let inMeters
    switch (unit) {
        case "m":
            inMeters = value
            break
        case "km":
            inMeters = value * 1000
            break
        case "cm":
            inMeters = value / 100
            break
        case "mm":
            inMeters = value / 1000
            break
    }
    return inMeters
}


convertButton.addEventListener("click", convert);
