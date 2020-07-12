const canvas = document.getElementById('stage');
canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;
const ctx = canvas.getContext('2d');
// offscreen canvas
function fillBall() {
  offCtx.clearRect(0, 0, offscreen.width, offscreen.height);
  offCtx.fillText('🍊', 100, 100);
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
ctx.strokeStyle = '#FF0000';

const stageRect = canvas.getBoundingClientRect();
const pos = { x: stageRect.width * 0.5, y: stageRect.height * 0.5 };
const scale = { x: 1, y: 1 };
const velocityMult = 10;
const velocity = {
  x: 0, // Math.random() * velocityMult - velocityMult * 0.5,
  y: 0, // Math.random() * velocityMult - velocityMult * 0.5,
};
const radius = 60;
const gravity = 1.05;
let isDragging = false;
let isPaused = false;
let mousePos = {};
const drag = 0.99;
const goalScale = { x: 1, y: 1 };
const scaleFactor = { x: 1, y: 1 };
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

  ctx.fillStyle = 'rgba(0,0,0,0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  // ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'rgba(0,0,0,1)';
  ctx.translate(pos.x, pos.y);
  ctx.translate(-canvasSize * scale.x * 0.5, -canvasSize * scale.y * 0.5);
  ctx.drawImage(offscreen, 0, 0, canvasSize * scale.x, canvasSize * scale.y);
  ctx.setTransform(1, 0, 0, 1, 0, 0);

  // screen bounds
  const hasHitRightEdge = pos.x + velocity.x > stageRect.width - radius;
  if (hasHitRightEdge || pos.x + velocity.x < radius) {
    scaleFactor.x = Math.min(0.5, Math.max((Math.abs(velocity.x) - 15) * 0.05, 0));
    scale.y = 1 + scaleFactor.x;
    scale.x = 1 - scaleFactor.x;
    // reverse direction
    velocity.x *= -1;
  }
  const hasHitBottom = pos.y + velocity.y > stageRect.height - radius;
  if (hasHitBottom || pos.y + velocity.y < radius) {
    scaleFactor.y = Math.min(0.5, Math.max((Math.abs(velocity.y) - 15) * 0.05, 0));
    scale.y = 1 - scaleFactor.y;
    scale.x = 1 + scaleFactor.y;
    // reverse direction
    velocity.y *= -1;
  }

  // keep ball from sinking through floor
  if (!hasHitBottom) {
    velocity.y += gravity;
  }

  // const random = Math.random();
  // if (random < 0.05) {
  //   goalScale = Math.random() * 3 + 1;
  // }
  scale.x -= (scale.x - goalScale.x) * 0.3;
  scale.y -= (scale.y - goalScale.y) * 0.3;
}
// click and keyboard event listeners
document.body.addEventListener('keydown', (event) => {
  const { key } = event;
  if (key === 'Escape') {
    isPaused = !isPaused;
  }
});
document.body.addEventListener('mousedown', (event) => {
  const { x, y } = event;
  const clickedDistance = (x - pos.x) ** 2 + (y - pos.y) ** 2;
  const isClicked = clickedDistance < (radius * scale.x) ** 2;
  if (isClicked) {
    isPaused = false;
    isDragging = true;
  }
  ctx.fillStyle = 'yellow';
  ctx.fillRect(stageRect.width * 0.5, stageRect.height * 0.5, 50, 50);
  console.log('click');
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

// TODOs:
// add support for touch events
// add squash and stretch
// add painted walls marks
// adjustible params, gravity, noise, bounciness
// is this project about canvas drawing? or physics?
