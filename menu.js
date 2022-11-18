const fader = document.getElementById("fader");

const tl = new TimelineMax();

fader.style.display = "block";
tl.fromTo(fader, 1, { y: 0, opacity: 1 }, { y: "100vh", ease: Power2.easeOut, opacity: 0 });