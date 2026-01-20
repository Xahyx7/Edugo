document.addEventListener("DOMContentLoaded", () => {
  updateGreeting();
  loadScreen("home");
});

function updateGreeting() {
  const hour = new Date().getHours();
  const g = document.getElementById("greeting");

  if (hour < 12) g.textContent = "Good Morning 👋";
  else if (hour < 18) g.textContent = "Good Afternoon 👋";
  else g.textContent = "Good Evening 👋";
}

function updateDashboard() {
  const data = getData();

  const studied = data.studiedToday;
  const target = data.dailyTarget;

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
function showAddGoal() {
  const subject = prompt("Subject?");
  const topic = prompt("Topic?");
  const hours = prompt("Target time (hours)?");

  if (!subject || !topic || !hours) return;

  const data = getData();

  data.goals.push({
    id: Date.now(),
    subject,
    topic,
    target: hours * 60,
    spent: 0,
    completed: false,
    active: false
  });

  saveData(data);
  loadGoals();
}

function activateGoal(id) {
  const data = getData();

  data.goals.forEach(g => g.active = false);
  data.activeGoalId = id;

  const goal = data.goals.find(g => g.id === id);
  if (goal) goal.active = true;

  saveData(data);
  loadGoals();
}

function completeGoal(id) {
  const data = getData();
  const goal = data.goals.find(g => g.id === id);

  if (goal) {
    goal.completed = true;
    goal.active = false;
    data.activeGoalId = null;
  }

  saveData(data);
  loadGoals();
}

