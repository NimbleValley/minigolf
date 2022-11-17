const gameTitle = document.querySelector("#game-title");
const homeBorder = document.querySelector("#home-border");
const playButton = document.querySelector("#play-button");
const footer = document.querySelector("#footer");

const fader = document.getElementById("fader");

const tl = new TimelineMax();

tl.fromTo(gameTitle, 1, { x: "-25vw", opacity: 0 }, { x: 0, ease: Power2.easeOut, opacity: 1 });
tl.fromTo(homeBorder, 1, { y: "25vh", opacity: 0 }, { y: 0, ease: Power2.easeOut, opacity: 1 },"-=1");
tl.fromTo(playButton, 1, { scale: 0.25, opacity: 0 }, { scale: 1, ease: Power2.easeOut, opacity: 1 },"-=0.5");
tl.fromTo(footer, 1, { y: "5vh", opacity: 0 }, { y: 0, ease: Power2.easeOut, opacity: 1 }, "-=.75");

function menuScreen() {
    fader.style.display = "block";
    tl.fromTo(fader, 1, { x: "-100vw", opacity: 0 }, { x: 0, ease: Power2.easeOut, opacity: 1 });
}