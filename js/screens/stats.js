function loadStats(view = "daily") {
  const container = document.getElementById("screen-container");
  const data = getData();

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

  if (view === "daily") renderDailyStats(data);
  if (view === "weekly") renderWeeklyStats(data);
  if (view === "yearly") renderYearlyStats(data);
}

function renderDailyStats(data) {
  const todayKey = new Date().toDateString();
  const minutes = data.dailyStats[todayKey] || 0;

  document.getElementById("statsContent").innerHTML = `
    <div class="card">
      <h2>${Math.floor(minutes/60)}h ${minutes%60}m</h2>
      <p>Studied Today</p>
    </div>
  `;
}

function renderWeeklyStats(data) {
  const weekKey = getWeekKey(new Date());
  const week = data.weeklyStats[weekKey] || {1:0,2:0,3:0,4:0,5:0,6:0,7:0};

  let bars = "";
  Object.values(week).forEach(min => {
    bars += `<div class="bar"><div class="fill" style="height:${min}px"></div></div>`;
  });

  document.getElementById("statsContent").innerHTML = `
    <div class="card">
      <h3>This Week</h3>
      <div class="bar-row">${bars}</div>
    </div>
  `;
}

function renderYearlyStats(data) {
  const yearKey = new Date().getFullYear().toString();
  const months = data.yearlyStats[yearKey] || Array(12).fill(0);

  let bars = "";
  months.forEach(min => {
    bars += `<div class="bar"><div class="fill" style="height:${min/5}px"></div></div>`;
  });

  document.getElementById("statsContent").innerHTML = `
    <div class="card">
      <h3>${yearKey}</h3>
      <div class="bar-row">${bars}</div>
    </div>
  `;
}
