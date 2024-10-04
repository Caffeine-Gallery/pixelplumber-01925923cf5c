import { backend } from 'declarations/backend';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const GROUND_Y = 400;
const GRAVITY = 0.5;
const JUMP_STRENGTH = -10;

let mario = {
    x: 50,
    y: GROUND_Y,
    width: 40,
    height: 60,
    velocityY: 0,
    speed: 5,
    jumping: false
};

let gameLoop;
let leftPressed = false;
let rightPressed = false;

function drawMario() {
    ctx.fillStyle = 'red';
    ctx.fillRect(mario.x, mario.y, mario.width, mario.height);
}

function drawGround() {
    ctx.fillStyle = 'green';
    ctx.fillRect(0, GROUND_Y + mario.height, canvas.width, canvas.height - GROUND_Y);
}

function updateMario() {
    if (leftPressed) {
        mario.x -= mario.speed;
    }
    if (rightPressed) {
        mario.x += mario.speed;
    }

    mario.velocityY += GRAVITY;
    mario.y += mario.velocityY;

    if (mario.y > GROUND_Y) {
        mario.y = GROUND_Y;
        mario.velocityY = 0;
        mario.jumping = false;
    }

    if (mario.x < 0) mario.x = 0;
    if (mario.x + mario.width > canvas.width) mario.x = canvas.width - mario.width;
}

function gameUpdate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGround();
    updateMario();
    drawMario();
}

function startGame() {
    if (!gameLoop) {
        gameLoop = setInterval(gameUpdate, 1000 / 60);
    }
}

function jump() {
    if (!mario.jumping) {
        mario.velocityY = JUMP_STRENGTH;
        mario.jumping = true;
    }
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') leftPressed = true;
    if (e.key === 'ArrowRight') rightPressed = true;
    if (e.key === 'ArrowUp') jump();
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowLeft') leftPressed = false;
    if (e.key === 'ArrowRight') rightPressed = false;
});

document.getElementById('leftBtn').addEventListener('mousedown', () => leftPressed = true);
document.getElementById('leftBtn').addEventListener('mouseup', () => leftPressed = false);
document.getElementById('rightBtn').addEventListener('mousedown', () => rightPressed = true);
document.getElementById('rightBtn').addEventListener('mouseup', () => rightPressed = false);
document.getElementById('jumpBtn').addEventListener('click', jump);

window.onload = async () => {
    const greeting = await backend.greet("Player");
    console.log(greeting);
    startGame();
};
