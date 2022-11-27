const hitGuide = document.getElementById("hit-guide");
const ball = document.getElementById("ball");
const scorecard = document.getElementById("scorecard");
const scoreIcon = document.getElementById("score-icon");
const nextHole = document.getElementById("next-hole");

const tl = new TimelineMax();

nextHole.style.left = "-100vw";

var aiming = true;

var mouseX;
var mouseY;

var width = window.innerWidth;
var height = window.innerHeight;

hitGuide.style.width = "25%";
hitGuide.style.height = "1%";

var ballVelX = 0;
var ballVeyY = 0;

var ballSpeed = 0;

var ballX;
var ballY;
var ballY;
var rot;
var friction = 1.004;
var maxSpeed = 50;
var speedFactor = 100;

var onHole = 1;

var holeDone = false;

(function () {
    (function update() {
        width = window.innerWidth;
        height = window.innerHeight;

        if (aiming && !holeDone) {
            ballX = getIntFromPercent(ball.style.left);
            ballY = getIntFromPercent(ball.style.top);

            hitGuide.style.display = "block";
            hitGuide.style.left = ball.style.left;
            hitGuide.style.top = ball.style.top;

            var val = getIntFromPercent(hitGuide.style.width) / 200 * (height * (9 / 10));
            rot = Math.atan2((mouseY - getIntFromPercent(ball.style.top)), (mouseX - getIntFromPercent(ball.style.left)));

            ballSpeed = Math.sqrt(Math.pow(mouseY - getIntFromPercent(ball.style.top), 2) + Math.pow(mouseX - getIntFromPercent(ball.style.left), 2)) / (speedFactor);
            if (ballSpeed * speedFactor > maxSpeed) {
                ballSpeed = maxSpeed / speedFactor;
            }
            hitGuide.style.width = `${ballSpeed * 100}%`

            hitGuide.style.transform = `translate(${(val * -1) + (0.006 * width)}px, ${(0.004 * width)}px) rotate(${rot}rad) translate(${val}px)`;
        } else if (!holeDone) {
            ballX += ballVelX;
            ballY += ballVelY;

            ball.style.left = `${ballX}%`;
            ball.style.top = `${ballY}%`;

            ballVelX /= friction
            ballVelY /= friction;

            if (Math.abs(ballVelX) < 0.001 && Math.abs(ballVeyY) < 0.001) {
                aiming = true;
            }

            hitGuide.style.display = "none";

            for (var i = 0; i < wallData[0].length; i++) {
                if (Math.abs((ballX / 100 * (height * (9 / 10))) - wallData[0][i].x) < (width * 0.0025) && Math.abs((ballY / 100 * (height * (9 / 10))) - wallData[0][i].y) < ((height * (9 / 10)) / 12) && (ballY / 100 * (height * (9 / 10))) - wallData[0][i].y > 0) {
                    //LEFT
                    ballVelX = Math.abs(ballVelX) * 1;
                }
            }

            for (var i = 0; i < wallData[1].length; i++) {
                if (Math.abs(wallData[1][i].x - (ballX / 100 * (height * (9 / 10)))) < (width * 0.0025) && Math.abs((ballY / 100 * (height * (9 / 10))) - wallData[1][i].y) < ((height * (9 / 10)) / 12) && (ballY / 100 * (height * (9 / 10)) - wallData[1][i].y) > 0) {
                    //RIGHT
                    ballVelX = Math.abs(ballVelX) * -1;
                }
            }

            for (var i = 0; i < wallData[2].length; i++) {
                if (Math.abs((ballY / 100 * (height * (9 / 10))) - wallData[2][i].y) < (width * 0.0025) && Math.abs((ballX / 100 * (height * (9 / 10))) - wallData[2][i].x) < ((height * (9 / 10)) / 10) && (ballX / 100 * (height * (9 / 10))) - wallData[2][i].x > 0) {
                    //TOP
                    ballVelY = Math.abs(ballVelY) * 1;
                }
            }

            for (var i = 0; i < wallData[3].length; i++) {
                if (Math.abs(Math.abs((ballY / 100 * (height * (9 / 10))) - wallData[3][i].y + (height * 0.025))) < (width * 0.0025) && Math.abs((ballX / 100 * (height * (9 / 10))) - wallData[3][i].x) < ((height * (9 / 10)) / 10) && (ballX / 100 * (height * (9 / 10))) - wallData[3][i].x > 0) {
                    //BOTTOM
                    ballVelY = Math.abs(ballVelY) * -1;
                }
            }

            //Bumperss
            for (var i = 0; i < courseData.bumperData.length; i++) {
                if (Math.pow(((courseData.bumperData[i].x) / 100 * (height * 9 / 10)) - (ballX / 100 * (height * (9 / 10)) - (height * 0.0125)), 2) + Math.pow((courseData.bumperData[i].y / 100 * (height * 9 / 10)) - ((ballY / 100 * (height * (9 / 10))) - (height * 0.0125)), 2) < Math.pow((width * 0.0125) + (height * 0.0125), 2)) {
                    bumperElements[i].style.scale = 1.5;
                    rot = Math.atan2((courseData.bumperData[i].y / 100 * (height * 9 / 10)) - (ballY / 100 * (height * (9 / 10))), (courseData.bumperData[i].x / 100 * (height * 9 / 10)) - (ballX / 100 * (height * (9 / 10))));
                    console.log(rot);
                    ballVelX = maxSpeed / speedFactor * -1 * Math.cos(rot);
                    ballVelY = maxSpeed / speedFactor * -1 * Math.sin(rot);
                }

                if (bumperElements[i].style.scale > 1) {
                    bumperElements[i].style.scale /= 1.01;
                } else {
                    bumperElements[i].style.scale = 1;
                }
            }

            //Hole
            if (Math.pow(((courseData.hole.x) / 100 * (height * 9 / 10) - (width * 0.00095)) - (ballX / 100 * (height * (9 / 10)) - (height * 0.0125)), 2) + Math.pow(((courseData.hole.y / 100 * (height * 9 / 10)) - (width * 0.00095)) - ((ballY / 100 * (height * (9 / 10))) - (height * 0.0125)), 2) < Math.pow((width * 0.00095) + (height * 0.02), 2)) {
                console.log('y');
                ball.style.scale = 0.75;
                //ball.style.transform = `translate(${((courseData.hole.x) / 100 * (height * 9 / 10) - (width * 0.00095)) - (ballX / 100 * (height * (9 / 10)) - (height * 0.0125))}px)`;
                ballVelX = 0;
                ballVeyY = 0;
                ball.style.transition = "scale 0.5s, left 0.5s, top 0.5s";
                ball.style.left = (courseData.hole.x / 100 * (height * 9 / 10) - (width * 0.00095)) + (height * 0.01) + "px";
                ball.style.top = (courseData.hole.y / 100 * (height * 9 / 10) - (width * 0.00095)) + (height * 0.01) + "px";
                holeDone = true;
                startNextHole();
            }
        }

        setTimeout(update, 0);
    })();
})();

function getCursorPosition(event) {
    mouseX = (event.clientX - (width - (height * (9 / 10))) / 2) / (height * (9 / 10) / 100);
    mouseY = (event.clientY - (height * 5 / 100)) / (height * (9 / 10) / 100);
}

function getIntFromPercent(val) {
    var temp = val;
    temp = temp.replace(/%/g, '');
    return (parseFloat(temp));
}

function hitBall() {
    if (aiming) {
        aiming = false;
        ballVelX = ballSpeed * Math.cos(rot);
        ballVelY = ballSpeed * Math.sin(rot);
    }
}

function hideScorecard() {
    scorecard.style.transform = "translate(-100%)";
    scoreIcon.style.opacity = 1;
}

function showScorecard() {
    scorecard.style.transform = "translate(0)";
    scoreIcon.style.opacity = 0;
}

async function startNextHole() {
    onHole++;
    if (onHole < totalHoles + 1) {
        nextHole.innerText = `Hole ${onHole}/5`;
    } else {
        nextHole.innerText = "Nice Job!"
    }
    await sleep(1000);
    tl.fromTo(nextHole, 1, { left: "-100vw", opacity: 0 }, { left: 0, ease: Power2.easeOut, opacity: 1 });
    if (onHole < totalHoles + 1) {
        await sleep(1000);
        courseData = holes[onHole - 1];
        updateTiles(courseData.tileData);
        getBounds();
        holeDone = false;
        ball.style.transition = "scale 0.5s";
    } else {
        await sleep(3000);
        open("menu.html", "_self");
    }
    await sleep(1000);
    updateTiles(courseData.tileData);
    tl.fromTo(nextHole, 1, { left: 0, opacity: 1 }, { left: "100vw", ease: Power2.easeOut, opacity: 0 });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}