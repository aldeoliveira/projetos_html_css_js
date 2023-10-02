const generateButton = document.querySelector("#generate-button");
const palette = document.querySelector(".palette-container");

function generatePalette() {
    palette.innerHTML = ""; // Primeiramente limpa as cores geradas anteriormente

    for(let i = 0; i < 5; i++) {
        const newColor = generateRandomColor();
        const newColorContainer = createColorContainer(newColor);
        
        palette.appendChild(newColorContainer);
    }
}

function createColorContainer(newColor) {
    const colorContainer = document.createElement("div");

    colorContainer.classList.add("color-container");
    
    const colorDiv = document.createElement("div");
    const colorDescription = document.createElement("p");

    colorDiv.style.backgroundColor = newColor;
    colorDescription.style.color = newColor;
    colorDescription.textContent = newColor;
    colorContainer.appendChild(colorDiv);
    colorContainer.appendChild(colorDescription);

    return colorContainer;
}

function generateRandomColor() {
    const letters = "0123456789ABCDEF";

    let color = "#";

    for(let i = 0; i < 6; i ++) {
        color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
}


generateButton.addEventListener("click", generatePalette);