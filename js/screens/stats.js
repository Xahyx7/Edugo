function loadStats(view = "daily") {
  const container = document.getElementById("screen-container");

  container.innerHTML = `
    <section class="fade-in">
      <div class="stats-tabs">
        <button onclick="loadStats('daily')">Daily</button>
        <button onclick="loadStats('weekly')">Weekly</button>
        <button onclick="loadStats('yearly')">Yearly</button>
      </div>
      <div id="statsContent"></div>
    </section>
  `;

  setTimeout(() => {
    const data = getData();
    if (view === "daily") renderDailyStats(data);
    if (view === "weekly") renderWeeklyStats(data);
    if (view === "yearly") renderYearlyStats(data);
  }, 0);
}

/* ---------- HELPERS ---------- */
function formatTime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return `${h}h ${m}m`;
}

/* ---------- DAILY ---------- */
function renderDailyStats(data) {
  const today = new Date().toDateString();
  const total = data.todaySeconds || 0;

  let goalsHtml = "";
  let hasGoals = false;

  data.goals.forEach(g => {
    if (g.spentSeconds > 0) {
      hasGoals = true;
      goalsHtml += `
        <li>
          ${g.completed ? "✔" : "▶"} 
          ${g.subject} – ${formatTime(g.spentSeconds)}
        </li>
      `;
    }
  });

  document.getElementById("statsContent").innerHTML = `
    <div class="card">
      <h2>${formatTime(total)}</h2>
      <p>Studied Today</p>
    </div>

    <div class="card">
      <h3>Goals Today</h3>
      ${
        hasGoals
          ? `<ul>${goalsHtml}</ul>`
          : `<p style="opacity:0.6">No goals worked on today</p>`
      }
    </div>
  `;
}

/* ---------- WEEKLY ---------- */
function renderWeeklyStats(data) {
  const week = {};
  const today = new Date();

  // Build last 7 days
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const key = d.toDateString();
    week[key] = data.dailyStats?.[key] || 0;
  }

  let rows = "";
  Object.entries(week).forEach(([day, seconds]) => {
    rows += `
      <li>
        ${day.slice(0, 3)} – ${formatTime(seconds)}
      </li>
    `;
  });

  document.getElementById("statsContent").innerHTML = `
    <div class="card">
      <h3>This Week</h3>
      <ul>${rows}</ul>
    </div>
  `;
}

/* ---------- YEARLY ---------- */
function renderYearlyStats(data) {
  const year = new Date().getFullYear();
  const months = Array(12).fill(0);

  if (data.yearlyStats?.[year]) {
    data.yearlyStats[year].forEach((sec, i) => {
      months[i] = sec;
    });
  }

  let rows = "";
  let best = { month: "", time: 0 };

  months.forEach((sec, i) => {
    const name = new Date(year, i).toLocaleString("default", { month: "long" });
    rows += `<li>${name} – ${formatTime(sec)}</li>`;
    if (sec > best.time) best = { month: name, time: sec };
  });

  document.getElementById("statsContent").innerHTML = `
    <div class="card">
      <h3>${year} Summary</h3>
      <ul>${rows}</ul>
      ${
        best.time > 0
          ? `<p><strong>Best month:</strong> ${best.month} (${formatTime(best.time)})</p>`
          : ""
      }
    </div>
  `;
}
