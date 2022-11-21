const fader = document.getElementById("fader");

const tl = new TimelineMax();

fader.style.display = "block";
tl.fromTo(fader, 1, { y: 0, opacity: 1 }, { y: "100vh", ease: Power2.easeOut, opacity: 0 });

const fileSelector = document.getElementById('file-selector');
  fileSelector.addEventListener('change', (event) => {
    const file = event.target.files[0];
    var formData = new FormData();
    formData.set("file", file);
    console.log(formData)
    window.localStorage.setItem('customCourse', fileList);
  });