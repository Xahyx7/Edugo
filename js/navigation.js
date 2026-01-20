const screenContainer = document.getElementById("screen-container");

function loadScreen(name) {
  screenContainer.innerHTML = `<div class="fade-in">${name} screen coming soon</div>`;
}

document.querySelectorAll(".bottom-nav button").forEach(btn => {
  btn.addEventListener("click", () => {
    loadScreen(btn.dataset.screen);
  });
});

// Default screen
loadScreen("home");
