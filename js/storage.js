const STORAGE_KEY = "study_helper_data";

function getData() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : {
    studiedToday: 0,      // minutes
    dailyTarget: 300,     // 5 hours
    lastStudyDate: null
  };
}

function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function addStudyTime(minutes) {
  if (minutes <= 0) return;

  const data = getData();
  const today = new Date().toDateString();

  if (data.lastStudyDate !== today) {
    data.studiedToday = 0;
    data.lastStudyDate = today;
  }

  data.studiedToday += minutes;
  saveData(data);
}
