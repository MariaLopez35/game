const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const playerWidth = 192;
const playerHeight = 192;
const playerSpeed = 5;
const groundOffset = 120;
const groundLevel = canvas.height - playerHeight - groundOffset;
let playerX = 0;
let playerY = groundLevel;
let velocityY = 0;
const gravity = 0.8;
const jumpSpeed = -20;
let isOnGround = false;
let enemyX = 1200;
let enemyY = groundLevel;
const enemyWidth = 196;
const enemyHeight = 196;
const limitRight = 1400;
const limitLeft = 1100;
let velocity = 2;
let pressKey = 0;
let isVisible = true;
let pressN = true;

const keys = {
  ArrowRight: false,
  ArrowLeft: false,
  Space: false,
  KeyN: false,
};

const healthBar = () => {
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
};

const countPotions = () => {
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
};

const jump = () => {
  if (isOnGround && keys.Space) {
    velocityY = jumpSpeed;
    isOnGround = false;
  }

  velocityY += gravity;
  playerY += velocityY;

  if (playerY > groundLevel) {
    playerY = groundLevel;
    velocityY = 0;
    isOnGround = true;
  }
};

const drawFloor = () => {
  let floorX = 0;
  let floorY = 0;
  const floorSizeX = canvas.width;
  const floorSizeY = canvas.height;
  const floor = document.createElement("img");
  floor.src = "../assets/images/escenario.jpg";
  context.drawImage(floor, floorX, floorY, floorSizeX, floorSizeY);
};

const drawEnemy = () => {
  const enemy = document.createElement("img");
  enemy.src = "../assets/images/enemy.png";

  if (isVisible) {
    context.drawImage(enemy, enemyX, enemyY, enemyWidth, enemyHeight);
  } else {
    return;
  }

  enemyX += velocity;

  if (enemyX > limitRight) {
    enemyX = limitRight;
    velocity = -velocity;
  }

  if (enemyX < limitLeft) {
    enemyX = limitLeft;
    velocity = -velocity;
  }
};

const collision = () => {
  // Los IF siempre con {}
  if (!isVisible){
    return;
  } 

  if (
    playerX < enemyX + enemyWidth &&
    playerX + playerWidth > enemyX &&
    playerY < enemyY + enemyHeight &&
    playerX + playerHeight > enemyY
  ) {
    playerX = enemyX - enemyWidth;

    if (keys.KeyN && pressN) {
      pressKey++;
      pressN = false;
    }
// Magic Number
    if (pressKey === 3) {
      isVisible = false;
      pressKey = 0;
    }
  }

  if (!keys.KeyN) {
    pressN = true;
  }
};

const platform = () =>{

  const platform = document.createElement("img");
// Imagenes en ingles
  platform.src = "../assets/images/plataforma.png";
  
}

function update() {
  const sprite = document.createElement("img");
  sprite.src = "../assets/images/sprite-geralt.png";

  if (keys.ArrowRight) {
    playerX += playerSpeed;
  }
  if (keys.ArrowLeft) {
    playerX -= playerSpeed;
  }

  jump();

  context.clearRect(0, 0, canvas.width, canvas.height);
  drawFloor();
  healthBar();
  countPotions();
  drawEnemy();
  collision();
  context.drawImage(sprite, playerX, playerY, playerWidth, playerHeight);

  requestAnimationFrame(update);
}

window.addEventListener("keydown", (event) => {

 //  keys[event.code] === true

  if (event.code === "ArrowRight") {
    keys.ArrowRight = true;
  }

  if (event.code === "ArrowLeft") {
    keys.ArrowLeft = true;
  }

  if (event.code === "Space") {
    keys.Space = true;
  }
  if (event.code === "KeyN") {
    keys.KeyN = true;
  }
});

window.addEventListener("keyup", (event) => {
  //  keys[event.code] === true
  if (event.code === "ArrowRight") {
    keys.ArrowRight = false;
  }

  if (event.code === "ArrowLeft") {
    keys.ArrowLeft = false;
  }

  if (event.code === "Space") {
    keys.Space = false;
  }
  if (event.code === "KeyN") {
    keys.KeyN = false;
  }
});

update();
