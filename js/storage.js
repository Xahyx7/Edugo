const STORAGE_KEY = "study_helper_data";

function getTodayKey() {
  return new Date().toDateString();
}

function getWeekKey(date = new Date()) {
  const d = new Date(date);
  const day = d.getDay(); // 0 Sun - 6 Sat
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Monday
  const monday = new Date(d.setDate(diff));
  return monday.toDateString();
}

function getYearKey(date = new Date()) {
  return date.getFullYear().toString();
}

function getData() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : {
    // dashboard
    studiedToday: 0,
    dailyTarget: 300,
    lastStudyDate: null,

    // goals
    goals: [],
    activeGoalId: null,

    // stats
    dailyStats: {},    // { dateKey: minutes }
    weeklyStats: {},   // { weekKey: { Mon..Sun } }
    yearlyStats: {}    // { year: { monthIndex: minutes } }
  };
}

function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function addStudyTime(minutes) {
  if (minutes <= 0) return;

  const data = getData();
  const now = new Date();

  // ---- DAILY RESET ----
  const todayKey = getTodayKey();
  if (data.lastStudyDate !== todayKey) {
    data.studiedToday = 0;
    data.lastStudyDate = todayKey;
  }
  data.studiedToday += minutes;

  // ---- DAILY STATS ----
  data.dailyStats[todayKey] = (data.dailyStats[todayKey] || 0) + minutes;

  // ---- WEEKLY STATS ----
  const weekKey = getWeekKey(now);
  if (!data.weeklyStats[weekKey]) {
    data.weeklyStats[weekKey] = { 1:0,2:0,3:0,4:0,5:0,6:0,7:0 }; // Mon..Sun
  }
  const dayIndex = ((now.getDay() + 6) % 7) + 1; // Mon=1..Sun=7
  data.weeklyStats[weekKey][dayIndex] += minutes;

  // ---- YEARLY STATS ----
  const yearKey = getYearKey(now);
  if (!data.yearlyStats[yearKey]) {
    data.yearlyStats[yearKey] = Array(12).fill(0);
  }
  data.yearlyStats[yearKey][now.getMonth()] += minutes;

  // ---- ACTIVE GOAL ----
  if (data.activeGoalId !== null) {
    const goal = data.goals.find(g => g.id === data.activeGoalId);
    if (goal && !goal.completed) {
      goal.spent += minutes;
      if (goal.spent >= goal.target) {
        goal.completed = true;
        goal.active = false;
        data.activeGoalId = null;
      }
    }
  }

  saveData(data);
}
function ensureDailyReset() {
  const data = getData();
  const todayKey = new Date().toDateString();

  if (data.lastStudyDate !== todayKey) {
    data.studiedToday = 0;
    data.lastStudyDate = todayKey;
    saveData(data);
  }
}
