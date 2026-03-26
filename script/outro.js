// bron: https://www.youtube.com/watch?v=pUR5O9UO4Vc
// bron: https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame

// document.addEventListener("DOMContentLoaded", () => {
//     const video = document.querySelector(".mila-video-bh video");

//     if (!video) return;

//     video.play();

//     requestAnimationFrame(() => {
//         requestAnimationFrame(() => {
//             video.classList.add("video-zoom-out");
//         });
//     });
// });

// voeg clas toe na 2.5s
document.addEventListener("DOMContentLoaded", () => {
    const outroTekst = document.querySelector(".outro-tekst");

    setTimeout(() => {
        outroTekst.classList.add("is-visible");
    }, 2500);
});