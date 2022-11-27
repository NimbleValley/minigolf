const cells = document.getElementsByTagName("td");
const style = getComputedStyle(document.body);

const hole = document.getElementById("hole");
const ball = document.getElementById("ball");

const courseContainer = document.getElementById("course-container");

var brushIcons = document.getElementsByClassName("tile-select");

var courseData = JSON.parse(localStorage.getItem("courseData"));

var bumpersInCourse = [];

var brushType = 0;
brushIcons[0].style.backgroundColor = "rgba(255, 136, 0, 0.877)";

var width = window.innerWidth;
var height = window.innerHeight;

/*
-TESTER-
const tester = document.getElementById("tester");
tester.style.left = `${(width - (height * (9/10)))/width * 50}%`
*/

if (courseData == null || courseData == undefined) {
    courseData = {
        "ballStart": {
            x: 50,
            y: 50
        },
        "hole": {
            x: 20,
            y: 25
        },
        "bumperData": [

        ],
        "tileData": [

        ]
    }
    for (var i = 0; i < 144; i++) {
        courseData.tileData.push(0);
    }
}

updateTiles(courseData.tileData);

for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener('click', (e) => {
        width = window.innerWidth;
        height = window.innerHeight;
        if (brushType < 3) {
            //Set Terrain Type
            courseData.tileData[e.target.cellIndex + (e.target.parentElement.rowIndex * 12)] = brushType;
        } else if (brushType == 3) {
            //Add Bumper
            if (width > height) {
                var tempBumper = {
                    x: (e.clientX - (width * 0.0125) - (width - (height * (9 / 10))) / 2) / (height * (9 / 10) / 100),
                    y: (e.clientY - (width * 0.0125) - (height * 5 / 100)) / (height * (9 / 10) / 100),
                    id: courseData.bumperData.length
                }
            }
            courseData.bumperData.push(tempBumper);
        } else if (brushType == 4) {
            //Set Ball Position
            if (width > height) {
                courseData.ballStart.x = (e.clientX - (width - (height * (9 / 10))) / 2) / (height * (9 / 10) / 100);
                courseData.ballStart.y = ((e.clientY - (height * 5 / 100)) / (height * (9 / 10) / 100));
            }
            updateEntities();
        } else if (brushType == 5) {
            //Set Hole Position
            if (width > height) {
                courseData.hole.x = (e.clientX - (width - (height * (9 / 10))) / 2) / (height * (9 / 10) / 100);
                courseData.hole.y = ((e.clientY - (height * 5 / 100)) / (height * (9 / 10) / 100));
            }
            updateEntities();
        }
        updateTiles(courseData.tileData);
        window.localStorage.setItem('courseData', JSON.stringify(courseData));
    })
}

function updateTiles(data) {
    //console.log(courseData.bumperData[0]);
    for (var i = 0; i < cells.length; i++) {
        cells[i].style.outline = "black 0.01vw solid";
        cells[i].style.border = "none";
        if (data[i] == 0) {
            cells[i].style.backgroundColor = style.getPropertyValue('--color1');
        } else if (data[i] == 1) {
            cells[i].style.backgroundColor = style.getPropertyValue('--color2');
            //console.log(i % 12);
            if (i % 12 == 11) {
                cells[i].style.borderRight = "beige 0.5vw solid";
            }
            if (i % 12 == 0) {
                cells[i].style.borderLeft = "beige 0.5vw solid";
            }
            if (i < 12) {
                cells[i].style.borderTop = "beige 0.5vw solid";
            }
            if (i > 131) {
                cells[i].style.borderBottom = "beige 0.5vw solid";
            }

            if (data[i - 1] == 0) {
                cells[i].style.borderLeft = "beige 0.5vw solid";
            }
            if (data[i + 1] == 0) {
                cells[i].style.borderRight = "beige 0.5vw solid";
            }
            if (data[i - 12] == 0) {
                cells[i].style.borderTop = "beige 0.5vw solid";
            }
            if (data[i + 12] == 0) {
                cells[i].style.borderBottom = "beige 0.5vw solid";
            }
        } else if (data[i] == 2) {
            cells[i].style.backgroundColor = style.getPropertyValue('--color-water');
            if (data[i - 12] != 2) {
                //cells[i].style.borderTop = "solid 5px #63562b"
            }
        }
    }

    updateEntities();

    window.localStorage.setItem('courseData', JSON.stringify(courseData));
}

//Updates ball, hold, & bumpers
function updateEntities() {
    updateBumpers();
    updateHole();
    updateBall();
}

function updateHole() {
    hole.style.left = `${courseData.hole.x}%`;
    hole.style.top = `${courseData.hole.y}%`;
}

function updateBall() {
    ball.style.left = `${courseData.ballStart.x}%`;
    ball.style.top = `${courseData.ballStart.y}%`;
}

function resetData() {
    if (confirm("Are you sure you would like to restart?")) {
        window.localStorage.setItem('courseData', null);
        window.location.reload();
    }
}

window.addEventListener("resize", () => {
    window.location.reload();
});

function setBrushType(num) {
    brushType = num;
    for (var i = 0; i < brushIcons.length; i++) {
        brushIcons[i].style.backgroundColor = "transparent";
    }
    brushIcons[num].style.setProperty("background-color", "rgba(255, 136, 0, 0.877)", "important");
}

function updateBumpers() {
    const bumpers = document.querySelectorAll(".bumper");
    bumpers.forEach(entity => {
        entity.remove();
    });
    for (var i = 0; i < courseData.bumperData.length; i++) {
        var temp = document.createElement("div");
        courseContainer.appendChild(temp);
        temp.className = "bumper";
        temp.id = courseData.bumperData[i].id;
        temp.style.left = `${(courseData.bumperData[i].x)}%`;
        temp.style.top = `${(courseData.bumperData[i].y)}%`;
    }
}

//Not used
function setBumper(id, mouseX, mouseY) {
    courseData.bumperData[id].x = mouseX;
    courseData.bumperData[id].y = mouseY;
}

function undo() {
    if (courseData.bumperData.length != 0) {
        if (confirm("Undo last bumper?"))
            courseData.bumperData.pop();
        updateBumpers();
    } else {
        alert("No bumpers to undo!");
    }
}


// Saving courseDatas

const downloadButton = document.getElementById("save-button");

function saveJsonFile() {
    const tempcourseData = courseData;
    const text = JSON.stringify(tempcourseData);
    const name = prompt("Name the course...");
    const type = "application/json";

    // create courseData
    const a = document.createElement("a");
    const file = new Blob([text], { type: type });
    a.href = URL.createObjectURL(file);
    a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();
}

const fileSelector = document.getElementById("load-button");
fileSelector.addEventListener('change', (event) => {
    const reader = new FileReader();
    const file = reader.readAsText(event.target.files[0]);
    reader.onload = function () {
        console.log(reader.result);
        window.localStorage.setItem("courseData", reader.result);
        window.location.reload();
    }
});