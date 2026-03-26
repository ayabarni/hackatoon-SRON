console.log("Hello world!");

// MARK: Satellite info 
// Variabelen
const activateBtn = document.getElementById('activate-btn');
const infoPanel = document.getElementById('info-panel');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const slides = document.querySelectorAll('.info-slide');
const counter = document.querySelector('.slide-counter');
const sendDataBtn = document.getElementById('send-data-btn');

// Eerste slide
let currentSlide = 0;
let typTimers = [];

// MARK: Typewriter function
function typTekst(element) {
    const fullText = element.getAttribute("data-text");
    element.innerHTML = "";
    let i = 0;

    function typeLetter() {
        if (i < fullText.length) {
            element.innerHTML += fullText.charAt(i);
            i++;
            let timer = setTimeout(typeLetter, 15); 
            typTimers.push(timer);
        }
    }
    typeLetter();
}

// MARK: slides tonen
function toonSlide(index) {
    typTimers.forEach(timer => clearTimeout(timer));
    typTimers = [];

    // Verberg alle slides
    slides.forEach(slide => {
        slide.classList.remove('active');
    });

    // Geef huidige slide active class
    const actieveSlide = slides[index];
    actieveSlide.classList.add('active');

    // Update nummer
    counter.innerHTML = (index + 1) + " / " + slides.length;

    // Zoek h3 en p in deze slide
    const titel = actieveSlide.querySelector('h3');
    const paragraaf = actieveSlide.querySelector('p');

    // Start typewriter
    typTekst(titel);

    let pTimer = setTimeout(() => {
        typTekst(paragraaf);
    }, 300); 
    typTimers.push(pTimer);
}

// MARK: Tekst navigatie knoppen
// Als je op de grote knop klikt
activateBtn.addEventListener('click', () => {
    activateBtn.classList.add('is-hidden'); 
    sendDataBtn.classList.add('is-hidden');
    infoPanel.classList.add('is-visible');  
    currentSlide = 0;
    toonSlide(currentSlide);                
});

// Volgende knop
nextBtn.addEventListener('click', () => {
    // Zijn we bij de laatste slide?
    if (currentSlide === slides.length - 1) {
        infoPanel.classList.remove('is-visible');
        activateBtn.classList.remove('is-hidden');
        activateBtn.classList.add('dimmed');
        activateBtn.innerText = "RE-SCAN DATA";
        sendDataBtn.classList.remove('is-hidden');
    } else {
        currentSlide++; 
        toonSlide(currentSlide);
    }
});

// Vorige knop
prevBtn.addEventListener('click', () => {
    currentSlide--;

    // Als we voor de eerste slide komen, ga naar de laatste
    if (currentSlide < 0) {
        currentSlide = slides.length - 1;
    }
    toonSlide(currentSlide);
});

// MARK: Background stars
// Variabelen
const starContainer = document.querySelector(".stars-container");

let starContainerWidth = starContainer.clientWidth;
let starContainerHeight = starContainer.clientHeight;

let stars = [];
let starCount = 300;

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

function starsAnimation() {
    stars.forEach(star => {
        star._x += star._vx;
        star._y += star._vy;

        // botsen tegen randen
        // !! ChatGPT: Hoe zorg ik ervoor dat de divs niet buiten mijn container komen en "botsen" tegen de randen?
        // if (star._x < 0 || star._x > starContainerWidth) star._vx = -star._vx;
        // if (star._y < 0 || star._y > starContainerHeight) star._vy = -star._vy;

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