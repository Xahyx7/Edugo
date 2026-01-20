// navigation.js
// Handles bottom navigation safely

document.addEventListener("DOMContentLoaded", () => {
  const screenContainer = document.getElementById("screen-container");

  function loadScreen(screen) {
    if (!screenContainer) return;

    switch (screen) {
      case "home":
        if (typeof loadHome === "function") {
          loadHome();
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
  }

  // Attach click listeners to bottom nav buttons
  document.querySelectorAll(".bottom-nav button").forEach(button => {
    button.addEventListener("click", () => {
      const screen = button.getAttribute("data-screen");
      loadScreen(screen);
    });
  });

  // Load default screen
  loadScreen("home");
});
