const STORAGE_KEY = "study_helper_data";

function getData() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : {
    studiedToday: 150,     // minutes (demo)
    dailyTarget: 300,      // 5 hours
    goals: [],
    streak: 3,
    lastStudyDate: null
  };
}

function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
