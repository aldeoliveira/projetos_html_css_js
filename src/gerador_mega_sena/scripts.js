const generateNumbersBtn = document.querySelector("#generateNumbersBtn");
const numberElements = document.querySelectorAll(".number-container");


function generateNumbers() {
    const max = 60;
    const min = 1;
    const ourNumbers = [];

    while (ourNumbers.length < 6) {
        const newNumber = Math.floor(Math.random() * (max - min + 1)) + min;

        if (!ourNumbers.includes(newNumber)) {
            ourNumbers.push(newNumber);
        }
    }

    console.log(ourNumbers);

    for (let i = 0; i < numberElements.length; i++) {
        numberElements[i].textContent = ourNumbers[i];
    }
}


generateNumbersBtn.addEventListener("click", generateNumbers);
