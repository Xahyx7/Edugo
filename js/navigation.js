const screenContainer = document.getElementById("screen-container");

function loadScreen(screen) {
  if (screen === "home") {
    loadHome();
    setTimeout(updateDashboard, 50);
  } else if (screen === "timer") {
    loadTimer();
  } else if (screen === "goals") {
    loadGoals();
  } else {
    screenContainer.innerHTML = `<p>Coming soon</p>`;
  }
}

document.querySelectorAll(".bottom-nav button").forEach(btn => {
  btn.onclick = () => loadScreen(btn.dataset.screen);
});

loadScreen("home");
