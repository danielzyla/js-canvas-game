const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const cw = canvas.width = 1080;
const ch = canvas.height = 768;

canvas.style.outlineWidth = "10px";
canvas.style.outlineColor = "#777";
canvas.style.outlineStyle = "solid";
canvas.style.outlineOffset = "1px"

function table() {
    ctx.fillStyle = "#2b2b2b";
    ctx.fillRect(0, 0, cw, ch);
}

const ballRadius = 12;
let ballX = cw / 2 - ballRadius / 2;
let ballY = ch / 2 - ballRadius / 2;
let ballSpeedX = 4;
let ballSpeedY = -4;
const playerWidth = 200;
const playerHeight = 40;
let playerX = cw / 2 - playerWidth / 2;
const playerY = ch / 1.1;

function ball() {
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.moveTo(50, 50);
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2, true);
    ctx.fill();
    ballX += ballSpeedX;
    ballY += ballSpeedY;


    if (ballY <= 0 + ballRadius / 2 || ballY + ballRadius >= ch) {
        ballSpeedY = -ballSpeedY;
    }

    if (ballX <= 0 + ballRadius / 2 || ballX + ballRadius >= cw) {
        ballSpeedX = -ballSpeedX;
    }

    if (isRectCirleColliding() && ballY < playerY) {
        ballSpeedY = -ballSpeedY;
    }

    if (isRectCirleColliding() && ballY > playerY + playerHeight) {
        ballSpeedY = -ballSpeedY;
    }

    if (isRectCirleColliding() && ballX < playerX) {
        ballSpeedX = -ballSpeedX;
    }

    if (isRectCirleColliding() && ballX > playerX + playerWidth) {
        ballSpeedX = -ballSpeedX;
    }
}

function player() {
    ctx.fillStyle = "#7FFF00";
    ctx.fillRect(playerX, playerY, playerWidth, playerHeight);
}

canvas.addEventListener("mousemove", (e) => {
    if (e.clientX - canvas.offsetLeft < playerWidth / 2) {
        playerX = 0;
    } else if (e.clientX - canvas.offsetLeft > cw - playerWidth / 2) {
        playerX = cw - playerWidth;
    } else playerX = e.clientX - canvas.offsetLeft - playerWidth / 2;
})

function isRectCirleColliding() {
    let tempX = ballX;
    let tempY = ballY;

    if (ballX < playerX) tempX = playerX;
    if (ballX > playerX + playerWidth) tempX = playerX + playerWidth;
    if (ballY < playerY ) tempY = playerY;
    if (ballY > playerY + playerHeight) tempY = playerY + playerHeight;

    let distX = ballX - tempX;
    let distY = ballY - tempY;
    let distance = Math.sqrt((distX * distX) + (distY * distY));

    if (distance <= ballRadius) {
        return true;
    }
    return false;
}

function game() {
    table();
    ball();
    player();
    requestAnimationFrame(game);
}

game();