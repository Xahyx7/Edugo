const toggleBtn = document.getElementById("themeToggle");
const body = document.body;

toggleBtn.addEventListener("click", () => {
  const current = body.getAttribute("data-theme");
  const next = current === "light" ? "dark" : "light";

  body.setAttribute("data-theme", next);
  toggleBtn.textContent = next === "light" ? "🌙" : "🌞";

  localStorage.setItem("theme", next);
});

window.onload = () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    body.setAttribute("data-theme", savedTheme);
    toggleBtn.textContent = savedTheme === "light" ? "🌙" : "🌞";
  }
};
