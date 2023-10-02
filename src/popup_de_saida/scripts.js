let darkScreen = document.querySelector(".dark-screen");
let closePopUpBtn = document.querySelector("#closePopUpBtn");
let pointerLeft = false;


function showPopUp() {
    darkScreen.style.display = "flex";
}


function closePopUp() {
    darkScreen.style.display = "none";
}


document.addEventListener("mouseleave", function(event) {
    if (!pointerLeft && (
        event.clientY <= 0 || event.clientX <= 0 || event.clientY >= window.innerHeight || event.clientX >= window.innerWidth
    )) {
        pointerLeft = true;
        showPopUp();
    }
});


closePopUpBtn.addEventListener("click", closePopUp);
