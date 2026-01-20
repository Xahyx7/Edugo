const STORAGE_KEY = "study_helper_data";

function todayKey() {
  return new Date().toDateString();
}

function weekKey(d = new Date()) {
  const date = new Date(d);
  const day = date.getDay() || 7;
  date.setDate(date.getDate() - day + 1);
  return date.toDateString();
}

function getData() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : {
    studiedSecondsToday: 0,
    lastDate: null,

    goals: [],
    activeGoalId: null,

    dailyStats: {},
    weeklyStats: {},
    yearlyStats: {}
  };
}

function saveData(d) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(d));
}

function resetIfNewDay(data) {
  const today = todayKey();
  if (data.lastDate !== today) {
    data.studiedSecondsToday = 0;
    data.lastDate = today;
  }
}

function addStudySeconds(seconds) {
  if (seconds <= 0) return;

  const data = getData();
  const now = new Date();
  resetIfNewDay(data);

  // DASHBOARD
  data.studiedSecondsToday += seconds;

  // DAILY
  const dKey = todayKey();
  data.dailyStats[dKey] = (data.dailyStats[dKey] || 0) + seconds;

  // WEEKLY
  const wKey = weekKey(now);
  if (!data.weeklyStats[wKey]) data.weeklyStats[wKey] = Array(7).fill(0);
  const idx = (now.getDay() + 6) % 7;
  data.weeklyStats[wKey][idx] += seconds;

  // YEARLY
  const year = now.getFullYear();
  if (!data.yearlyStats[year]) data.yearlyStats[year] = Array(12).fill(0);
  data.yearlyStats[year][now.getMonth()] += seconds;

  // GOALS
  if (data.activeGoalId) {
    const g = data.goals.find(x => x.id === data.activeGoalId);
    if (g && !g.completed) {
      g.spentSeconds += seconds;
      if (g.spentSeconds >= g.targetSeconds) {
        g.completed = true;
        g.active = false;
        data.activeGoalId = null;
      }
    }
  }

  saveData(data);
}
