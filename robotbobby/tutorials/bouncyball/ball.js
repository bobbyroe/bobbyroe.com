const canvas = document.getElementById('stage');
canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;
const ctx = canvas.getContext('2d');

// offscreen canvas to draw orange
const offscreenCanvas = document.createElement('canvas');
const offscreenCanvasSize = 200;
offscreenCanvas.width = offscreenCanvas.height = offscreenCanvasSize;
const offscreenCtx = offscreenCanvas.getContext('2d');
offscreenCtx.font = '150px serif';
offscreenCtx.textAlign = 'center';
offscreenCtx.textBaseline = 'middle';
offscreenCtx.fillText('🍊', 100, 100);

let isDragging = false;
const radius = 60;
const pos = { x: 200, y: 200 };
let mousePos = {};

function loop() {
  requestAnimationFrame(loop);

  if (isDragging) {
    pos.x = mousePos.x;
    pos.y = mousePos.y;
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.translate(pos.x, pos.y);
  ctx.translate(-offscreenCanvasSize * 0.5, -offscreenCanvasSize * 0.5);
  ctx.drawImage(offscreenCanvas, 0, 0);
  ctx.setTransform(1, 0, 0, 1, 0, 0);
}
loop();
document.body.addEventListener(
  'pointerdown',
  (evt) => {
    const { x, y } = evt;
    const clickedDistance = (x - pos.x) ** 2 + (y - pos.y) ** 2;
    const isClicked = clickedDistance < radius ** 2;
    if (isClicked) {
      isDragging = true;
    }
    console.log(clickedDistance);
  },
  true
);
document.body.addEventListener('pointerup', (evt) => (isDragging = false), true);
document.body.addEventListener(
  'pointermove',
  (evt) => {
    const { x, y } = evt;
    mousePos = { x, y };
  },
  true
);
