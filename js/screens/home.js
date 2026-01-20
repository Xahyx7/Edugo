function loadHome() {
  const container = document.getElementById("screen-container");
  const data = getData();

  let goalsHTML = "";

  if (data.goals.length === 0) {
    goalsHTML = `<p style="color:var(--subtext)">No goals added yet</p>`;
  } else {
    data.goals.forEach(goal => {
      const percent = goal.target > 0
        ? Math.min(Math.round((goal.spent / goal.target) * 100), 100)
        : 0;

      goalsHTML += `
        <div class="card ${goal.active ? "active" : ""} ${goal.completed ? "completed" : ""}">
          <h4>${goal.subject}</h4>
          <p>${goal.topic}</p>
          <div class="bar">
            <div class="fill" style="width:${percent}%"></div>
          </div>
        </div>
      `;
    });
  }

  container.innerHTML = `
    <section class="dashboard fade-in">
      <div class="card hero-card">
        <div class="progress-ring">
          <svg width="140" height="140">
            <circle cx="70" cy="70" r="60"/>
            <circle cx="70" cy="70" r="60" id="progressCircle"/>
          </svg>
          <div class="progress-text">
            <h2 id="studiedTime">0h 0m</h2>
            <p>studied today</p>
          </div>
        </div>
      </div>

      <button class="primary-btn" onclick="loadScreen('timer')">
        Start Study
      </button>

      <h3>Today’s Goals</h3>
      ${goalsHTML}
    </section>
  `;

  setTimeout(updateDashboard, 50);
}
