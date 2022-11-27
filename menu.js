const fader = document.getElementById("fader");

const tl = new TimelineMax();

fader.style.display = "block";
tl.fromTo(fader, 1, { y: 0, opacity: 1 }, { y: "100vh", ease: Power2.easeOut, opacity: 0 });

function startGame(course) {
  window.localStorage.setItem('courseNumber', course);
  open("game.html", "_self");
}

const fileSelector = document.getElementById("custom-load-button");
fileSelector.addEventListener('change', (event) => {
    const reader = new FileReader();
    const file = reader.readAsText(event.target.files[0]);
    reader.onload = function () {
        console.log(reader.result);
        window.localStorage.setItem('courseNumber', 0);
        window.localStorage.setItem("courseData", reader.result);
        open("game.html", "_self");
    }
});