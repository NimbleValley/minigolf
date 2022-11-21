var cells = document.getElementsByTagName('td');
var style = getComputedStyle(document.body);

const courseContainer = document.getElementById("course-container");

var width = window.innerWidth;
var height = window.innerHeight;

var courseData;

fetch("course-test.json")
    .then(Response => Response.json())
    .then(data => {
        courseData = data;
        updateTiles(data.tileData);
    });
    
function updateTiles(data) {
    //console.log(courseData.bumperData[0]);
    for (var i = 0; i < cells.length; i++) {
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
}

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
        temp.style.left = `${(courseData.bumperData[i].x) - ((width * 0.0125) / width) * 100}%`;
        temp.style.top = `${(courseData.bumperData[i].y) - ((width * 0.015) / width) * 100}%`;
    }
}