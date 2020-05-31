// Banana Dance

let banana = document.body.querySelector('#banana');
banana.style.position = 'absolute';
const bananaBox = banana.getBoundingClientRect();
const pos = {
  x: 0,
  y: 0,
};
let counter = 0;
let rate = 10;
const maxValue = document.body.clientWidth;
const minValue = 0 - bananaBox.width;
function loop() {
  counter += rate;
  if (counter > maxValue || counter < minValue) {
    rate *= -1;
  }
  pos.x = counter;
  pos.y = Math.sin(counter * 0.015) * 100;
  banana.style.left = `${pos.x}px`;
  banana.style.top = `${pos.y}px`;
  requestAnimationFrame(loop);
}

function start() {
  // initialize stuff
  loop();
}

start();

// 1) just loop + move accross horisontally
// 2) use Math.cos to make the movement more dancey
// 3) adjust the rate of the up/down movement
// 4) adjust the rate of the horisontal movement
// use descriptive vabiables
// 5) add a "bounds check" for the enge of the window
// 6) tweak the chack to create back and forth movement
// ) continue to *tune* movement
// check your work often with console.logs
// add escape key to pause animation
// change fruit
// use MDN as a guide to learning browser apis (animation commands)
// learn to use the terminal!
