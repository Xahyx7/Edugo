// navigation.js
// Centralized, safe navigation handler

document.addEventListener("DOMContentLoaded", () => {
  const screenContainer = document.getElementById("screen-container");
  const navButtons = document.querySelectorAll(".bottom-nav button");

  // ---- helper: clear screen safely ----
  function clearScreen() {
    if (screenContainer) {
      screenContainer.innerHTML = "";
    }
  }

  // ---- helper: set active nav button ----
  function setActive(screen) {
    navButtons.forEach(btn => {
      btn.classList.toggle("active", btn.dataset.screen === screen);
    });
  }

  // ---- MAIN NAVIGATION FUNCTION ----
  window.loadScreen = function (screen) {
    if (!screenContainer) return;

    clearScreen();
    setActive(screen);

    switch (screen) {
      case "home":
        if (typeof loadHome === "function") {
          loadHome();
          // ensure dashboard numbers always refresh
          setTimeout(() => {
            if (typeof updateDashboard === "function") {
              updateDashboard();
            }
          }, 50);
        }
        break;

      case "timer":
        if (typeof loadTimer === "function") {
          loadTimer();
        }
        break;

      case "goals":
        if (typeof loadGoals === "function") {
          loadGoals();
        }
        break;

      case "stats":
        if (typeof loadStats === "function") {
          loadStats("daily");
        }
        break;

      default:
        screenContainer.innerHTML = `
          <div class="fade-in" style="padding:20px">
            <h2>Coming Soon</h2>
          </div>
        `;
    }
  };

  // ---- attach click listeners ----
  navButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const screen = btn.dataset.screen;
      if (screen) {
        loadScreen(screen);
      }
    });
  });

  // ---- initial load ----
  loadScreen("home");
});
