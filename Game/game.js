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

const enemy = {
  x: 1200,
  y: groundLevel,
  width: 196,
  height: 196,
  limitRight: 1400,
  limitLeft: 1100,
  velocity: 2,
  visible: true,
  pressKey: 0,
  pressN: true,
};

const finalEnemy = {
  x: 1200,
  y: groundLevel - 10,
  width: 196,
  height: 196,
  speed: 2,
  active: false,
  visible: true,
  pressKey: 0,
  pressN: true,
  hitsToKill: 5,
};

let platformX = 500;
let platformY = 500;
let platformWidth = 500;
let platformHeight = 150;
let isPotionVisible = true;
let potionCount = 3;
let currentLevel = 1;

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
  KeyM: false,
};

const levelBackgrounds = {
  1: "../assets/images/stage.jpg",
  2: "../assets/images/stage-level2.png",
  3: "../assets/images/level3.png",
};

let currentBackground = document.createElement("img");
currentBackground.src = levelBackgrounds[currentLevel];

function drawEscenary() {
  context.drawImage(currentBackground, 0, 0, canvas.width, canvas.height);
}

function drawHealthBar() {
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

  if (playerHealth > 60) {
    context.fillStyle = "green";
  } else if (playerHealth > 30) {
    context.fillStyle = "yellow";
  } else {
    context.fillStyle = "red";
  }

  context.fillRect(healthBarX, healthBarY, currentHealthWidth, healthBarHeight);
}

function countPotions() {
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
}

function jump() {
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
}

function drawEnemy() {
  const enemyImg = document.createElement("img");
  enemyImg.src = "../assets/images/enemy.png";

  if (!enemy.visible) {
    return;
  }

  context.drawImage(enemyImg, enemy.x, enemy.y, enemy.width, enemy.height);

  enemy.x += enemy.velocity;

  if (enemy.x > enemy.limitRight) {
    enemy.x = enemy.limitRight;
    enemy.velocity = -enemy.velocity;
  }

  if (enemy.x < enemy.limitLeft) {
    enemy.x = enemy.limitLeft;
    enemy.velocity = -enemy.velocity;
  }
}

function attackEnemy() {
  const numberOfTimes = 3;

  if (!enemy.visible) {
    return;
  }

  if (
    player.x < enemy.x + enemy.width &&
    player.x + player.width > enemy.x &&
    player.y < enemy.y + enemy.height &&
    player.y + player.height > enemy.y
  ) {
    player.x = enemy.x - enemy.width;

    if (!keys.KeyN && canTakeDamage) {
      playerHealth -= damageEnemy;
      if (playerHealth < 0) {
        playerHealth = 0;
      }
      canTakeDamage = false;
      setTimeout(() => {
        canTakeDamage = true;
      }, damageCooldown);
    }

    if (keys.KeyN && enemy.pressN) {
      enemy.pressKey++;
      enemy.pressN = false;
    }

    if (enemy.pressKey === numberOfTimes) {
      enemy.visible = false;
      enemy.pressKey = 0;
    }
  }

  if (!keys.KeyN) {
    enemy.pressN = true;
  }
}

function platform() {
  const platform = document.createElement("img");
  platform.src = "../assets/images/platform.png";
  const range = 150;
  const PLATFORM_OFFSET_Y = 98;

  context.drawImage(platform, platformX, platformY, platformWidth, platformHeight);

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
}

function collectPotions() {
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
}

function changeLevel() {
  playerHealth = maxHealth;
  currentLevel++;

  player.x = 0;
  player.y = groundLevel;

  enemy.visible = true;
  isPotionVisible = true;

  currentBackground.src = levelBackgrounds[currentLevel] || levelBackgrounds[1];

  if (currentLevel === 2) {
    isPotionVisible = false;
    enemy.x = 650;
    enemy.y = 410;
    enemy.velocity = 1;
    enemy.limitLeft = 640;
    enemy.limitRight = 700;
  }

  if (currentLevel === 3) {
    enemy.visible = false;
    isPotionVisible = false;
    platformX = 0;
    platformY = 0;
    platformWidth = 0;
    platformHeight = 0;
  }
}

function newPlatform() {
  const newPlatform = document.createElement("img");
  newPlatform.src = "../assets/images/platform.png";
  let newPlatformX = 900;
  let newPlatformY = 300;
  const newPlatformWidth = 500;
  const newPlatformHeight = 500;
  const range = 155;
  const PLATFORM_OFFSET_Y = 98;

  context.drawImage(newPlatform, newPlatformX, newPlatformY, newPlatformWidth, platformHeight);

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
}

function drawFinalEnemy() {
  const enemyImg = document.createElement("img");
  enemyImg.src = "../assets/images/final-enemy.png";

  if (!finalEnemy.visible) {
    return;
  }

  context.drawImage(enemyImg, finalEnemy.x, finalEnemy.y, finalEnemy.width, finalEnemy.height);

  const distance = Math.abs(player.x - finalEnemy.x);

  if (distance < 800) {
    finalEnemy.active = true;
  }

  if (finalEnemy.active) {
    if (player.x > finalEnemy.x) {
      finalEnemy.x += finalEnemy.speed;
    } else if (player.x < finalEnemy.x) {
      finalEnemy.x -= finalEnemy.speed;
    }
  }

  if (finalEnemy.x < 0) {
    finalEnemy.x = 0;
  }

  if (finalEnemy.x + finalEnemy.width > canvas.width) {
    finalEnemy.x = canvas.width - finalEnemy.width;
  }
}

function attackFinalEnemy() {
  if (!finalEnemy.visible) {
    return;
  }

  if (
    player.x < finalEnemy.x + finalEnemy.width &&
    player.x + player.width > finalEnemy.x &&
    player.y < finalEnemy.y + finalEnemy.height &&
    player.y + player.height > finalEnemy.y
  ) {
    if (player.x < finalEnemy.x) {
      player.x = finalEnemy.x - player.width;
    } else {
      player.x = finalEnemy.x + finalEnemy.width;
    }

    if (!keys.KeyN && canTakeDamage) {
      playerHealth -= damageFinalEnemy;
      if (playerHealth < 0) {
        playerHealth = 0;
      }
      canTakeDamage = false;
      setTimeout(() => {
        canTakeDamage = true;
      }, damageCooldown);
    }

    if (keys.KeyN && finalEnemy.pressN) {
      finalEnemy.pressKey++;
      finalEnemy.pressN = false;
    }

    if (finalEnemy.pressKey === finalEnemy.hitsToKill) {
      finalEnemy.visible = false;
      finalEnemy.pressKey = 0;
    }
  }

  if (!keys.KeyN) {
    finalEnemy.pressN = true;
  }
}

function healWithPotion() {
  if (keys.KeyM && potionCount > 0 && playerHealth < maxHealth) {
    playerHealth += healAmount;
    potionCount--;
    if (playerHealth > maxHealth) {
      playerHealth = maxHealth;
    }
    keys.KeyM = false;
  }
}

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
    drawFinalEnemy();
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
