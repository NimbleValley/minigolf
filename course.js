var cells = document.getElementsByTagName('td');
var style = getComputedStyle(document.body);

//const tester = document.getElementById("tester");

const courseContainer = document.getElementById("course-container");

var width = window.innerWidth;
var height = window.innerHeight;

var courseData;
var wallData = [];
var bumperElements = [];

var holes = [];

const showHitboxes = false;

var courseNumber = localStorage.getItem("courseNumber");
console.log(courseNumber);

for (var i = 0; i < 5; i++) {
    fetch(`Course${courseNumber}Hole${i+1}.json`)
        .then(Response => Response.json())
        .then(data => {
            holes.push(data);
            courseData = holes[0];
            updateTiles(courseData.tileData);
            getBounds();
        });
}

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
        bumperElements = [];
    });
    for (var i = 0; i < courseData.bumperData.length; i++) {
        var temp = document.createElement("div");
        temp.className = "bumper";
        temp.id = courseData.bumperData[i].id;
        temp.style.left = `${(courseData.bumperData[i].x)}%`;
        temp.style.top = `${(courseData.bumperData[i].y)}%`;
        temp.style.scale = 1;
        courseContainer.appendChild(temp);
        bumperElements.push(temp);
    }
}

function getBounds() {
    wallData = [];
    var leftWalls = [];
    var rightWalls = [];
    var topWalls = [];
    var bottomWalls = [];
    for (var i = 0; i < cells.length; i++) {
        if (showHitboxes) {
            cells[i].style.outline = "black 0.01vw solid";
        }
        if (courseData.tileData[i] == 1) {
            if (courseData.tileData[i - 1] == 0) {
                var temp = {
                    x: (i % 12) / 12 * (height * (9 / 10)),
                    y: ((i - i % 12) / 12) / 12 * (height * (9 / 10))
                }
                /*tester.style.left = ((i%12)/12 * (height * (9/10))) + "px";
                tester.style.top = ((i - i%12)/12)/12 * (height * (9/10)) + "px";*/

                if (showHitboxes) {
                    test = document.createElement("div");
                    test.className = "tester";
                    test.style = `
                    position: absolute;
                    width: 1vw;
                    height: 5vh;
                    background-color: red;
                    margin: 0;
                    left: ${(i % 12) / 12 * (height * (9 / 10))}px;
                    top: ${((i - i % 12) / 12) / 12 * (height * (9 / 10))}px;
                    padding: 0;`
                    courseContainer.appendChild(test);
                }

                leftWalls.push(temp);
            }

            if (courseData.tileData[i + 1] == 0) {
                var temp = {
                    x: (i % 12 + 0.65) / 12 * (height * (9 / 10)),
                    y: ((i - i % 12) / 12 + 0) / 12 * (height * (9 / 10))
                }

                if (showHitboxes) {
                    test = document.createElement("div");
                    test.className = "tester";
                    test.style = `
                    position: absolute;
                    width: 1vw;
                    height: 5vh;
                    background-color: orange;
                    margin: 0;
                    left: ${(i % 12 + 1) / 12 * (height * (9 / 10))}px;
                    top: ${((i - i % 12) / 12 + 0) / 12 * (height * (9 / 10))}px;
                    padding: 0;`
                    courseContainer.appendChild(test);
                }

                rightWalls.push(temp);
            }

            if (courseData.tileData[i - 12] == 0) {
                var temp = {
                    x: ((i % 12) - 0.125) / 12 * (height * (9 / 10)),
                    y: ((i - i % 12) / 12) / 12 * (height * (9 / 10))
                }

                topWalls.push(temp);
            }

            if (courseData.tileData[i + 12] == 0) {
                var temp = {
                    x: ((i % 12) - 0.125) / 12 * (height * (9 / 10)),
                    y: ((i - i % 12) / 12) / 12 * (height * (9 / 10)) + (height * 9 / 10 / 12)
                }

                if (showHitboxes) {
                    test = document.createElement("div");
                    test.className = "tester";
                    test.style = `
                    position: absolute;
                    width: 5vh;
                    height: 1vw;
                    background-color: cyan;
                    margin: 0;
                    left: ${(i % 12) / 12 * (height * (9 / 10))}px;
                    top: ${((i - i % 12) / 12) / 12 * (height * (9 / 10)) + (height * 9 / 10 / 12)}px;
                    padding: 0;`
                    courseContainer.appendChild(test);
                }

                bottomWalls.push(temp);
            }
        }
    }

    wallData.push(leftWalls);
    wallData.push(rightWalls);
    wallData.push(topWalls);
    wallData.push(bottomWalls);
}