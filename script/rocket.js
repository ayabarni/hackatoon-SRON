console.log("Hello world!");
// bron: https://modelviewer.dev/examples/stagingandcameras/#cameraOrbit\
// prompt: kan je helpen bij het luisteren naar de degrees wanneer er gedraait wrdt

/* kleur wijzigen als racket gedraaid is naar 180 grade */
const rocketSection = document.querySelector('.rocket');
const rocketTekstAchter = document.querySelector('.achter');
const rocketTekstLinks = document.querySelector('.links');
const rocketTekstRechts = document.querySelector('.rechts');
const viewer = rocketSection.querySelector('model-viewer');

viewer.addEventListener('camera-change', () => {
  const orbit = viewer.getCameraOrbit();
//   1 math.pi is 180 graden. dit doe ik omdat theta een radiaal waarde geeft
  const degrees = orbit.theta * (180 / Math.PI);

  const normalized = ((degrees % 360) + 360) % 360;
  const grade90 = Math.abs(normalized - 90) < 20;
  const grade180 = Math.abs(normalized - 180) < 20;
  const grade360 = Math.abs(normalized - 360) < 20;

   

// Voeg de class .block toe aan de p als het een bepaalde hoek heeft bereikt
  rocketTekstAchter.classList.toggle('block', grade90)
  rocketTekstLinks.classList.toggle('block', grade180)
  rocketTekstRechts.classList.toggle('block', grade360)
});


// spot vinden
// bron: https://modelviewer.dev/docs/#entrydocs-annotations-methods-positionAndNormalFromPoint
// hulp: matthew
viewer.addEventListener('load', () => {
    viewer.addEventListener('click', (e) => {
        const hit = viewer.positionAndNormalFromPoint(e.clientX, e.clientY);

        if (hit) {
            console.log(
                `data-position="${hit.position.x.toFixed(3)} ${hit.position.y.toFixed(3)} ${hit.position.z.toFixed(3)}" data-normal="${hit.normal.x.toFixed(3)} ${hit.normal.y.toFixed(3)} ${hit.normal.z.toFixed(3)}"`
            );
        }
    });
});

// timeout voor het uitvoeren van de action om naar de volgende pagina te gaan
// bron: https://developer.mozilla.org/en-US/docs/Web/API/Window/setTimeout
const volgendePaginaButton = document.querySelector(".click-button")

volgendePaginaButton.addEventListener('click', (event) => {
    event.preventDefault();

    document.body.classList.add("pagina-verlaten")
    
    viewer.addEventListener("animationend", function() {
        console.log("halloooo");

        window.location.href = event.target.href;
    })


    // setTimeout(() => {
        
    // }, 2000);
})
