function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  const btn = document.getElementById("theme-toggle");
  if (btn) btn.textContent = theme === "dark" ? "☀️" : "🌙";
  localStorage.setItem("preferredTheme", theme);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme") || "light";
  applyTheme(current === "dark" ? "light" : "dark");
}

const themeToggleBtn = document.getElementById("theme-toggle");
if (themeToggleBtn) themeToggleBtn.addEventListener("click", toggleTheme);

applyTheme(localStorage.getItem("preferredTheme") || "light");