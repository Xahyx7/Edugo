const STORAGE_KEY = "study_helper_data";

function getTodayKey() {
  return new Date().toDateString();
}

function getWeekKey(date = new Date()) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(d.setDate(diff)).toDateString();
}

function getData() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : {
    studiedSecondsToday: 0,
    lastStudyDate: null,

    goals: [],
    activeGoalId: null,

    dailyStats: {},
    weeklyStats: {},
    yearlyStats: {}
  };
}

function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function ensureDailyReset() {
  const data = getData();
  const today = getTodayKey();

  if (data.lastStudyDate !== today) {
    data.studiedSecondsToday = 0;
    data.lastStudyDate = today;
    saveData(data);
  }
}

function addStudySeconds(seconds) {
  if (seconds <= 0) return;

  const data = getData();
  const now = new Date();
  const todayKey = getTodayKey();

  ensureDailyReset();

  // ---- DASHBOARD ----
  data.studiedSecondsToday += seconds;

  // ---- DAILY STATS ----
  data.dailyStats[todayKey] =
    (data.dailyStats[todayKey] || 0) + seconds;

  // ---- WEEKLY STATS ----
  const weekKey = getWeekKey(now);
  if (!data.weeklyStats[weekKey]) {
    data.weeklyStats[weekKey] = {1:0,2:0,3:0,4:0,5:0,6:0,7:0};
  }
  const dayIndex = ((now.getDay() + 6) % 7) + 1;
  data.weeklyStats[weekKey][dayIndex] += seconds;

  // ---- YEARLY STATS ----
  const year = now.getFullYear().toString();
  if (!data.yearlyStats[year]) {
    data.yearlyStats[year] = Array(12).fill(0);
  }
  data.yearlyStats[year][now.getMonth()] += seconds;

  // ---- ACTIVE GOAL ----
  if (data.activeGoalId !== null) {
    const goal = data.goals.find(g => g.id === data.activeGoalId);
    if (goal && !goal.completed) {
      goal.spent += Math.ceil(seconds / 60);
      if (goal.spent >= goal.target) {
        goal.completed = true;
        goal.active = false;
        data.activeGoalId = null;
      }
    }
  }

  saveData(data);
}
