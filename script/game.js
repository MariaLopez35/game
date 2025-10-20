const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

let x = 0;
let y = 0;
const size = 100;
const speed = 5;

const keys = {};

// Crear la imagen del sprite
const sprite = new Image();
sprite.src = "../assets/images/sprites-geralt.png"; 

function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);  
  context.drawImage(sprite, x, y, size, size);
}

function update() {
  if (keys["ArrowRight"]) x += speed;
  if (keys["ArrowLeft"]) x -= speed;

  draw();
  requestAnimationFrame(update);
}

window.addEventListener("keydown", (e) => {
  keys[e.key] = true;
});

window.addEventListener("keyup", (e) => {
  keys[e.key] = false;
});

draw();
update();
