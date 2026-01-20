let timerInterval = null;
let elapsedSeconds = 0;
let running = false;

function loadTimer() {
  const container = document.getElementById("screen-container");

  container.innerHTML = `
    <section class="fade-in" style="text-align:center;padding-top:40px">

      <h2 style="margin-bottom:10px">Focus Time</h2>
      <p style="color:var(--subtext)">Stay focused</p>

      <div style="font-size:48px;margin:40px 0" id="timerDisplay">
        00:00
      </div>

      <div style="display:flex;justify-content:center;gap:20px">
        <button class="primary-btn" id="startBtn">Start</button>
        <button class="primary-btn" id="pauseBtn">Pause</button>
        <button class="primary-btn" id="stopBtn">Stop</button>
      </div>

    </section>
  `;

  document.getElementById("startBtn").onclick = startTimer;
  document.getElementById("pauseBtn").onclick = pauseTimer;
  document.getElementById("stopBtn").onclick = stopTimer;

  updateTimerDisplay();
}

function startTimer() {
  if (running) return;

  running = true;
  timerInterval = setInterval(() => {
    elapsedSeconds++;
    updateTimerDisplay();
  }, 1000);
}

function pauseTimer() {
  running = false;
  clearInterval(timerInterval);
}

function stopTimer() {
  if (elapsedSeconds === 0) return;

  pauseTimer();

  const minutesStudied = Math.floor(elapsedSeconds / 60);
  addStudyTime(minutesStudied);

  elapsedSeconds = 0;
  updateTimerDisplay();

  // Update dashboard if user goes back
  setTimeout(updateDashboard, 50);
}

function updateTimerDisplay() {
  const mins = Math.floor(elapsedSeconds / 60).toString().padStart(2, "0");
  const secs = (elapsedSeconds % 60).toString().padStart(2, "0");
  document.getElementById("timerDisplay").textContent = `${mins}:${secs}`;
}
