function updateDashboard() {
  const data = getData();
  const sec = data.studiedSecondsToday;

  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);

  document.getElementById("studiedTime").textContent = `${h}h ${m}m`;

  const circle = document.getElementById("progressCircle");
  const percent = Math.min(sec / (5 * 3600), 1);
  circle.style.strokeDashoffset = 377 - percent * 377;
}

function showAddGoal() {
  const subject = prompt("Subject");
  const topic = prompt("Topic");
  const h = Number(prompt("Hours")) || 0;
  const m = Number(prompt("Minutes")) || 0;

  const totalSec = (h * 3600) + (m * 60);
  if (totalSec <= 0) return;

  const data = getData();
  data.goals.push({
    id: Date.now(),
    subject,
    topic,
    targetSeconds: totalSec,
    spentSeconds: 0,
    completed: false,
    active: false
  });

  saveData(data);
  loadGoals();
}

function activateGoal(id) {
  const data = getData();
  data.goals.forEach(g => g.active = false);
  const g = data.goals.find(x => x.id === id);
  if (g && !g.completed) {
    g.active = true;
    data.activeGoalId = id;
  }
  saveData(data);
  loadGoals();
}
