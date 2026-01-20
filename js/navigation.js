const screenContainer = document.getElementById("screen-container");

function loadScreen(screen) {
  if (screen === "home") {
    loadHome();
    setTimeout(updateDashboard, 50);
  } else {
    screenContainer.innerHTML = `
      <div class="fade-in" style="padding:20px">
        <h2>${screen.toUpperCase()}</h2>
        <p>Screen coming soon</p>
      </div>
    `;
  }
}

document.querySelectorAll(".bottom-nav button").forEach(btn => {
  btn.addEventListener("click", () => {
    loadScreen(btn.dataset.screen);
  });
});

// Default screen
loadScreen("home");
