const lightCursor = document.querySelector(".cursor");
const overlayElement = document.querySelector(".overlay");
let movingTimer;

function followCursor() {
    window.addEventListener("mousemove", followMouse);
}

// https://codepen.io/shooft/pen/GROwdqd
function followMouse(e) {
    let mouseX = e.clientX;
    let mouseY = e.clientY;

    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;

    let x = mouseX / windowWidth;
    let y = mouseY / windowHeight;

    overlayElement.style.setProperty("--mouse-x", x);
    overlayElement.style.setProperty("--mouse-y", y);

    overlayElement.classList.add("is-moving");

    clearTimeout(movingTimer);

    movingTimer = setTimeout(() => {
        overlayElement.classList.remove("is-moving");
    }, 250);
}

followCursor()

// MARK: zaklamp aan/uit
const toggleInput = document.getElementById("flashlight-toggle");
const toggleLabel = document.querySelector(".toggle-label");
const overlay = document.querySelector(".overlay");

if (toggleInput) {
    toggleInput.addEventListener("change", (e) => {
        if (e.target.checked) {
            overlay.classList.remove("flashlight-off");
            toggleLabel.innerText = "Flashlight: ON";
        } else {
            overlay.classList.add("flashlight-off");
            toggleLabel.innerText = "Flashlight: OFF";
        }
    });
}