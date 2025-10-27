const startButton = document.querySelector(".start-button");
startButton.addEventListener("click", () => {
  window.location.href = "../Game/game.html";
});

document.addEventListener("DOMContentLoaded", () => {
  const optionsButton = document.querySelector(".options-button");
  const modal = document.querySelector(".options-modal");
  const closeButton = document.querySelector(".close-btn");

  const soundBtn = document.querySelector(".sound-btn");
  const controlsButton = document.querySelector(".controls-btn");
  const soundSettings = document.querySelector(".sound-settings");
  const controlsSettings = document.querySelector(".controls-settings");

  const controlInputs = document.querySelectorAll(
    ".controls-settings .control-input"
  );
  const saveControlsBtn = document.querySelector(".save-controls-btn");

  const controls = {
    jump: "SPACE",
    potion: "G",
    attack: "H",
  };

  const jump = document.querySelector(".jump");
  const potion = document.querySelector(".potion");
  const attack = document.querySelector(".attack");

  jump.setAttribute("value", controls.jump);
  potion.setAttribute("value", controls.potion);
  attack.setAttribute("value", controls.attack);

  optionsButton.addEventListener("click", () => {
    modal.classList.remove("hidden");
  });

  closeButton.addEventListener("click", () => {
    modal.classList.add("hidden");
    soundSettings.classList.add("hidden");
    controlsSettings.classList.add("hidden");
  });

  soundBtn.addEventListener("click", () => {
    soundSettings.classList.remove("hidden");
    controlsSettings.classList.add("hidden");
  });

  controlsButton.addEventListener("click", () => {
    controlsSettings.classList.remove("hidden");
    soundSettings.classList.add("hidden");
  });

  saveControlsBtn.addEventListener("click", () => {
    controls.jump = controlInputs[0].value.toUpperCase() || controls.jump;
    controls.potion = controlInputs[1].value.toUpperCase() || controls.potion;
    controls.attack = controlInputs[2].value.toUpperCase() || controls.attack;
  });
});
