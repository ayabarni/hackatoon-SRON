// Hamburger menu
const hamburgerBtn = document.querySelector('.hamburger-btn');
const fullscreenMenu = document.querySelector('.fullscreen-menu');

if (hamburgerBtn && fullscreenMenu) {
    hamburgerBtn.addEventListener('click', () => {
        hamburgerBtn.classList.toggle('is-active');
        
        fullscreenMenu.classList.toggle('is-open');
    });
}