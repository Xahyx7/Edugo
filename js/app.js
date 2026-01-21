// ---- HARD SPLASH KILL (SAFE) ----
(function removeSplashSafely() {
  const splash = document.getElementById("splash");
  if (!splash) return;

  splash.style.opacity = "0";
  splash.style.pointerEvents = "none";

  setTimeout(() => {
    if (splash && splash.parentNode) {
      splash.parentNode.removeChild(splash);
    }
  }, 300);
})();


/* ===============================
   DASHBOARD UPDATE
================================ */

function updateDashboard() {
  const data = getData();
  const sec = Number(data.todaySeconds || 0);

  // ---- Text ----
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);

  const timeEl = document.getElementById("studiedTime");
  if (timeEl) timeEl.textContent = `${h}h ${m}m`;

  // ---- Ring ----
  const circle = document.getElementById("progressCircle");
  if (!circle) return;

  const radius = 70;
  const circumference = 2 * Math.PI * radius;

  // daily target = 5 hours (safe default)
  const dailyTargetSeconds = 5 * 3600;
  const progress = Math.min(sec / dailyTargetSeconds, 1);

  circle.style.strokeDasharray = `${circumference}`;
  circle.style.strokeDashoffset =
    `${circumference - progress * circumference}`;
}


/* ===============================
   GOALS – ADD / ACTIVATE / COMPLETE
================================ */

function showAddGoal() {
  const subject = prompt("Subject");
  const topic = prompt("Topic");
  const h = Number(prompt("Hours (0 if none)")) || 0;
  const m = Number(prompt("Minutes (0–59)")) || 0;

  const totalSeconds = (h * 3600) + (m * 60);
  if (totalSeconds <= 0) return;

  const data = getData();

  data.goals.push({
    id: Date.now(),
    subject,
    topic,
    targetSeconds: totalSeconds,
    spentSeconds: 0,
    completed: false,
    active: false
  });

  saveData(data);
  loadGoals();
}

/* Activate ONE goal */
function activateGoal(id) {
  const data = getData();

  data.goals.forEach(g => g.active = false);

  const goal = data.goals.find(g => g.id === id);
  if (goal && !goal.completed) {
    goal.active = true;
    data.activeGoalId = id;
  }

  saveData(data);
  loadGoals();
}

/* ✅ MANUAL COMPLETE — THIS WAS MISSING */
function completeGoal(id) {
  const data = getData();
  const goal = data.goals.find(g => g.id === id);

  if (!goal) return;

  goal.completed = true;
  goal.active = false;
  data.activeGoalId = null;

  saveData(data);
  loadGoals();
}
