// MARK: Constanten
const video = document.querySelector("video");







// MARK: Functions
// https://codepen.io/bramus/pen/PoxorVO?editors=1010
// ChatGPT: Ik heb een video op mijn HTML pagina. Nu wil ik met CSS het afspelen van de video scroll driven maken. dus het scrollen moet gekoppeld worden aan de tijdlijn van de video. Gebruik dit als voorbeeld, maar dan dat de video alleen in beeld is https://codepen.io/bramus/pen/PoxorVO
function scrollVideo () {
    const scrollTop = window.scrollY;
    const scrollHeight = document.body.scrollHeight - window.innerHeight;

    // Bepaalt de scrollpositie in "percentages" van 0 tot 1
    const scrollFraction = scrollTop / scrollHeight;

    // Koppelt het percentage aan de tijdlijn van de video
    video.currentTime = video.duration * scrollFraction;
}

window.addEventListener("scroll", scrollVideo)