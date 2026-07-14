// ===== Mapa 1: escenarios pluviométricos simples (wet/normal/dry) =====
let mainMap = null;
let mainMarkers = [];
let currentScenario = "wet";

// ===== Mapa 2: modelo avanzado precipitación + pH =====
let phMap = null;
let phMarkers = [];

function initMaps() {
  if (!mainMap) {
    mainMap = L.map('map-container', { center: [42.284, -8.112], zoom: 13 });
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap &copy; CARTO', subdomains: 'abcd', maxZoom: 19
    }).addTo(mainMap);
    drawMainMarkers();
    renderMapLegend("map-legend");
  }

  if (!phMap) {
    phMap = L.map('ph-map-container', { center: [42.284, -8.112], zoom: 13 });
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap &copy; CARTO', subdomains: 'abcd', maxZoom: 19
    }).addTo(phMap);
    drawPhMarkers();
    renderMapLegend("ph-map-legend");
  }
}

// ===== Factor de pH (adsorción de As sobre óxidos de Fe) =====
// Basado en Smedley & Kinniburgh (2002), Appl. Geochem. 17, 517-568
function getPhFactor(ph) {
  if (ph < 5.5) return 0.55;
  if (ph < 6.0) return 0.75;
  if (ph < 6.5) return 0.90;
  if (ph < 7.0) return 1.00;
  if (ph < 7.5) return 1.25;
  if (ph < 8.0) return 1.65;
  if (ph < 8.5) return 2.20;
  return 3.00;
}

function getPhDescKey(ph) {
  if (ph < 5.5) return "phVeryAcid";
  if (ph < 6.0) return "phAcid";
  if (ph < 6.5) return "phSlightlyAcid";
  if (ph < 7.0) return "phReference";
  if (ph < 7.5) return "phNeutralBasic";
  if (ph < 8.0) return "phBasic";
  if (ph < 8.5) return "phVeryBasic";
  return "phExtremeBasic";
}

function colorForValue(value) {
  if (value <= 10) return "#4a7c59";
  if (value <= 20) return "#c8a84b";
  if (value <= 35) return "#d17a3a";
  return "#c0392b";
}

function popupHtml(point, value, isReal) {
  const lang = currentLang === "gl" ? "gl" : "en";
  const tagLabels = {
    gl: { real: "Dato real (ICP-MS-TOF)", model: "Estimación (modelo)", limit: "Límite legal: 10 µg/L" },
    en: { real: "Real data (ICP-MS-TOF)", model: "Estimate (model)", limit: "Legal limit: 10 µg/L" }
  };
  const t = tagLabels[lang];
  return `
    <strong>${point.id.toUpperCase()}</strong><br>
    As: <strong>${value} µg/L</strong><br>
    <span style="font-size:0.7rem;color:${isReal ? '#4a7c59' : '#c0793b'};font-weight:600;">${isReal ? t.real : t.model}</span><br>
    <span style="font-size:0.72rem;color:#777;">${t.limit}</span>
  `;
}

// ----- Mapa 1: escenarios -----
function drawMainMarkers() {
  mainMarkers.forEach(m => mainMap.removeLayer(m));
  mainMarkers = [];

  samplePoints.forEach(p => {
    const value = Math.round(p.as * scenarioFactors[currentScenario].factor * 10) / 10;
    const marker = L.circleMarker([p.lat, p.lon], {
      radius: 7, fillColor: colorForValue(value), color: "#fff", weight: 1.5, fillOpacity: 0.9
    }).addTo(mainMap);
    marker.bindPopup(popupHtml(p, value, currentScenario === "wet"));
    mainMarkers.push(marker);
  });
}

function setScenario(scenario) {
  currentScenario = scenario;
  document.querySelectorAll(".scenario-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.scenario === scenario);
  });
  drawMainMarkers();
}

document.querySelectorAll(".scenario-btn").forEach(btn => {
  btn.addEventListener("click", () => setScenario(btn.dataset.scenario));
});

// ----- Mapa 2: modelo pH + precipitación -----
function drawPhMarkers() {
  phMarkers.forEach(m => phMap.removeLayer(m));
  phMarkers = [];

  const pct = parseInt(document.getElementById("precip-slider").value);
  const ph = parseInt(document.getElementById("ph-slider").value) / 10;
  const precipFactor = 150 / pct;
  const phFactor = getPhFactor(ph);

  samplePoints.forEach(p => {
    const value = Math.round(p.as * precipFactor * phFactor * 10) / 10;
    const marker = L.circleMarker([p.lat, p.lon], {
      radius: 7, fillColor: colorForValue(value), color: "#fff", weight: 1.5, fillOpacity: 0.9
    }).addTo(phMap);
    marker.bindPopup(popupHtml(p, value, false));
    phMarkers.push(marker);
  });

  updatePhStats(precipFactor, phFactor, ph);
}

function updatePhStats(precipFactor, phFactor, ph) {
  const lang = currentLang === "gl" ? "gl" : "en";
  const values = samplePoints.map(p => Math.round(p.as * precipFactor * phFactor * 10) / 10);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const over = values.filter(v => v > 10).length;
  const totalFactor = precipFactor * phFactor;

  const phDescs = {
    gl: {
      phVeryAcid: "pH moi ácido — adsorción máxima do As sobre óxidos de Fe (favorece niveis baixos).",
      phAcid: "pH ácido — adsorción alta do As.",
      phSlightlyAcid: "pH lixeiramente ácido — adsorción boa.",
      phReference: "Rango de referencia do regato — adsorción normal.",
      phNeutralBasic: "pH neutro-básico — a adsorción diminúe, o As mobilízase máis.",
      phBasic: "pH básico — adsorción baixa, maior mobilidade do As.",
      phVeryBasic: "pH moi básico — adsorción moi baixa.",
      phExtremeBasic: "pH extremadamente básico — o As queda case totalmente libre en disolución."
    },
    en: {
      phVeryAcid: "Very acidic pH — maximum As adsorption onto Fe oxides (favours low levels).",
      phAcid: "Acidic pH — high As adsorption.",
      phSlightlyAcid: "Slightly acidic pH — good adsorption.",
      phReference: "Stream's reference range — normal adsorption.",
      phNeutralBasic: "Neutral-basic pH — adsorption decreases, As becomes more mobile.",
      phBasic: "Basic pH — low adsorption, higher As mobility.",
      phVeryBasic: "Very basic pH — very low adsorption.",
      phExtremeBasic: "Extremely basic pH — As remains almost entirely free in solution."
    }
  };

  document.getElementById("total-factor").textContent = "×" + totalFactor.toFixed(2);
  document.getElementById("points-over").textContent = `${over} / ${samplePoints.length}`;
  document.getElementById("estimated-range").textContent =
    `${min.toFixed(1).replace(".", ",")} – ${max.toFixed(1).replace(".", ",")} µg/L`;
  document.getElementById("ph-desc-text").textContent = phDescs[lang][getPhDescKey(ph)];
}

function renderMapLegend(elementId) {
  const lang = currentLang === "gl" ? "gl" : "en";
  const labels = {
    gl: { ok: "≤ 10 µg/L (dentro do límite)", mid: "10-20 µg/L", high: "20-35 µg/L", veryHigh: "> 35 µg/L" },
    en: { ok: "≤ 10 µg/L (within limit)", mid: "10-20 µg/L", high: "20-35 µg/L", veryHigh: "> 35 µg/L" }
  };
  const l = labels[lang];
  const el = document.getElementById(elementId);
  if (!el) return;
  el.innerHTML = `
    <div class="legend-item"><span class="legend-swatch" style="background:#4a7c59"></span>${l.ok}</div>
    <div class="legend-item"><span class="legend-swatch" style="background:#c8a84b"></span>${l.mid}</div>
    <div class="legend-item"><span class="legend-swatch" style="background:#d17a3a"></span>${l.high}</div>
    <div class="legend-item"><span class="legend-swatch" style="background:#c0392b"></span>${l.veryHigh}</div>
  `;
}

function handleSliderChange() {
  const pct = document.getElementById("precip-slider").value;
  const ph = (parseInt(document.getElementById("ph-slider").value) / 10).toFixed(1).replace(".", ",");
  document.getElementById("precip-value").textContent = pct + "%";
  document.getElementById("ph-value").textContent = ph;
  drawPhMarkers();
}

const precipSliderEl = document.getElementById("precip-slider");
const phSliderEl = document.getElementById("ph-slider");
if (precipSliderEl) precipSliderEl.addEventListener("input", handleSliderChange);
if (phSliderEl) phSliderEl.addEventListener("input", handleSliderChange);

// Los mapas solo se inicializan cuando la sección de resultados es visible
const resultadosSection = document.getElementById("resultados");
const mapObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      initMaps();
      mapObserver.disconnect();
    }
  });
}, { threshold: 0.1 });

if (resultadosSection) mapObserver.observe(resultadosSection);