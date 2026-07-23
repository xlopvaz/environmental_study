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
  const searchEl = document.getElementById("glossary-search");
if (searchEl) searchEl.placeholder = lang === "gl" ? "Buscar un termo..." : "Search a term...";
if (typeof renderGlossary === "function") renderGlossary(searchEl ? searchEl.value : "");
  if (typeof mainMap !== "undefined" && mainMap) drawMainMarkers();
if (typeof phMap !== "undefined" && phMap) drawPhMarkers();
if (typeof lastWeatherData !== "undefined" && lastWeatherData) renderLiveCard(lastWeatherData.current, lastWeatherData.last30Sum, lastWeatherData.pctOfNormal, lastWeatherData.climateNormal);
if (typeof renderLiveBanner === "function") renderLiveBanner();
if (typeof renderIcpmsDiagram === "function") renderIcpmsDiagram();
}

document.getElementById("btn-gl").addEventListener("click", () => setLanguage("gl"));
document.getElementById("btn-en").addEventListener("click", () => setLanguage("en"));

// Al cargar la página, usa el idioma guardado o gallego por defecto
const savedLang = localStorage.getItem("preferredLang") || "gl";
setLanguage(savedLang);