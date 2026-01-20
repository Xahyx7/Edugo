function loadGoals() {
  const container = document.getElementById("screen-container");
  const data = getData();

  let goalsHTML = "";

  if (data.goals.length === 0) {
    goalsHTML = `<p style="color:var(--subtext)">No goals yet</p>`;
  } else {
    data.goals.forEach(goal => {
      const percent = Math.min(
        Math.round((goal.spent / goal.target) * 100),
        100
      );

      goalsHTML += `
        <div class="card goal-card">
          <div>
            <h4>${goal.subject}</h4>
            <p>${goal.topic}</p>
            <small>${Math.floor(goal.spent/60)}h ${goal.spent%60}m / ${Math.floor(goal.target/60)}h</small>
          </div>

          <div class="goal-actions">
            <div class="bar">
              <div class="fill" style="width:${percent}%"></div>
            </div>

            ${
              goal.completed
                ? `<span class="done">✔ Done</span>`
                : `
                  <button onclick="activateGoal(${goal.id})">
                    ${goal.active ? "Active" : "Activate"}
                  </button>
                  <button onclick="completeGoal(${goal.id})">✔</button>
                `
            }
          </div>
        </div>
      `;
    });
  }

  container.innerHTML = `
    <section class="fade-in">
      <h2>Your Goals</h2>
      <button class="primary-btn" onclick="showAddGoal()">➕ Add Goal</button>
      <div style="margin-top:20px">${goalsHTML}</div>
    </section>
  `;
}
