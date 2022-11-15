
function togglePopup(id){
  document.getElementById(id).classList.toggle("active");
}
document.addEventListener('keydown', function(event){
	if(event.key === "Escape"){
document.getElementById("popup-1").classList.toggle("active");
	}
});
document.addEventListener('keydown', function(event){
	if(event.key === "Escape"){
document.getElementById("popup-2").classList.toggle("active");
	}
});

//Animations

const gameTitle = document.querySelector(".game-title");
const footer = document.querySelector("#footer");

const tl = new TimelineMax();

tl.fromTo(gameTitle, 1, { x: "-25vw", opacity: 0 }, { x: 0, ease: Power2.easeOut, opacity: 1 });
tl.fromTo(footer, 1, { y: "5vh", opacity: 0 }, { y: 0, ease: Power2.easeOut, opacity: 1 });
