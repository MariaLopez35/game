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
let limitRight = 1400;
let limitLeft = 1100;
let velocity = 2;
let platformX = 500;
let platformY = 500;
let platformWidth = 500;
let platformHeight = 150;
let pressKey = 0;
let isVisible = true;
let pressN = true;
let isPotionVisible = true;
let potionCount = 3;
let currentLevel = 1;
let enemyFinalX = 1200;
let enemyFinalY = groundLevel - 10;
const enemyFinalWidth = 196;
const enemyFinalHeight = 196;
let enemyFinalSpeed = 2;
let isEnemyFinalActive = false;
let isFinalEnemyVisible = true;
let pressKeyFinal = 0;
let pressNFinal = true;
const hitsToKillFinal = 5;
let playerHealth = 100;
const maxHealth = 100;
const damageEnemy = 10;
const damageFinalEnemy = 20;
const healAmount = 30;
let canTakeDamage = true;
const damageCooldown = 500;

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

  const currentHealthWidth = (playerHealth / maxHealth) * healthBarWidth;

  if (playerHealth > 60) context.fillStyle = "green";
  else if (playerHealth > 30) context.fillStyle = "yellow";
  else context.fillStyle = "red";

  context.fillRect(healthBarX, healthBarY, currentHealthWidth, healthBarHeight);
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

  if (currentLevel === 1) {
    floor.src = "../assets/images/stage.jpg";
  }
  if (currentLevel === 2) {
    floor.src = "../assets/images/stage-level2.png";
  }
  if (currentLevel === 3) {
    floor.src = "../assets/images/level3.png";
  }

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
    player.y + player.height > enemyY
  ) {
    player.x = enemyX - enemyWidth;

    if (!keys.KeyN && canTakeDamage) {
      playerHealth -= damageEnemy;
      if (playerHealth < 0) playerHealth = 0;
      canTakeDamage = false;
      setTimeout(() => (canTakeDamage = true), damageCooldown);
    }

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

const changeLevel = () => {
  playerHealth = maxHealth;
  currentLevel++;

  player.x = 0;
  player.y = groundLevel;

  isVisible = true;
  isPotionVisible = true;

  if (currentLevel === 2) {
    isPotionVisible = false;
    enemyX = 650;
    enemyY = 410;
    velocity = 1;
    limitLeft = 640;
    limitRight = 700;
  }

  if (currentLevel === 3) {
    isVisible = false;
    isPotionVisible = false;
    platformX = 0;
    platformY = 0;
    platformWidth = 0;
    platformHeight = 0;
  }
};

const newPlatform = () => {
  const newPlatform = document.createElement("img");
  newPlatform.src = "../assets/images/platform.png";
  let newPlatformX = 900;
  let newPlatformY = 300;
  const newPlatformWidth = 500;
  const newPlatformHeight = 500;
  const range = 155;
  const PLATFORM_OFFSET_Y = 98;

  context.drawImage(
    newPlatform,
    newPlatformX,
    newPlatformY,
    newPlatformWidth,
    platformHeight
  );

  if (
    player.x < newPlatformX + newPlatformWidth - range &&
    player.x + player.width - range > newPlatformX &&
    player.y + player.height > newPlatformY &&
    player.y + player.height < newPlatformY + newPlatformHeight &&
    velocityY >= 0
  ) {
    player.y = newPlatformY - player.height + PLATFORM_OFFSET_Y;
    velocityY = 0;
    isOnGround = true;
  }
};

const attackFinalEnemy = () => {
  if (!isFinalEnemyVisible) return;

  if (
    player.x < enemyFinalX + enemyFinalWidth &&
    player.x + player.width > enemyFinalX &&
    player.y < enemyFinalY + enemyFinalHeight &&
    player.y + player.height > enemyFinalY
  ) {
    if (player.x < enemyFinalX) {
      player.x = enemyFinalX - player.width;
    } else {
      player.x = enemyFinalX + enemyFinalWidth;
    }

    if (!keys.KeyN && canTakeDamage) {
      playerHealth -= damageFinalEnemy;
      if (playerHealth < 0) playerHealth = 0;
      canTakeDamage = false;
      setTimeout(() => (canTakeDamage = true), damageCooldown);
    }

    if (keys.KeyN && pressNFinal) {
      pressKeyFinal++;
      pressNFinal = false;
    }

    if (pressKeyFinal === hitsToKillFinal) {
      isFinalEnemyVisible = false;
      pressKeyFinal = 0;
    }
  }

  if (!keys.KeyN) {
    pressNFinal = true;
  }
};

const finalEnemy = () => {
  const enemyFinal = document.createElement("img");
  enemyFinal.src = "../assets/images/final-enemy.png";

  if (!isFinalEnemyVisible) {
    return;
  }

  context.drawImage(
    enemyFinal,
    enemyFinalX,
    enemyFinalY,
    enemyFinalWidth,
    enemyFinalHeight
  );

  const distance = Math.abs(player.x - enemyFinalX);

  if (distance < 800) {
    isEnemyFinalActive = true;
  }

  if (isEnemyFinalActive) {
    if (player.x > enemyFinalX) {
      enemyFinalX += enemyFinalSpeed;
    } else if (player.x < enemyFinalX) {
      enemyFinalX -= enemyFinalSpeed;
    }
  }

  if (enemyFinalX < 0) {
    enemyFinalX = 0;
  }
  if (enemyFinalX + enemyFinalWidth > canvas.width) {
    enemyFinalX = canvas.width - enemyFinalWidth;
  }
};

const healWithPotion = () => {
  if (keys.KeyM && potionCount > 0 && playerHealth < maxHealth) {
    playerHealth += healAmount;
    potionCount--;
    if (playerHealth > maxHealth) playerHealth = maxHealth;
    keys.KeyM = false;
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

  if (currentLevel === 2) {
    newPlatform();
  }
  collectPotions();
  drawHealthBar();
  countPotions();
  drawEnemy();
  if (currentLevel === 3) {
    finalEnemy();
  }
  attackEnemy();
  if (currentLevel === 3) {
    attackFinalEnemy();
  }
  context.drawImage(sprite, player.x, player.y, player.width, player.height);

  if (player.x + player.width > canvas.width) {
    changeLevel();
  }

  healWithPotion();

  requestAnimationFrame(update);
}

window.addEventListener("keydown", (event) => {
  keys[event.code] = true;
});

window.addEventListener("keyup", (event) => {
  keys[event.code] = false;
});

update();
