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

  if (view === "daily") renderDaily(data);
  if (view === "weekly") renderWeekly(data);
  if (view === "yearly") renderYearly(data);
}

function renderDaily(data) {
  const key = new Date().toDateString();
  const min = data.dailyStats[key] || 0;

  document.getElementById("statsContent").innerHTML = `
    <div class="card">
      <h2>${Math.floor(min/60)}h ${min%60}m</h2>
      <p>Studied Today</p>
    </div>
  `;
}

function renderWeekly(data) {
  const week = data.weeklyStats[getWeekKey()] || {1:0,2:0,3:0,4:0,5:0,6:0,7:0};
  let bars = "";

  Object.values(week).forEach(m => {
    bars += `<div class="bar"><div class="fill" style="height:${Math.max(m*2,6)}px"></div></div>`;
  });

  document.getElementById("statsContent").innerHTML = `
    <div class="card">
      <h3>This Week</h3>
      <div class="bar-row">${bars}</div>
    </div>
  `;
}

function renderYearly(data) {
  const year = new Date().getFullYear().toString();
  const months = data.yearlyStats[year] || Array(12).fill(0);
  let bars = "";

  months.forEach(m => {
    bars += `<div class="bar"><div class="fill" style="height:${Math.max(m/5,6)}px"></div></div>`;
  });

  document.getElementById("statsContent").innerHTML = `
    <div class="card">
      <h3>${year}</h3>
      <div class="bar-row">${bars}</div>
    </div>
  `;
}
