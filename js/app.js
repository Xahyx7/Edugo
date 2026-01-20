/* ===============================
   APP STARTUP
================================ */

document.addEventListener("DOMContentLoaded", () => {
  updateGreeting();
  loadScreen("home");
});

/* ===============================
   GREETING
================================ */

function updateGreeting() {
  const hour = new Date().getHours();
  const greeting = document.getElementById("greeting");

  if (!greeting) return;

  if (hour < 12) greeting.textContent = "Good Morning 👋";
  else if (hour < 18) greeting.textContent = "Good Afternoon 👋";
  else greeting.textContent = "Good Evening 👋";
}

/* ===============================
   DASHBOARD UPDATE
================================ */

function updateDashboard() {
  const data = getData();

  const studied = data.studiedToday || 0;
  const target = data.dailyTarget || 1;

  const hours = Math.floor(studied / 60);
  const minutes = studied % 60;

  const percent = Math.min(
    Math.round((studied / target) * 100),
    100
  );

  const timeText = document.getElementById("studiedTime");
  const circle = document.getElementById("progressCircle");

  if (timeText) {
    timeText.textContent = `${hours}h ${minutes}m`;
  }

  if (circle) {
    const total = 377;
    circle.style.strokeDashoffset =
      total - (percent / 100) * total;
  }
}

/* ===============================
   GOALS – ADD / ACTIVATE / COMPLETE
================================ */

function showAddGoal() {
  const subject = prompt("Enter subject");
  const topic = prompt("Enter topic");

  const hoursInput = prompt("Target hours (0 if none)");
  const minutesInput = prompt("Target minutes (0–59)");

  if (!subject || !topic) return;

  const hours = Number(hoursInput) || 0;
  const minutes = Number(minutesInput) || 0;

  if (hours < 0 || minutes < 0 || minutes >= 60) {
    alert("Please enter valid time");
    return;
  }

  const totalMinutes = (hours * 60) + minutes;

  if (totalMinutes <= 0) {
    alert("Goal time must be greater than 0");
    return;
  }

  const data = getData();

  if (!Array.isArray(data.goals)) {
    data.goals = [];
  }

  data.goals.push({
    id: Date.now(),
    subject: subject,
    topic: topic,
    target: totalMinutes,   // stored in minutes
    spent: 0,
    completed: false,
    active: false
  });

  saveData(data);
  loadGoals();
}


function activateGoal(id) {
  const data = getData();

  if (!Array.isArray(data.goals)) return;

  data.goals.forEach(goal => {
    goal.active = false;
  });

  const selectedGoal = data.goals.find(g => g.id === id);

  if (selectedGoal && !selectedGoal.completed) {
    selectedGoal.active = true;
    data.activeGoalId = id;
  }

  saveData(data);
  loadGoals();
}

function completeGoal(id) {
  const data = getData();

  if (!Array.isArray(data.goals)) return;

  const goal = data.goals.find(g => g.id === id);

  if (goal) {
    goal.completed = true;
    goal.active = false;
    data.activeGoalId = null;
  }

  saveData(data);
  loadGoals();
}

/* ===============================
   SAFETY HELPERS
================================ */

// Prevent app crash if user navigates fast
window.addEventListener("error", () => {
  console.warn("Recovered from a minor error");
});
