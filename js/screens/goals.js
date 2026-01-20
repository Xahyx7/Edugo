function loadGoals() {
  const container = document.getElementById("screen-container");
  const data = getData();

  let html = `
    <section class="fade-in">
      <h2>Your Goals</h2>
      <button class="primary-btn" onclick="showAddGoal()">➕ Add Goal</button>
      <div style="margin-top:20px">
  `;

  if (!data.goals || data.goals.length === 0) {
    html += `<p style="color:var(--subtext)">No goals yet</p>`;
  } else {
    data.goals.forEach(goal => {
      const percent = goal.target > 0
        ? Math.min(Math.round((goal.spent / goal.target) * 100), 100)
        : 0;

      html += `
        <div class="card" style="margin-bottom:15px">
          <h4>${goal.subject}</h4>
          <p>${goal.topic}</p>

          <div class="bar">
            <div class="fill" style="width:${percent}%"></div>
          </div>

          <p>${Math.floor(goal.spent / 60)}h ${goal.spent % 60}m</p>

          ${
            goal.completed
              ? `<strong>✔ Completed</strong>`
              : `
                <button onclick="activateGoal(${goal.id})">
                  ${goal.active ? "Active" : "Activate"}
                </button>
                <button onclick="completeGoal(${goal.id})">✔</button>
              `
          }
        </div>
      `;
    });
  }

  html += `</div></section>`;
  container.innerHTML = html;
}
