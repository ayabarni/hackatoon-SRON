document.addEventListener("DOMContentLoaded", () => {
    const video = document.querySelector("video");
    const scrollContainer = document.querySelector(".scroll-container");
    const textElements = document.querySelectorAll(".typewriter");
    const skipBtn = document.getElementById("skip-btn");

    // Video afspelen
    video.play();
    video.playbackRate = 0.5;

    // Typewriter
    // Maak observer
    const observer = new IntersectionObserver((entries) => {

        // Alle elementen die de observer in de gaten houdt
        entries.forEach(entry => {
            const p = entry.target;
            const container = p.parentElement;
            const fullText = p.getAttribute("data-text");

            // Is het element voor de helft in beeld?
            if (entry.isIntersecting) {
                container.classList.add("is-visible");
                if (p.innerHTML === "") {

                    // Eerste letter is positie 0
                    let i = 0;

                    // Typefunctie: typt 1 letter en roept zichzelf opnieuw aan
                    function typeLetter() {

                        // Zolang huidige letter (i) kleiner is dat de totale lengte
                        if (i < fullText.length) {

                            // voegt de letter toe
                            p.innerHTML += fullText.charAt(i);

                            // Tel 1 op bij i om naar de volgende letter te gaan
                            i++;

                            // Wacht 15ms en dan weer opnieuw
                            setTimeout(typeLetter, 15);
                        }
                    }
                    typeLetter();
                }
            // Als het element niet meer in beeld is:
            } else {

                // Verwijder zichtbaarheid en maak de tekst weer leeg
                container.classList.remove("is-visible");
                p.innerHTML = "";
            }
        });
        // 50% van het blok moet in beeld zijn om de typewriter te starten
    }, { threshold: 0.5 });

    // Ga de hele lijst af
    textElements.forEach(el => observer.observe(el));

    // Zoom voor overgang
    scrollContainer.addEventListener("scroll", () => {
        const scrollTop = scrollContainer.scrollTop;
        const scrollHeight = scrollContainer.scrollHeight - scrollContainer.clientHeight;

        // Als we helemaal onderaan zijn
        if (scrollTop >= scrollHeight - 10) {
            // Voeg de zoom class toe aan de video
            video.classList.add("video-zoom-in");
            
            // Wacht even en ga dan naar de volgende pagina
            setTimeout(() => {
                document.body.classList.add("fade-out");
            }, 1000);

            setTimeout(() => {
                window.location.href = "info.html";
            }, 2000);
        }
    });

    if (skipBtn) {
        skipBtn.addEventListener("click", () => {
            scrollContainer.scrollTo({
                top: scrollContainer.scrollHeight,
                behavior: "smooth"
            });
        });
    }
});