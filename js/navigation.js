document.addEventListener("DOMContentLoaded", () => {
  const screenContainer = document.getElementById("screen-container");

  function loadScreen(screen) {
    console.log("Loading screen:", screen);

    if (screen === "home") {
      loadHome();
      setTimeout(() => {
        if (typeof updateDashboard === "function") {
          updateDashboard();
        }
      }, 50);
    }
    else if (screen === "timer") {
      loadTimer();
    }
    else if (screen === "goals") {
      if (typeof loadGoals === "function") {
        loadGoals();
      } else {
        alert("loadGoals is NOT defined");
      }
    }
    else {
      screenContainer.innerHTML = "<p>Coming soon</p>";
    }
  }

  document.querySelectorAll(".bottom-nav button").forEach(btn => {
    btn.addEventListener("click", () => {
      const screen = btn.dataset.screen;
      loadScreen(screen);
    });
  });

  loadScreen("home");
});
