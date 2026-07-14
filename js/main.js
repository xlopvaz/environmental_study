let currentLang = "gl";

function setLanguage(lang) {
  currentLang = lang;

  document.querySelectorAll("[data-i18n]").forEach(el => {
  const key = el.getAttribute("data-i18n");
  if (translations[lang][key]) {
    el.textContent = translations[lang][key];
  }
});

  document.documentElement.lang = lang;
  localStorage.setItem("preferredLang", lang);

  if (document.getElementById("periodic-table")) renderPeriodicTable();
}

document.getElementById("btn-gl").addEventListener("click", () => setLanguage("gl"));
document.getElementById("btn-en").addEventListener("click", () => setLanguage("en"));

// Al cargar la página, usa el idioma guardado o gallego por defecto
const savedLang = localStorage.getItem("preferredLang") || "gl";
setLanguage(savedLang);