// ===== Estimación en directo do As (v3) =====
// Cambios respecto á v2:
//  - Ventá de 120 días (4 meses, como na memoria) en vez de 30
//  - Choiva actual e "normal" da mesma fonte (ERA5, Open-Meteo Archive);
//    só os últimos días (que ERA5 aínda non ten) saen da previsión
//  - Ancoraxe: factor = 175 / %choiva (marzo 2026 = 175 % con este cálculo => factor 1)
//  - Calibración provisional con só dúas campañas (marzo e setembro 2026)

const LIVE_LAT = 42.284;
const LIVE_LON = -8.112;
const REFERENCE_PH = 6.75;        // pH de referencia do regato (rango típico: 6,5-7,0)
const NORMAL_YEARS_BACK = 10;     // anos usados para a normal climática
const WINDOW_DAYS = 120;          // días de choiva acumulada
const ANCHOR_PCT = 175;           // % de choiva de marzo 2026 (ventá de 120 días) => factor 1
const ARCHIVE_DELAY_DAYS = 7;     // ERA5 ten ~5 días de atraso; marxe de seguridade
const LIVE_CACHE_KEY = "liveEstimateCacheV3";

// OJO: o nome last30Sum consérvase por compatibilidade con main.js,
// pero agora garda a suma de choiva da ventá (120 días)
let lastWeatherData = null;

// ---------- Datas (en UTC, para evitar problemas de horario de verán) ----------
function liveToDate(s) { const [y, m, d] = s.split("-").map(Number); return new Date(Date.UTC(y, m - 1, d)); }
function liveFmt(dt) { return dt.toISOString().slice(0, 10); }
function liveAddDays(s, n) { const dt = liveToDate(s); dt.setUTCDate(dt.getUTCDate() + n); return liveFmt(dt); }
function liveShiftYears(s, n) { const dt = liveToDate(s); dt.setUTCFullYear(dt.getUTCFullYear() + n); return liveFmt(dt); }
function liveLocalDateStr(d) {
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${mm}-${dd}`;
}

// Suma de choiva en [fin - días + 1, fin]. getValue(data) devolve mm ou undefined/null
function liveWindowSum(getValue, endDate, days) {
  let sum = 0, missing = 0;
  for (let k = 0; k < days; k++) {
    const v = getValue(liveAddDays(endDate, -k));
    if (v === undefined || v === null) missing++; else sum += v;
  }
  return { sum, missing };
}

// ---------- Datos históricos (ERA5) + normal climática, con caché de 24 h ----------
async function getArchiveData(endDate) {
  try {
    const cached = JSON.parse(localStorage.getItem(LIVE_CACHE_KEY));
    if (cached && cached.endDate === endDate && cached.windowDays === WINDOW_DAYS) return cached;
  } catch (e) { /* caché inexistente ou corrupta: recalculamos */ }

  const archiveEnd = liveAddDays(endDate, -ARCHIVE_DELAY_DAYS);
  const start = liveAddDays(liveShiftYears(endDate, -NORMAL_YEARS_BACK), -(WINDOW_DAYS - 1));
  const url = `https://archive-api.open-meteo.com/v1/archive?latitude=${LIVE_LAT}&longitude=${LIVE_LON}` +
    `&start_date=${start}&end_date=${archiveEnd}&daily=precipitation_sum&timezone=Europe/Madrid`;

  const response = await fetch(url);
  if (!response.ok) throw new Error("Fallo na API do histórico climático");
  const data = await response.json();

  const series = {};
  data.daily.time.forEach((t, i) => { series[t] = data.daily.precipitation_sum[i]; });

  // Normal: media da choiva na mesma ventá de calendario dos NORMAL_YEARS_BACK anos anteriores
  const pastSums = [];
  for (let i = 1; i <= NORMAL_YEARS_BACK; i++) {
    pastSums.push(liveWindowSum(d => series[d], liveShiftYears(endDate, -i), WINDOW_DAYS).sum);
  }
  const normalMm = pastSums.reduce((a, b) => a + b, 0) / pastSums.length;

  // Días da ventá actual que xa están en ERA5
  const currentDays = {};
  for (let k = 0; k < WINDOW_DAYS; k++) {
    const d = liveAddDays(endDate, -k);
    if (d <= archiveEnd && series[d] !== undefined && series[d] !== null) currentDays[d] = series[d];
  }

  const result = { endDate, windowDays: WINDOW_DAYS, normalMm, currentDays };
  try { localStorage.setItem(LIVE_CACHE_KEY, JSON.stringify(result)); } catch (e) { /* sen caché, non pasa nada */ }
  return result;
}

// ---------- Estimación ----------
function liveEstimateAs(pctOfNormal) {
  const baseline = samplePoints.slice(0, 22).reduce((a, p) => a + p.as, 0) / 22; // media do regato en marzo (m1-m22)
  const factor = ANCHOR_PCT / pctOfNormal;
  return Math.round(baseline * factor * getPhFactor(REFERENCE_PH) * 10) / 10;
}

async function loadLiveEstimate() {
  const container = document.getElementById("live-card");
  if (!container && !document.getElementById("live-banner")) return;

  try {
    // A ventá remata onte (hoxe aínda non está completo)
    const y = new Date(); y.setDate(y.getDate() - 1);
    const endDate = liveLocalDateStr(y);

    const forecastUrl = `https://api.open-meteo.com/v1/forecast?latitude=${LIVE_LAT}&longitude=${LIVE_LON}` +
      `&current=temperature_2m,precipitation,weather_code,wind_speed_10m` +
      `&daily=precipitation_sum&past_days=14&forecast_days=1&timezone=Europe/Madrid`;

    const [forecast, archive] = await Promise.all([
      fetch(forecastUrl).then(r => { if (!r.ok) throw new Error("Fallo na API meteorolóxica"); return r.json(); }),
      getArchiveData(endDate)
    ]);

    const forecastByDate = {};
    forecast.daily.time.forEach((t, i) => { forecastByDate[t] = forecast.daily.precipitation_sum[i]; });

    const cur = liveWindowSum(d => {
      const a = archive.currentDays[d];
      return (a !== undefined && a !== null) ? a : forecastByDate[d];
    }, endDate, WINDOW_DAYS);
    if (cur.missing > 0) console.warn(`Estimación en directo: faltan ${cur.missing} días de choiva na ventá (contados como 0 mm)`);

    const pctOfNormal = Math.max(15, Math.round((cur.sum / archive.normalMm) * 100));

    lastWeatherData = {
      current: forecast.current,
      last30Sum: cur.sum,            // suma da ventá de WINDOW_DAYS días (nome histórico)
      pctOfNormal,
      climateNormal: archive.normalMm,
      windowDays: WINDOW_DAYS
    };
    renderLiveBanner();
    if (document.getElementById("live-card")) {
      renderLiveCard(forecast.current, cur.sum, pctOfNormal, archive.normalMm);
    }
  } catch (error) {
    console.error("Erro cargando datos meteorolóxicos:", error);
    const lang = currentLang === "gl" ? "gl" : "en";
    const errMsg = {
      gl: "Non se puideron cargar os datos meteorolóxicos en tempo real neste momento.",
      en: "Live weather data could not be loaded right now."
    };
    if (container) container.innerHTML = `<p class="live-error">${errMsg[lang]}</p>`;
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

function renderLiveCard(current, windowSum, pctOfNormal, climateNormal) {
  const lang = currentLang === "gl" ? "gl" : "en";
  const estimatedAs = liveEstimateAs(pctOfNormal);
  const overLimit = estimatedAs > 10;

  const labels = {
    gl: {
      title: "Agora mesmo en Castrelo de Miño",
      temp: "Temperatura",
      rain: `Choiva (últimos ${WINDOW_DAYS} días)`,
      pctLbl: "% sobre a normal climática",
      normalNote: `Normal (media de ${NORMAL_YEARS_BACK} anos, mesmos ${WINDOW_DAYS} días): ${climateNormal.toFixed(0)} mm`,
      provisional: "Calibración provisional con dúas campañas (marzo e setembro de 2026)",
      estimate: "As medio estimado no regato",
      overMsg: "Por riba do límite legal (10 µg/L)",
      okMsg: "Dentro do límite legal (10 µg/L)",
      updated: "Actualizado agora"
    },
    en: {
      title: "Right now in Castrelo de Miño",
      temp: "Temperature",
      rain: `Rainfall (last ${WINDOW_DAYS} days)`,
      pctLbl: "% of climate normal",
      normalNote: `Normal (${NORMAL_YEARS_BACK}-year average, same ${WINDOW_DAYS} days): ${climateNormal.toFixed(0)} mm`,
      provisional: "Provisional calibration with two campaigns (March and September 2026)",
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
        <div class="stat-label">${l.rain}</div>
        <div class="stat-value">${windowSum.toFixed(0)} mm</div>
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
    <p class="live-normal-note">${l.provisional}</p>
  `;
}

function renderLiveBanner() {
  const banner = document.getElementById("live-banner");
  if (!banner || !lastWeatherData) return;

  const lang = currentLang === "gl" ? "gl" : "en";
  const { current, pctOfNormal } = lastWeatherData;
  const estimatedAs = liveEstimateAs(pctOfNormal);
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