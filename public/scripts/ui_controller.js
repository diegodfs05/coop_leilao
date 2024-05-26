/* -- NAVBAR CONTROLLER -- */
let navBar = document.getElementById('sect-navbar');
let floatingMenu = document.querySelector("#sect-navbar .floating-menu");
let barsSvg = document.querySelector("#sect-navbar .bars-svg");
let crossSvg = document.querySelector("#sect-navbar .cross-svg");
function toggleNavbar() {
    floatingMenu.classList.toggle("open");
    barsSvg.classList.toggle("d-none");
    crossSvg.classList.toggle("d-none");
}

/* -- NAVBAR SCROLL TRIGGER -- */
window.addEventListener('scroll', function () {
    let scrollPosition = window.scrollY;
    if (scrollPosition > 200) {
        navBar.classList.add("short")
    } else if ((scrollPosition <= 200) && (navBar.classList.contains("short"))) {
        navBar.classList.remove("short");

    }
});
/* -- NAVBAR CONTROLLER -- */