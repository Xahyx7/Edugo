let timerInterval = null;
let elapsedSeconds = 0;
let running = false;

function loadTimer() {
  const container = document.getElementById("screen-container");

  container.innerHTML = `
    <section class="fade-in" style="text-align:center;padding-top:40px">
      <h2>Focus Timer</h2>
      <div id="timerDisplay" style="font-size:48px;margin:30px 0">00:00</div>

      <div style="display:flex;justify-content:center;gap:20px">
        <button class="primary-btn" onclick="startTimer()">Start</button>
        <button class="primary-btn" onclick="pauseTimer()">Pause</button>
        <button class="primary-btn" onclick="stopTimer()">Stop</button>
      </div>
    </section>
  `;

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

  const minutes = Math.floor(elapsedSeconds / 60);
  addStudyTime(minutes);

  elapsedSeconds = 0;
  updateTimerDisplay();

  // 🔥 FORCE DASHBOARD UPDATE
  loadHome();
  setTimeout(updateDashboard, 50);
}

function updateTimerDisplay() {
  const m = Math.floor(elapsedSeconds / 60).toString().padStart(2, "0");
  const s = (elapsedSeconds % 60).toString().padStart(2, "0");
  const el = document.getElementById("timerDisplay");
  if (el) el.textContent = `${m}:${s}`;
}
