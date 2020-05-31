// Cucumber Dance
const cucumber = document.querySelector('#cucumber');
const cucumberBox = cucumber.getBoundingClientRect();
let counter = 0;
let rate = 8;
const maxWidth = document.body.clientWidth - cucumberBox.width;
const minWidth = 0;
let isPaused = false;
function loop() {
  if (isPaused === true) {
    return;
  }
  // animate a cucumber!
  counter += rate;
  cucumber.style.left = counter;
  cucumber.style.top = Math.cos(counter * 0.02) * 100;
  if (counter > maxWidth || counter < minWidth) {
    rate *= -1;
  }
  requestAnimationFrame(loop);
}

function start() {
  // set stuff up here
  loop();
}

start();
