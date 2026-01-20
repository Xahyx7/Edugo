let elapsedSeconds = 0;
let interval = null;

function loadTimer() {
  document.getElementById("screen-container").innerHTML = `
    <section style="text-align:center">
      <h2>Focus Timer</h2>
      <div id="timerDisplay" style="font-size:48px">00:00</div>
      <button onclick="startTimer()">Start</button>
      <button onclick="stopTimer()">Stop</button>
    </section>
  `;
  renderTimer();
}

function startTimer() {
  if (interval) return;
  interval = setInterval(() => {
    elapsedSeconds++;
    renderTimer();
  }, 1000);
}

function stopTimer() {
  clearInterval(interval);
  interval = null;

  addStudySeconds(elapsedSeconds);
  elapsedSeconds = 0;
  renderTimer();

  loadHome();
  updateDashboard();
}

function renderTimer() {
  const m = Math.floor(elapsedSeconds / 60).toString().padStart(2, "0");
  const s = (elapsedSeconds % 60).toString().padStart(2, "0");
  document.getElementById("timerDisplay").textContent = `${m}:${s}`;
}
