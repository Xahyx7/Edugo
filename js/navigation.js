const screenContainer = document.getElementById("screen-container");

function loadScreen(screen) {
  if (screen === "home") {
    loadHome();
    setTimeout(updateDashboard, 50);
  } 
  else if (screen === "timer") {
    loadTimer();
  } 
  else if (screen === "goals") {
    loadGoals();
  } 
  else {
    screenContainer.innerHTML = `
      <div class="fade-in" style="padding:20px">
        <h2>${screen}</h2>
        <p>Coming soon</p>
      </div>
    `;
  }
}

document.querySelectorAll(".bottom-nav button").forEach(btn => {
  btn.addEventListener("click", () => {
    const screen = btn.getAttribute("data-screen");
    loadScreen(screen);
  });
});

// Load default screen
loadScreen("home");
