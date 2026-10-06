// ===== Mapa interactivo do As segundo a choiva (modelo da memoria) =====
// Factor de dilución = 150 / % de choiva acumulada (4 meses) respecto á referencia 1991-2020.
// Marzo de 2026 = 150 % => factor 1 => son os valores realmente medidos (ICP-MS-TOF).
// Calquera outro % é unha estimación do modelo.

let mainMap = null;       // nomes mantidos porque main.js chama a drawMainMarkers() ao cambiar de idioma
let mainMarkers = [];

const PRECIP_REFERENCE_PCT = 150;
const SCENARIO_PCT = { wet: 150, normal: 100, dry: 50 };
const STREAM_POINTS = 22; // m1-m22; m23-m24 = mestura co Miño, m25 = zona termal

function mapLang() { return currentLang === "gl" ? "gl" : "en"; }
function fmtComma(n, decimals = 1) { return n.toFixed(decimals).replace(".", ","); }

function currentPct() {
  const el = document.getElementById("precip-slider");
  return el ? parseInt(el.value, 10) : PRECIP_REFERENCE_PCT;
}

function factorForPct(pct) { return PRECIP_REFERENCE_PCT / pct; }

function valueForPoint(point, pct) {
  return Math.round(point.as * factorForPct(pct) * 10) / 10;
}

function colorForValue(value) {
  if (value <= 10) return "#4a7c59";
  if (value <= 20) return "#c8a84b";
  if (value <= 35) return "#d17a3a";
  return "#c0392b";
}

function popupHtml(point, value, isReal) {
  const tagLabels = {
    gl: { real: "Dato real (ICP-MS-TOF)", model: "Estimación (modelo)", limit: "Límite legal: 10 µg/L" },
    en: { real: "Real data (ICP-MS-TOF)", model: "Estimate (model)", limit: "Legal limit: 10 µg/L" }
  };
  const t = tagLabels[mapLang()];
  return `
    <strong>${point.id.toUpperCase()}</strong><br>
    As: <strong>${value} µg/L</strong><br>
    <span style="font-size:0.7rem;color:${isReal ? "#4a7c59" : "#c0793b"};font-weight:600;">${isReal ? t.real : t.model}</span><br>
    <span style="font-size:0.72rem;color:#777;">${t.limit}</span>
  `;
}

function renderMapLegend() {
  const el = document.getElementById("map-legend");
  if (!el) return;
  const labels = {
    gl: { ok: "≤ 10 µg/L (dentro do límite)", mid: "10-20 µg/L", high: "20-35 µg/L", veryHigh: "> 35 µg/L" },
    en: { ok: "≤ 10 µg/L (within limit)", mid: "10-20 µg/L", high: "20-35 µg/L", veryHigh: "> 35 µg/L" }
  };
  const l = labels[mapLang()];
  el.innerHTML = `
    <div class="legend-item"><span class="legend-swatch" style="background:#4a7c59"></span>${l.ok}</div>
    <div class="legend-item"><span class="legend-swatch" style="background:#c8a84b"></span>${l.mid}</div>
    <div class="legend-item"><span class="legend-swatch" style="background:#d17a3a"></span>${l.high}</div>
    <div class="legend-item"><span class="legend-swatch" style="background:#c0392b"></span>${l.veryHigh}</div>
  `;
}

// Media ± desviación típica mostral dos puntos do regato (m1-m22), escalada polo factor
function streamStats(pct) {
  const vals = samplePoints.slice(0, STREAM_POINTS).map(p => p.as);
  const mean = vals.reduce((a, b) => a + b, 0) / vals.length;
  const sd = Math.sqrt(vals.reduce((a, b) => a + (b - mean) ** 2, 0) / (vals.length - 1));
  const f = factorForPct(pct);
  return { mean: mean * f, sd: sd * f };
}

// Actualiza barra, tarxetas, etiqueta de dato real/modelo, botóns e lenda (non precisa que o mapa exista)
function updateMapUi() {
  const pct = currentPct();
  const lang = mapLang();
  const setText = (id, text) => { const el = document.getElementById(id); if (el) el.textContent = text; };

  setText("precip-value", pct + "%");
  setText("total-factor", "×" + fmtComma(factorForPct(pct), 2));
  setText("points-over", `${samplePoints.filter(p => valueForPoint(p, pct) > 10).length} / ${samplePoints.length}`);
  const s = streamStats(pct);
  setText("stream-mean", `${fmtComma(s.mean)} ± ${fmtComma(s.sd)} µg/L`);

  const badge = document.getElementById("map-data-badge");
  if (badge) {
    const isReal = pct === PRECIP_REFERENCE_PCT;
    badge.className = "data-badge " + (isReal ? "real" : "model");
    badge.textContent = isReal ? (lang === "gl" ? "DATOS REAIS" : "REAL DATA") : (lang === "gl" ? "MODELO" : "MODEL");
  }

  document.querySelectorAll(".scenario-btn").forEach(btn => {
    btn.classList.toggle("active", SCENARIO_PCT[btn.dataset.scenario] === pct);
  });

  renderMapLegend();
}

function drawMainMarkers() {
  updateMapUi();
  if (!mainMap) return;

  mainMarkers.forEach(m => mainMap.removeLayer(m));
  mainMarkers = [];

  const pct = currentPct();
  const isReal = pct === PRECIP_REFERENCE_PCT;

  samplePoints.forEach(p => {
    const value = valueForPoint(p, pct);
    const marker = L.circleMarker([p.lat, p.lon], {
      radius: 7, fillColor: colorForValue(value), color: "#fff", weight: 1.5, fillOpacity: 0.9
    }).addTo(mainMap);
    marker.bindPopup(popupHtml(p, value, isReal));
    mainMarkers.push(marker);
  });
}

function initMap() {
  if (mainMap) return;
  mainMap = L.map("map-container", { center: [42.284, -8.112], zoom: 13 });
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors", subdomains: "abc", maxZoom: 19
  }).addTo(mainMap);
  drawMainMarkers();
}

// ---------- Eventos ----------
const precipSliderEl = document.getElementById("precip-slider");
if (precipSliderEl) precipSliderEl.addEventListener("input", drawMainMarkers);

document.querySelectorAll(".scenario-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    if (precipSliderEl) precipSliderEl.value = SCENARIO_PCT[btn.dataset.scenario];
    drawMainMarkers();
  });
});

// O mapa só se crea cando a sección é visible (Leaflet necesita un contedor con tamaño real)
const resultadosSection = document.getElementById("resultados");
if (resultadosSection) {
  const mapObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        initMap();
        mapObserver.disconnect();
      }
    });
  }, { threshold: 0.1 });
  mapObserver.observe(resultadosSection);
}

// Ao cambiar de idioma (main.js actualiza <html lang>), refrescar lenda, etiquetas e popups
new MutationObserver(() => drawMainMarkers())
  .observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });

updateMapUi();