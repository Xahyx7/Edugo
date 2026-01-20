function loadHome() {
  const container = document.getElementById("screen-container");

  container.innerHTML = `
    <section class="dashboard fade-in">

      <!-- HERO STUDY CARD -->
      <div class="card hero-card">
        <div class="progress-ring">
          <svg width="140" height="140">
            <circle cx="70" cy="70" r="60" />
            <circle cx="70" cy="70" r="60" id="progressCircle"/>
          </svg>
          <div class="progress-text">
            <h2 id="studiedTime">0h 0m</h2>
            <p>out of 5h today</p>
          </div>
        </div>
      </div>

      <!-- START STUDY BUTTON -->
      <button class="primary-btn" id="startStudy">
        Start Study
      </button>

      <!-- TODAY GOALS -->
      <h3 class="section-title">Today’s Goals</h3>

      <div class="card goal-card">
        <div>
          <h4>Mathematics</h4>
          <p>Trigonometry</p>
        </div>
        <div class="goal-progress">
          <div class="bar">
            <div class="fill" style="width:40%"></div>
          </div>
          <span>40%</span>
        </div>
      </div>

    </section>
  `;
}
