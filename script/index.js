const buttonStart = document.querySelector(".start-button");
buttonStart.addEventListener("click", () => {
  window.location.href = "game.html";
});

document.addEventListener("DOMContentLoaded", () => {
  const optionsButton = document.querySelector(".options-button");
  const modal = document.querySelector(".options-modal");
  const closeButton = document.querySelector(".close-btn");

  const soundBtn = document.querySelector(".sound-btn");
  const controlsButton = document.querySelector(".controls-btn");
  const soundSettings = document.querySelector(".sound-settings");
  const controlsSettings = document.querySelector(".controls-settings");

  const volumeSlider = document.querySelector(".volume-slider");

  const controlInputs = document.querySelectorAll(
    ".controls-settings .control-input"
  );
  const saveControlsBtn = document.querySelector(".save-controls-btn");

  const controls = {
    jump: "SPACE",
    potion: "E",
    attack: "F",
  };

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

  // Ajustar volumen
  volumeSlider.addEventListener("input", (e) => {
    console.log("Volumen:", e.target.value);
  });

  saveControlsBtn.addEventListener("click", () => {
    controls.jump = controlInputs[0].value.toUpperCase() || "SPACE";
    controls.potion = controlInputs[1].value.toUpperCase() || "E";
    controls.attack = controlInputs[2].value.toUpperCase() || "F";
  });
  
});
