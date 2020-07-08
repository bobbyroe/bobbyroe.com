const canvas = document.getElementById('stage');
canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;
const ctx = canvas.getContext('2d');
// offscreen canvas
const balls = ['🍊', '🤪', '🥶', '🕸', '🦴', '🌈'];
let ballIndex = 0;
function fillBall() {
  offCtx.clearRect(0, 0, offscreen.width, offscreen.height);
  offCtx.fillText(balls[ballIndex], 100, 100);
}
const offscreen = document.createElement('canvas');
const canvasSize = 200;
offscreen.width = canvasSize;
offscreen.height = canvasSize;
const offCtx = offscreen.getContext('2d');
offCtx.font = '150px serif';
offCtx.textAlign = 'center';
offCtx.textBaseline = 'middle';
fillBall();

const stageRect = canvas.getBoundingClientRect();
const pos = { x: stageRect.width * 0.5, y: stageRect.height * 0.5 };
const scale = { x: 1, y: 1 };
const velocityMult = 10;
const velocity = { x: Math.random() * velocityMult, y: Math.random() * velocityMult };
const radius = 60;
const gravity = 1.05;
let isDragging = false;
let isPaused = false;
let mousePos = {};
const drag = 0.999;
let goalScale = 1;
function loop() {
  requestAnimationFrame(loop);
  if (isPaused) {
    return;
  }
  if (isDragging) {
    // calculate velocity
    velocity.x = mousePos.x - pos.x;
    velocity.y = mousePos.y - pos.y;
    // set position
    pos.x = mousePos.x;
    pos.y = mousePos.y;
  } else {
    pos.x += velocity.x;
    pos.y += velocity.y;

    velocity.x *= drag;
    velocity.y *= drag;
  }

  ctx.fillStyle = 'rgba(0,0,0,0.001)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'rgba(0,0,0,1)';
  ctx.drawImage(offscreen, pos.x - 100, pos.y - 100, canvasSize * scale.x, canvasSize * scale.y);

  // screen bounds
  if (pos.x + velocity.x > stageRect.width - radius || pos.x + velocity.x < radius) {
    velocity.x *= -1;
  }
  const hasHitBottom = pos.y + velocity.y > stageRect.height - radius;
  if (hasHitBottom || pos.y + velocity.y < radius) {
    velocity.y *= -1;
  }

  // keep ball from sinking through floor
  if (!hasHitBottom) {
    velocity.y += gravity;
  }

  const random = Math.random();
  if (random < 0.05) {
    goalScale = Math.random() * 3 + 1;
  }
  scale.x -= (scale.x - goalScale) * 0.05;
  scale.y -= (scale.y - goalScale) * 0.05;
}
function incrementBallIndex() {
  ballIndex += 1;
  if (ballIndex >= balls.length) {
    ballIndex = 0;
  }
}
function decrementBallIndex() {
  ballIndex -= 1;
  if (ballIndex < 0) {
    ballIndex = balls.length - 1;
  }
}
// click and keyboard event listeners
document.body.addEventListener('keydown', (event) => {
  const { key } = event;
  if (key === 'Escape') {
    isPaused = !isPaused;
  }
  // change balls
  if (key === 'ArrowUp') {
    incrementBallIndex();
    fillBall();
  }
  if (key === 'ArrowDown') {
    decrementBallIndex();
    fillBall();
  }
});

document.body.addEventListener('mousedown', (event) => {
  const { x, y } = event;
  const clickedDistance = (x - pos.x) ** 2 + (y - pos.y) ** 2;
  const isClicked = clickedDistance < radius ** 2;
  if (isClicked) {
    isPaused = false;
    isDragging = true;
  }
  console.log(Math.sqrt(clickedDistance));
});

document.body.addEventListener('mouseup', (event) => {
  isDragging = false;
});

document.body.addEventListener('mousemove', (event) => {
  const { x, y } = event;
  mousePos = {
    x: x,
    y: y,
  };
});

// start!
loop();
