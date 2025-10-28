const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const player = {
  x: 0,
  y: 0,
  width: 192,
  height: 192,
};

const playerSpeed = 5;
const groundOffset = 120;
const groundLevel = canvas.height - player.height - groundOffset;
player.y = groundLevel;
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
let isPotionVisible = true;
let potionCount = 3;


const keys = {
  ArrowRight: false,
  ArrowLeft: false,
  Space: false,
  KeyN: false,
};

const drawHealthBar = () => {
  let healthBarX = 1690;
  let healthBarY = 30;
  const healthBarWidth = 200;
  const healthBarHeight = 10;
  let heartX = 1658;
  let heartY = 22;
  const heartSize = 25;
  const heart = document.createElement("img");
  heart.src = "../assets/images/heart.png";

  context.drawImage(heart, heartX, heartY, heartSize, heartSize);
  context.fillStyle = "green";
  context.fillRect(healthBarX, healthBarY, healthBarWidth, healthBarHeight);
};

const countPotions = () => {
  let potionsX = 1790;
  let potionsY = 60;
  const potionsSize = 50;
  const padding = 12;
  const potions = document.createElement("img");
  potions.src = "../assets/images/potion.png";
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
  player.y += velocityY;

  if (player.y > groundLevel) {
    player.y = groundLevel;
    velocityY = 0;
    isOnGround = true;
  }
};

const drawEscenary = () => {
  let floorX = 0;
  let floorY = 0;
  const floorSizeX = canvas.width;
  const floorSizeY = canvas.height;
  const floor = document.createElement("img");
  floor.src = "../assets/images/stage.jpg";
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

const attackEnemy = () => {
  const numberOfTimes = 3;

  if (!isVisible) {
    return;
  }

  if (
    player.x < enemyX + enemyWidth &&
    player.x + player.width > enemyX &&
    player.y < enemyY + enemyHeight &&
    player.x + player.height > enemyY
  ) {
    player.x = enemyX - enemyWidth;

    if (keys.KeyN && pressN) {
      pressKey++;
      pressN = false;
    }

    if (pressKey === numberOfTimes) {
      isVisible = false;
      pressKey = 0;
    }
  }

  if (!keys.KeyN) {
    pressN = true;
  }
};

const platform = () => {
  const platform = document.createElement("img");

  platform.src = "../assets/images/platform.png";

  let platformX = 500;
  let platformY = 500;
  const platformWidth = 500;
  const platformHeight = 150;
  const range = 150;
  const PLATFORM_OFFSET_Y = 98;

  context.drawImage(
    platform,
    platformX,
    platformY,
    platformWidth,
    platformHeight
  );

  if (
    player.x < platformX + platformWidth - range &&
    player.x + player.width - range > platformX &&
    player.y + player.height > platformY &&
    player.y + player.height < platformY + platformHeight &&
    velocityY >= 0
  ) {
    player.y = platformY - player.height + PLATFORM_OFFSET_Y;
    velocityY = 0;
    isOnGround = true;
  }
};

const collectPotions = () => {
  let potionsX = 780;
  let potionsY = 500;
  const potionsSize = 90;
  const potions = document.createElement("img");
  potions.src = "../assets/images/potion.png";

  if (isPotionVisible) {
    context.drawImage(potions, potionsX, potionsY, potionsSize, potionsSize);

    if (
      player.x < potionsX + potionsSize &&
      player.x + player.width > potionsX &&
      player.y < potionsY + potionsSize &&
      player.y + player.height > potionsY
    ) {
      isPotionVisible = false;
      potionCount++;
    }
  }
};

function update() {
  const sprite = document.createElement("img");
  sprite.src = "../assets/images/sprite-geralt.png";

  if (keys.ArrowRight) {
    player.x += playerSpeed;
  }
  if (keys.ArrowLeft) {
    player.x -= playerSpeed;
  }

  jump();

  context.clearRect(0, 0, canvas.width, canvas.height);
  drawEscenary();
  platform();
  collectPotions();
  drawHealthBar();
  countPotions();
  drawEnemy();
  attackEnemy();
  context.drawImage(sprite, player.x, player.y, player.width, player.height);

   if (player.x + player.width > canvas.width) {
    player.x = 0
  }

  requestAnimationFrame(update);
}

window.addEventListener("keydown", (event) => {
  keys[event.code] = true;
});

window.addEventListener("keyup", (event) => {
  keys[event.code] = false;
});

update();

