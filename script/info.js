// MARK: Constanten
// -------- ZAKLAMP --------
const lightCursor = document.querySelector(".cursor");
const overlayElement = document.querySelector(".overlay");
let movingTimer;

const toggleInput = document.getElementById("flashlight-toggle");
const toggleLabel = document.querySelector(".toggle-label");
const overlay = document.querySelector(".overlay");




// ---------- PLANETEN ---------
const container = document.querySelector(".container");
const planets = document.querySelectorAll(".planet");
const threshold = 300;

let mouseX = 0;
let mouseY = 0;




// https://codepen.io/shooft/pen/QwEbeME
let containerBCR = container.getBoundingClientRect();
let containerWidth = container.clientWidth;
let containerHeight = container.clientHeight;

// --------- STARS ---------
const starContainer = document.querySelector(".stars-container");

let starContainerWidth = starContainer.clientWidth;
let starContainerHeight = starContainer.clientHeight;

let stars = [];
let starCount = 300;




// MARK: Functions
// ---------- ZAKLAMP ---------
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

if (toggleInput) {
    toggleInput.addEventListener("change", (e) => {
        if (e.target.checked) {
            overlay.classList.remove("flashlight-off");
            toggleLabel.innerText = "Flashlight: OFF";
        } else {
            overlay.classList.add("flashlight-off");
            toggleLabel.innerText = "Flashlight: ON";
        }
    });
}





// --------- STARS ----------
function Star() {
  const starDiv = document.createElement("div");
  starDiv.classList.add("star-css");
  starContainer.appendChild(starDiv);
  
  // !!ChatGPT: hoe laat ik elke star een random grootte hebben > geef mij hier een wiskundige berekening voor.
  const size = 1 + Math.random() * 5;
  starDiv.style.width = size + "px";
  starDiv.style.height = size + "px";
  
  starDiv.style.backgroundColor = randomColor(); 
  
  // Zet de eigenschappen op de div
  starDiv._x = Math.random() * starContainerWidth;
  starDiv._y = Math.random() * starContainerHeight;
  starDiv._vx = (Math.random() - 0.5) * 0.1;
  starDiv._vy = (Math.random() - 0.5) * 0.1;

  starDiv.style.left = starDiv._x + "px";
  starDiv.style.top = starDiv._y + "px";

  return starDiv; // !! ChatGPT: return de div zodat we hem in de array kunnen zetten
}

function initStars() {
  // Maken van de sterren: https://codepen.io/misama17/pen/bNwYmbB?editors=0010
  for (let i = 0; i < starCount; i++) { 
    stars[i] = new Star(); 
  }
}
initStars();




window.addEventListener("resize", debounceResize(handleResize, 60));

function handleResize() {
  starContainerWidth = starContainer.clientWidth;
  starContainerHeight = starContainer.clientHeight;
  
  stars.forEach(star => {
    // Ervoor zorgen dat de divs binnen de container blijft, ook als je de grootte van je scherm aanpast.
    // star._x = Math.min(star._x, starContainerWidth);
    // star._y = Math.min(star._y, starContainerHeight);
    // console.log(starContainerWidth - star._x);
    star._x = randomNumber(0, starContainerWidth);
    star._y = randomNumber(0, starContainerHeight);
  });
}

// Met Jad gemaakt 
function debounceResize(func, wait = 200) {
  let timeout;
  return (event) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(event), wait);
  };
}


// Generic debounce method
// function debounce(func, wait = 200) {
//   let timeout;
//   return (...args) => {
//     clearTimeout(timeout);
//     timeout = setTimeout(() => func(...args), wait);
//   };
// }



function starsAnimation() {
  stars.forEach(star => {
    star._x += star._vx;
    star._y += star._vy;

    // botsen tegen randen
    // !! ChatGPT: Hoe zorg ik ervoor dat de divs niet buiten mijn container komen en "botsen" tegen de randen?
    if (star._x < 0 || star._x > starContainerWidth) star._vx = -star._vx;
    if (star._y < 0 || star._y > starContainerHeight) star._vy = -star._vy;

    // update div positie in CSS
    star.style.left = star._x + "px";
    star.style.top = star._y + "px";
  });
  
  // Hiermee zeg je: bereken elke 60ms de nieuwe positie. Dus in console zie je ook continu veranderen te waardes.
  requestAnimationFrame(starsAnimation);
}

starsAnimation();


// https://codepen.io/misama17/pen/bNwYmbB?editors=0010
function randomColor() {
  let random = Math.random() * 3;
  if (random > 2) return "#FFF";
  if (random < 2 && random > 1) return "#EB5D35";
  if (random < 1) return "#EB5D35";
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}







// ---------- PLANETS ---------

// Zwevende positie (random)
// ChatGPT: geef mij een berekening hoe ik mijn divs vrij kan laten zweven over mijn pagina
planets.forEach(planet => {
  // Bepaalt random positie op basis van de breedte van de container
  planet._x = Math.random() * containerWidth;
  planet._y = Math.random() * containerHeight;
  
  // Bepaalt random de snelheid van elke div
  planet._vx = (Math.random() - 0.5) * 0.5;
  planet._vy = (Math.random() - 0.5) * 0.5;
});



container.addEventListener("mousemove", e => { 
  mouseX = e.clientX;
  mouseY = e.clientY;
  
  container.style.setProperty("--mouse-x", mouseX);
  container.style.setProperty("--mouse-y", mouseY);
  
});


// Gemini: hoe kan ik ervoor zorgen dat mijn divs binnen mijn container blijven, ook als ik mijn scherm resize?
window.addEventListener("resize", () => {
  containerWidth = container.clientWidth;
  containerHeight = container.clientHeight;
  
  planets.forEach(planet => {
    // Ervoor zorgen dat de divs binnen de container blijft, ook als je de grootte van je scherm aanpast.
    planet._x = Math.min(planet._x, containerWidth);
    planet._y = Math.min(planet._y, containerHeight);
  });
});




// animatie beweging
function planetsAnimation() {

  planets.forEach(planet => {

    // De divs laten zweven in de container: positie plus de snelheid. >> telkens wordt er een senlheid bij de positie geteld, wat de nieuwe positie bepaalt.
    planet._x = planet._x + planet._vx;
    planet._y = planet._y + planet._vy;

    
    // !! ChatGPT: Hoe zorg ik ervoor dat de divs niet buiten mijn container komen en "botsen" tegen de randen?
    if (planet._x < 0 || planet._x > containerWidth) {
      planet._vx = -planet._vx;
    }

    if (planet._y < 0 || planet._y > containerHeight) {
      planet._vy = -planet._vy;
    }

    
    
    // afstand tot muis
    // https://codepen.io/shooft/pen/QwEbeME
    let deltaX = planet._x - mouseX;
    let deltaY = planet._y - mouseY;
    
    
    let distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    let repelX = 0;
    let repelY = 0;

    if (distance < threshold) {
      let force = (1 - distance / threshold) * 200;

      let angle = Math.atan2(deltaY, deltaX);

      repelX = Math.cos(angle) * force;
      repelY = Math.sin(angle) * force;
    }

    
    planet.style.setProperty("--x", planet._x);
    planet.style.setProperty("--y", planet._y);
    planet.style.setProperty("--repel-x", repelX);
    planet.style.setProperty("--repel-y", repelY);
  });

  requestAnimationFrame(planetsAnimation);
}

planetsAnimation();

