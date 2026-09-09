// Valores de fondo xeoquímico ("average shale", Turekian & Wedepohl, 1961), en mg/kg
const IGEO_BACKGROUND = {
  "75As": 13,
  "208Pb": 20,
  "66Zn": 95,
  "63Cu": 45,
  "60Ni": 68,
  "59Co": 19,
  "55Mn": 850,
  "54Fe": 47200,
  "111Cd": 0.3
};

const IGEO_SEDIMENT_POINTS = ["S1", "S2", "S3", "S4", "S5"];
const IGEO_POINT_LABELS = { "S1": "P8", "S2": "P14", "S3": "P22", "S4": "P24", "S5": "P25" };

function calcIgeo(cn, bn) {
  return Math.log2(cn / (1.5 * bn));
}

function igeoClass(value) {
  if (value <= 0) return 0;
  if (value <= 1) return 1;
  if (value <= 2) return 2;
  if (value <= 3) return 3;
  if (value <= 4) return 4;
  if (value <= 5) return 5;
  return 6;
}

const IGEO_CLASS_COLORS = ["#4a7c59", "#8ba86a", "#c8a84b", "#d17a3a", "#c0663a", "#a13a2c", "#7a1f1f"];

const IGEO_CLASS_LABELS = {
  gl: ["Non contaminado", "Non a moder. contaminado", "Moderadamente contaminado", "Moder. a fortemente contaminado", "Fortemente contaminado", "Forte a extrem. contaminado", "Extremadamente contaminado"],
  en: ["Uncontaminated", "Unc. to moderately contaminated", "Moderately contaminated", "Mod. to strongly contaminated", "Strongly contaminated", "Strong to extremely contaminated", "Extremely contaminated"]
};

function renderIgeoLegend() {
  const container = document.getElementById("igeo-legend");
  if (!container) return;
  const lang = currentLang === "gl" ? "gl" : "en";

  container.innerHTML = IGEO_CLASS_LABELS[lang].map((label, i) => `
    <div class="legend-item">
      <span class="legend-swatch" style="background:${IGEO_CLASS_COLORS[i]}"></span>
      <span>${i} · ${label}</span>
    </div>
  `).join("");
}

function renderIgeoTable() {
  const table = document.getElementById("igeo-table");
  if (!table) return;
  const lang = currentLang === "gl" ? "gl" : "en";

  const elements = Object.keys(IGEO_BACKGROUND);

  let thead = `<thead><tr><th>${lang === "gl" ? "Punto" : "Point"}</th>`;
  elements.forEach(el => thead += `<th>${formatIsotope(el)}</th>`);
  thead += "</tr></thead>";

  let tbody = "<tbody>";
  IGEO_SEDIMENT_POINTS.forEach(sedId => {
    const row = resultsCampaign2.find(r => r.id === sedId);
    tbody += `<tr><td class="data-id-cell">${sedId} (${IGEO_POINT_LABELS[sedId]})</td>`;
    elements.forEach(el => {
      if (row && row[el]) {
        const cn = row[el][0];
        const bn = IGEO_BACKGROUND[el];
        const igeo = calcIgeo(cn, bn);
        const cls = igeoClass(igeo);
        tbody += `<td style="background:${IGEO_CLASS_COLORS[cls]}22; color:${IGEO_CLASS_COLORS[cls]}; font-weight:700;">${igeo.toFixed(2)}</td>`;
      } else {
        tbody += `<td class="empty-cell">—</td>`;
      }
    });
    tbody += "</tr>";
  });
  tbody += "</tbody>";

  table.innerHTML = thead + tbody;
  renderIgeoLegend();
}

const IGEO_BIO_POINTS = ["SB1", "SB2", "SB3", "SB4", "SB5"];
const IGEO_BIO_LABELS = { "SB1": "P8", "SB2": "P14", "SB3": "P22", "SB4": "P24", "SB5": "P25" };

function renderIgeoBioTable() {
  const table = document.getElementById("igeo-bio-table");
  if (!table) return;
  const lang = currentLang === "gl" ? "gl" : "en";

  const elements = Object.keys(IGEO_BACKGROUND);

  let thead = `<thead><tr><th>${lang === "gl" ? "Punto" : "Point"}</th>`;
  elements.forEach(el => thead += `<th>${formatIsotope(el)}</th>`);
  thead += "</tr></thead>";

  let tbody = "<tbody>";
  IGEO_BIO_POINTS.forEach(sbId => {
    const row = resultsCampaign2.find(r => r.id === sbId);
    tbody += `<tr><td class="data-id-cell">${sbId} (${IGEO_BIO_LABELS[sbId]})</td>`;
    elements.forEach(el => {
      if (row && row[el]) {
        const cn = row[el][0];
        const bn = IGEO_BACKGROUND[el];
        const igeo = calcIgeo(cn, bn);
        const cls = igeoClass(igeo);
        tbody += `<td style="background:${IGEO_CLASS_COLORS[cls]}22; color:${IGEO_CLASS_COLORS[cls]}; font-weight:700;">${igeo.toFixed(2)}</td>`;
      } else {
        tbody += `<td class="empty-cell">—</td>`;
      }
    });
    tbody += "</tr>";
  });
  tbody += "</tbody>";

  table.innerHTML = thead + tbody;
}

renderIgeoTable();
renderIgeoBioTable();