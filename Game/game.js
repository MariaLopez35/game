const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let x = 0;
let y = 700;
const size = 192;
const speed = 5;

const keys = {
  ArrowRight: false,
  ArrowLeft: false
};

const sprite = document.createElement("img");
sprite.src = "../assets/images/sprite-geralt.png";

function update() {
  if (keys.ArrowRight) {
    x += speed;
  }
  if (keys.ArrowLeft) {
    x -= speed;
  }

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(sprite, x, y, size, size);
  requestAnimationFrame(update);
}

window.addEventListener("keydown", (event) => {
  keys[event.key] = true;
});

window.addEventListener("keyup", (event) => {
  keys[event.key] = false;
});

update();
