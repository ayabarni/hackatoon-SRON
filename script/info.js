const lightCursor = document.querySelector(".cursor")
let movingTimer;

function followCursor() {
    document.querySelector(".overlay").addEventListener("mousemove", followMouse)
}

// https://codepen.io/shooft/pen/GROwdqd
function followMouse(e) {
    let mouseX = e.clientX;
    let mouseY = e.clientY;

    // we slaan het element voor het gemak even op
    const element = e.currentTarget;

    // info opvragen over de afmetingen en positie
    const elementRectangle = element.getBoundingClientRect();

    // de breedte en hoogte opslaan
    let elementWidth = elementRectangle.width;
    let elementHeight = elementRectangle.height;


    let x = mouseX / elementWidth;
    let y = mouseY / elementHeight;

    element.style.setProperty("--mouse-x", x);
    element.style.setProperty("--mouse-y", y);

    element.classList.add("is-moving");

    clearTimeout(movingTimer);

    // element.classList.remove("not-moving");

    movingTimer = setTimeout(() => {
        element.classList.remove("is-moving");
    }, 250);

}

followCursor()