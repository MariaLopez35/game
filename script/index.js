// Botón Start
const buttonStart = document.querySelector(".start-button");
buttonStart.addEventListener("click", () => {
  window.location.href = "game.html";
});

document.addEventListener("DOMContentLoaded", () => {
  const optionsButton = document.querySelector(".options-button");
  const modal = document.querySelector(".options-modal");
  const closeButton = document.querySelector(".close-btn");

  const soundBtn = document.querySelector(".sound-btn");
  const controlsBtn = document.querySelector(".controls-btn");
  const soundSettings = document.querySelector(".sound-settings");
  const controlsSettings = document.querySelector(".controls-settings");

  const volumeSlider = document.querySelector(".volume-slider");

  const controlInputs = document.querySelectorAll(
    ".controls-settings .control-input"
  );
  const saveControlsBtn = document.querySelector(".save-controls-btn");

  let controls = {
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

  controlsBtn.addEventListener("click", () => {
    controlsSettings.classList.remove("hidden");
    soundSettings.classList.add("hidden");
  });

  // Ajustar volumen
  volumeSlider.addEventListener("input", (e) => {
    console.log("Volumen:", e.target.value);
    // Aquí puedes controlar tu audio real si lo agregas
  });

  // Guardar controles
  saveControlsBtn.addEventListener("click", () => {
    controls.jump = controlInputs[0].value.toUpperCase() || "SPACE";
    controls.potion = controlInputs[1].value.toUpperCase() || "E";
    controls.attack = controlInputs[2].value.toUpperCase() || "F";
  });

  // Listener de teclado para el juego
  document.addEventListener("keydown", (e) => {
    switch (e.key.toUpperCase()) {
      case controls.jump:
        break;
      case controls.potion:
        break;
      case controls.attack:
        break;
    }
  });
});
