// Coordenadas del regato de Nogueiredo (punto central aproximado)
let lastWeatherData = null;
const LIVE_LAT = 42.284;
const LIVE_LON = -8.112;

// Referencia climatológica aproximada para la región de Ourense (~70 mm/mes, AEMET, orientativa)
const MONTHLY_RAINFALL_REFERENCE = 70;

// pH de referencia del regato (rango típico medido: 6,5-7,0)
const REFERENCE_PH = 6.75;

async function loadLiveEstimate() {
  const container = document.getElementById("live-card");
  if (!container) return;

  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${LIVE_LAT}&longitude=${LIVE_LON}` +
      `&current=temperature_2m,precipitation,weather_code,wind_speed_10m` +
      `&daily=precipitation_sum&past_days=30&forecast_days=1&timezone=Europe/Madrid`;

    const response = await fetch(url);
    if (!response.ok) throw new Error("Fallo na resposta da API");
    const data = await response.json();

    // Suma de precipitación de los últimos 30 días reales (excluye el día de hoy, que puede estar incompleto)
    const dailyPrecip = data.daily.precipitation_sum.slice(0, 30);
    const last30Sum = dailyPrecip.reduce((a, b) => a + (b || 0), 0);

    // % respecto a la referencia mensual (aprox.)
    const pctOfNormal = Math.max(30, Math.round((last30Sum / MONTHLY_RAINFALL_REFERENCE) * 100));

    lastWeatherData = { current: data.current, last30Sum, pctOfNormal };
renderLiveCard(data.current, last30Sum, pctOfNormal);
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

function renderLiveCard(current, last30Sum, pctOfNormal) {
  const lang = currentLang === "gl" ? "gl" : "en";

  const precipFactor = 150 / pctOfNormal;
  const phFactor = getPhFactor(REFERENCE_PH);
  const totalFactor = precipFactor * phFactor;

  // Media de As medido en el regato (excluyendo puntos atípicos de zona termal/desembocadura) como base
  const baseline = samplePoints.slice(0, 22).reduce((a, p) => a + p.as, 0) / 22;
  const estimatedAs = Math.round(baseline * totalFactor * 10) / 10;
  const overLimit = estimatedAs > 10;

  const labels = {
    gl: {
      title: "Agora mesmo en Castrelo de Miño",
      temp: "Temperatura",
      rain30: "Choiva (últimos 30 días)",
      pctLbl: "Choiva vs. media mensual",
      estimate: "As medio estimado no regato",
      overMsg: "Por riba do límite legal (10 µg/L)",
      okMsg: "Dentro do límite legal (10 µg/L)",
      updated: "Actualizado agora"
    },
    en: {
      title: "Right now in Castrelo de Miño",
      temp: "Temperature",
      rain30: "Rainfall (last 30 days)",
      pctLbl: "Rainfall vs. monthly average",
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
    <div class="live-estimate-box ${overLimit ? 'over' : 'ok'}">
      <div class="live-estimate-label">${l.estimate}</div>
      <div class="live-estimate-value">${estimatedAs} µg/L</div>
      <div class="live-estimate-msg">${overLimit ? l.overMsg : l.okMsg}</div>
    </div>
  `;
}

// Cargar cuando la sección de resultados sea visible
const liveSection = document.getElementById("resultados");
const liveObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      loadLiveEstimate();
      liveObserver.disconnect();
    }
  });
}, { threshold: 0.1 });

if (liveSection) liveObserver.observe(liveSection);