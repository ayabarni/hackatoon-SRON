console.log("Hello world!");
// bron: https://modelviewer.dev/examples/stagingandcameras/#cameraOrbit\

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