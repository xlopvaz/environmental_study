const LIVE_LAT = 42.284;
const LIVE_LON = -8.112;
const REFERENCE_PH = 6.75; // pH de referencia del regato (rango típico medido: 6,5-7,0)
const NORMAL_YEARS_BACK = 10; // años históricos usados para calcular a normal climática

let lastWeatherData = null;

function formatDate(d) {
  return d.toISOString().split("T")[0];
}

// Calcula a media histórica de choiva para a mesma xanela de 30 días do calendario,
// promediando os últimos NORMAL_YEARS_BACK anos. Faise nunha SOA petición continua
// (non unha por ano) para evitar o límite de peticións simultáneas da API (erro 429).
async function getClimateNormal(endDate) {
  const mostRecentEnd = new Date(endDate);
  mostRecentEnd.setFullYear(mostRecentEnd.getFullYear() - 1);

  const oldestStart = new Date(endDate);
  oldestStart.setFullYear(oldestStart.getFullYear() - NORMAL_YEARS_BACK);
  oldestStart.setDate(oldestStart.getDate() - 29);

  const url = `https://archive-api.open-meteo.com/v1/archive?latitude=${LIVE_LAT}&longitude=${LIVE_LON}` +
    `&start_date=${formatDate(oldestStart)}&end_date=${formatDate(mostRecentEnd)}` +
    `&daily=precipitation_sum&timezone=Europe/Madrid`;

  const response = await fetch(url);
  if (!response.ok) throw new Error("Fallo na API do histórico climático");
  const data = await response.json();

  // Mapa data -> precipitación, para poder buscar cada día concreto
  const precipByDate = {};
  data.daily.time.forEach((dateStr, idx) => {
    precipByDate[dateStr] = data.daily.precipitation_sum[idx] || 0;
  });

  // Para cada un dos NORMAL_YEARS_BACK anos, suma a choiva da súa xanela de 30 días
  const yearlySums = [];
  for (let i = 1; i <= NORMAL_YEARS_BACK; i++) {
    const yearEnd = new Date(endDate);
    yearEnd.setFullYear(yearEnd.getFullYear() - i);

    let sum = 0;
    for (let d = 0; d < 30; d++) {
      const day = new Date(yearEnd);
      day.setDate(day.getDate() - d);
      sum += precipByDate[formatDate(day)] || 0;
    }
    yearlySums.push(sum);
  }

  return yearlySums.reduce((a, b) => a + b, 0) / yearlySums.length;
}

async function loadLiveEstimate() {
  const container = document.getElementById("live-card");
  if (!container) return;

  try {
    const today = new Date();

    const forecastUrl = `https://api.open-meteo.com/v1/forecast?latitude=${LIVE_LAT}&longitude=${LIVE_LON}` +
      `&current=temperature_2m,precipitation,weather_code,wind_speed_10m` +
      `&daily=precipitation_sum&past_days=30&forecast_days=1&timezone=Europe/Madrid`;

    const [forecastResponse, climateNormal] = await Promise.all([
      fetch(forecastUrl).then(r => r.json()),
      getClimateNormal(today)
    ]);

    const dailyPrecip = forecastResponse.daily.precipitation_sum.slice(0, 30);
    const last30Sum = dailyPrecip.reduce((a, b) => a + (b || 0), 0);

    const pctOfNormal = Math.max(15, Math.round((last30Sum / climateNormal) * 100));

    lastWeatherData = { current: forecastResponse.current, last30Sum, pctOfNormal, climateNormal };
    renderLiveCard(forecastResponse.current, last30Sum, pctOfNormal, climateNormal);
  } catch (error) {
    console.error("Erro cargando datos meteorolóxicos:", error);
    const lang = currentLang === "gl" ? "gl" : "en";
    const errMsg = {
      gl: "Non se puideron cargar os datos meteorolóxicos en tempo real neste momento.",
      en: "Live weather data could not be loaded right now."
    };
    container.innerHTML = `<p class="live-error">${errMsg[lang]}</p>`;
  }
}

function weatherIcon(code) {
  if (code === 0) return "☀️";
  if (code <= 2) return "🌤️";
  if (code === 3) return "☁️";
  if (code >= 51 && code <= 67) return "🌦️";
  if (code >= 71 && code <= 77) return "🌨️";
  if (code >= 80 && code <= 82) return "🌧️";
  if (code >= 95) return "⛈️";
  return "🌡️";
}

function renderLiveCard(current, last30Sum, pctOfNormal, climateNormal) {
  const lang = currentLang === "gl" ? "gl" : "en";

  const precipFactor = 150 / pctOfNormal;
  const phFactor = getPhFactor(REFERENCE_PH);
  const totalFactor = precipFactor * phFactor;

  // Media de As medido no regato (só puntos m1-m22, exclúense m23-m25 por non pertencer ao regato)
  const baseline = samplePoints.slice(0, 22).reduce((a, p) => a + p.as, 0) / 22;
  const estimatedAs = Math.round(baseline * totalFactor * 10) / 10;
  const overLimit = estimatedAs > 10;

  const labels = {
    gl: {
      title: "Agora mesmo en Castrelo de Miño",
      temp: "Temperatura",
      rain30: "Choiva (últimos 30 días)",
      pctLbl: "% sobre a normal climática",
      normalNote: `Normal (media de ${NORMAL_YEARS_BACK} anos, mesma época): ${climateNormal.toFixed(0)} mm`,
      estimate: "As medio estimado no regato",
      overMsg: "Por riba do límite legal (10 µg/L)",
      okMsg: "Dentro do límite legal (10 µg/L)",
      updated: "Actualizado agora"
    },
    en: {
      title: "Right now in Castrelo de Miño",
      temp: "Temperature",
      rain30: "Rainfall (last 30 days)",
      pctLbl: "% of climate normal",
      normalNote: `Normal (${NORMAL_YEARS_BACK}-year average, same period): ${climateNormal.toFixed(0)} mm`,
      estimate: "Estimated average As in the stream",
      overMsg: "Above the legal limit (10 µg/L)",
      okMsg: "Within the legal limit (10 µg/L)",
      updated: "Updated now"
    }
  };
  const l = labels[lang];

  document.getElementById("live-card").innerHTML = `
    <div class="live-header">
      <span class="live-icon">${weatherIcon(current.weather_code)}</span>
      <div>
        <div class="live-title">${l.title}</div>
        <div class="live-updated">${l.updated}</div>
      </div>
    </div>
    <div class="live-stats-grid">
      <div class="stat-card">
        <div class="stat-label">${l.temp}</div>
        <div class="stat-value">${current.temperature_2m.toFixed(1)} °C</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">${l.rain30}</div>
        <div class="stat-value">${last30Sum.toFixed(1)} mm</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">${l.pctLbl}</div>
        <div class="stat-value">${pctOfNormal}%</div>
      </div>
    </div>
    <p class="live-normal-note">${l.normalNote}</p>
    <div class="live-estimate-box ${overLimit ? 'over' : 'ok'}">
      <div class="live-estimate-label">${l.estimate}</div>
      <div class="live-estimate-value">${estimatedAs} µg/L</div>
      <div class="live-estimate-msg">${overLimit ? l.overMsg : l.okMsg}</div>
    </div>
  `;
}

const LIVE_LAT = 42.284;
const LIVE_LON = -8.112;
const REFERENCE_PH = 6.75; // pH de referencia del regato (rango típico medido: 6,5-7,0)
const NORMAL_YEARS_BACK = 10; // años históricos usados para calcular a normal climática

let lastWeatherData = null;

function formatDate(d) {
  return d.toISOString().split("T")[0];
}

// Calcula a media histórica de choiva para a mesma xanela de 30 días do calendario,
// promediando os últimos NORMAL_YEARS_BACK anos. Faise nunha SOA petición continua
// (non unha por ano) para evitar o límite de peticións simultáneas da API (erro 429).
async function getClimateNormal(endDate) {
  const mostRecentEnd = new Date(endDate);
  mostRecentEnd.setFullYear(mostRecentEnd.getFullYear() - 1);

  const oldestStart = new Date(endDate);
  oldestStart.setFullYear(oldestStart.getFullYear() - NORMAL_YEARS_BACK);
  oldestStart.setDate(oldestStart.getDate() - 29);

  const url = `https://archive-api.open-meteo.com/v1/archive?latitude=${LIVE_LAT}&longitude=${LIVE_LON}` +
    `&start_date=${formatDate(oldestStart)}&end_date=${formatDate(mostRecentEnd)}` +
    `&daily=precipitation_sum&timezone=Europe/Madrid`;

  const response = await fetch(url);
  if (!response.ok) throw new Error("Fallo na API do histórico climático");
  const data = await response.json();

  // Mapa data -> precipitación, para poder buscar cada día concreto
  const precipByDate = {};
  data.daily.time.forEach((dateStr, idx) => {
    precipByDate[dateStr] = data.daily.precipitation_sum[idx] || 0;
  });

  // Para cada un dos NORMAL_YEARS_BACK anos, suma a choiva da súa xanela de 30 días
  const yearlySums = [];
  for (let i = 1; i <= NORMAL_YEARS_BACK; i++) {
    const yearEnd = new Date(endDate);
    yearEnd.setFullYear(yearEnd.getFullYear() - i);

    let sum = 0;
    for (let d = 0; d < 30; d++) {
      const day = new Date(yearEnd);
      day.setDate(day.getDate() - d);
      sum += precipByDate[formatDate(day)] || 0;
    }
    yearlySums.push(sum);
  }

  return yearlySums.reduce((a, b) => a + b, 0) / yearlySums.length;
}

async function loadLiveEstimate() {
  const container = document.getElementById("live-card");
  if (!container) return;

  try {
    const today = new Date();

    const forecastUrl = `https://api.open-meteo.com/v1/forecast?latitude=${LIVE_LAT}&longitude=${LIVE_LON}` +
      `&current=temperature_2m,precipitation,weather_code,wind_speed_10m` +
      `&daily=precipitation_sum&past_days=30&forecast_days=1&timezone=Europe/Madrid`;

    const [forecastResponse, climateNormal] = await Promise.all([
      fetch(forecastUrl).then(r => r.json()),
      getClimateNormal(today)
    ]);

    const dailyPrecip = forecastResponse.daily.precipitation_sum.slice(0, 30);
    const last30Sum = dailyPrecip.reduce((a, b) => a + (b || 0), 0);

    const pctOfNormal = Math.max(15, Math.round((last30Sum / climateNormal) * 100));

    lastWeatherData = { current: forecastResponse.current, last30Sum, pctOfNormal, climateNormal };
    renderLiveBanner();
    // La tarjeta completa solo se pinta si la sección "resultados" ya existe en la página
    if (document.getElementById("live-card")) {
      renderLiveCard(forecastResponse.current, last30Sum, pctOfNormal, climateNormal);
    }
  } catch (error) {
    console.error("Erro cargando datos meteorolóxicos:", error);
    const lang = currentLang === "gl" ? "gl" : "en";
    const errMsg = {
      gl: "Non se puideron cargar os datos meteorolóxicos en tempo real neste momento.",
      en: "Live weather data could not be loaded right now."
    };
    container.innerHTML = `<p class="live-error">${errMsg[lang]}</p>`;
  }
}

function weatherIcon(code) {
  if (code === 0) return "☀️";
  if (code <= 2) return "🌤️";
  if (code === 3) return "☁️";
  if (code >= 51 && code <= 67) return "🌦️";
  if (code >= 71 && code <= 77) return "🌨️";
  if (code >= 80 && code <= 82) return "🌧️";
  if (code >= 95) return "⛈️";
  return "🌡️";
}

function renderLiveCard(current, last30Sum, pctOfNormal, climateNormal) {
  const lang = currentLang === "gl" ? "gl" : "en";

  const precipFactor = 150 / pctOfNormal;
  const phFactor = getPhFactor(REFERENCE_PH);
  const totalFactor = precipFactor * phFactor;

  // Media de As medido no regato (só puntos m1-m22, exclúense m23-m25 por non pertencer ao regato)
  const baseline = samplePoints.slice(0, 22).reduce((a, p) => a + p.as, 0) / 22;
  const estimatedAs = Math.round(baseline * totalFactor * 10) / 10;
  const overLimit = estimatedAs > 10;

  const labels = {
    gl: {
      title: "Agora mesmo en Castrelo de Miño",
      temp: "Temperatura",
      rain30: "Choiva (últimos 30 días)",
      pctLbl: "% sobre a normal climática",
      normalNote: `Normal (media de ${NORMAL_YEARS_BACK} anos, mesma época): ${climateNormal.toFixed(0)} mm`,
      estimate: "As medio estimado no regato",
      overMsg: "Por riba do límite legal (10 µg/L)",
      okMsg: "Dentro do límite legal (10 µg/L)",
      updated: "Actualizado agora"
    },
    en: {
      title: "Right now in Castrelo de Miño",
      temp: "Temperature",
      rain30: "Rainfall (last 30 days)",
      pctLbl: "% of climate normal",
      normalNote: `Normal (${NORMAL_YEARS_BACK}-year average, same period): ${climateNormal.toFixed(0)} mm`,
      estimate: "Estimated average As in the stream",
      overMsg: "Above the legal limit (10 µg/L)",
      okMsg: "Within the legal limit (10 µg/L)",
      updated: "Updated now"
    }
  };
  const l = labels[lang];

  document.getElementById("live-card").innerHTML = `
    <div class="live-header">
      <span class="live-icon">${weatherIcon(current.weather_code)}</span>
      <div>
        <div class="live-title">${l.title}</div>
        <div class="live-updated">${l.updated}</div>
      </div>
    </div>
    <div class="live-stats-grid">
      <div class="stat-card">
        <div class="stat-label">${l.temp}</div>
        <div class="stat-value">${current.temperature_2m.toFixed(1)} °C</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">${l.rain30}</div>
        <div class="stat-value">${last30Sum.toFixed(1)} mm</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">${l.pctLbl}</div>
        <div class="stat-value">${pctOfNormal}%</div>
      </div>
    </div>
    <p class="live-normal-note">${l.normalNote}</p>
    <div class="live-estimate-box ${overLimit ? 'over' : 'ok'}">
      <div class="live-estimate-label">${l.estimate}</div>
      <div class="live-estimate-value">${estimatedAs} µg/L</div>
      <div class="live-estimate-msg">${overLimit ? l.overMsg : l.okMsg}</div>
    </div>
  `;
}

function renderLiveBanner() {
  const banner = document.getElementById("live-banner");
  if (!banner || !lastWeatherData) return;

  const lang = currentLang === "gl" ? "gl" : "en";
  const { current, pctOfNormal } = lastWeatherData;
  const baseline = samplePoints.slice(0, 22).reduce((a, p) => a + p.as, 0) / 22;
  const totalFactor = (150 / pctOfNormal) * getPhFactor(REFERENCE_PH);
  const estimatedAs = Math.round(baseline * totalFactor * 10) / 10;
  const overLimit = estimatedAs > 10;

  const labels = {
    gl: { text: `Agora en Nogueiredo: ${current.temperature_2m.toFixed(0)}°C · As estimado: ${estimatedAs} µg/L`, link: "Ver detalle →" },
    en: { text: `Now in Nogueiredo: ${current.temperature_2m.toFixed(0)}°C · Estimated As: ${estimatedAs} µg/L`, link: "See details →" }
  };
  const l = labels[lang];

  banner.className = "live-banner " + (overLimit ? "over" : "ok");
  banner.innerHTML = `
    <span class="live-banner-icon">${weatherIcon(current.weather_code)}</span>
    <span class="live-banner-text">${l.text}</span>
    <a href="#resultados" class="live-banner-link">${l.link}</a>
  `;
}

// A estimación cárgase nada máis entrar na web, para que o banner estea dispoñible dende o principio
loadLiveEstimate();