const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let playerX = 0;
let playerY = 700;
const playerSize = 192;
const playerSpeed = 5;

const keys = {
  ArrowRight: false,
  ArrowLeft: false,
};

const sprite = document.createElement("img");
sprite.src = "../assets/images/sprite-geralt.png";

function healthBar() {
  let healthBarX = 1690;
  let healthBarY = 30;
  const healthBarWidth = 200;
  const healthBarHeight = 10;
  let heartX = 1658;
  let heartY = 22;
  const heartSize = 25;
  const heart = document.createElement("img");
  heart.src = "../assets/images/corazon.png";

  context.drawImage(heart, heartX, heartY, heartSize, heartSize);
  context.fillStyle = "green";
  context.fillRect(healthBarX, healthBarY, healthBarWidth, healthBarHeight);
}

function countPotions() {
  let potionsX = 1790;
  let potionsY = 60;
  const potionsSize = 50;
  let potionCount = 3;
  const padding = 12;
  const potions = document.createElement("img");
  potions.src = "../assets/images/pocion.png";
  context.drawImage(potions, potionsX, potionsY, potionsSize, potionsSize);

  context.font = "30px Arial";
  context.fillStyle = "white";
  context.fillText(
    "x" + potionCount,
    potionsX + potionsSize,
    potionsY + potionsSize - padding
  );
}

function update() {
  if (keys.ArrowRight) {
    playerX += playerSpeed;
  }
  if (keys.ArrowLeft) {
    playerX -= playerSpeed;
  }

  context.clearRect(0, 0, canvas.width, canvas.height);
  healthBar();
  countPotions();
  context.drawImage(sprite, playerX, playerY, playerSize, playerSize);
  requestAnimationFrame(update);
}

window.addEventListener("keydown", (event) => {
  keys[event.key] = true;
});

window.addEventListener("keyup", (event) => {
  keys[event.key] = false;
});

update();
