const STORAGE_KEY = "study_helper_data";

function getData() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : {
    studiedToday: 0,
    dailyTarget: 300,
    lastStudyDate: null,
    goals: [],
    activeGoalId: null
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

  // Add to active goal
  if (data.activeGoalId !== null) {
    const goal = data.goals.find(g => g.id === data.activeGoalId);
    if (goal && !goal.completed) {
      goal.spent += minutes;

      if (goal.spent >= goal.target) {
        goal.completed = true;
        data.activeGoalId = null;
        goal.active = false;
      }
    }
  }

  saveData(data);
}
