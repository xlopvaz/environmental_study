// Color según el valor de correlación: rojo (negativo fuerte) -> blanco (0) -> azul (positivo fuerte)
function corrColor(value) {
  if (value >= 0) {
    const intensity = Math.round(value * 180);
    return `rgb(${255 - intensity}, ${255 - Math.round(intensity * 0.3)}, 255)`;
  } else {
    const intensity = Math.round(Math.abs(value) * 180);
    return `rgb(255, ${255 - intensity}, ${255 - intensity})`;
  }
}

function strengthLabel(value, lang) {
  const abs = Math.abs(value);
  const labels = {
    gl: { strong: "Forte", moderate: "Moderada", weak: "Débil" },
    en: { strong: "Strong", moderate: "Moderate", weak: "Weak" }
  };
  if (abs >= 0.7) return labels[lang].strong;
  if (abs >= 0.4) return labels[lang].moderate;
  return labels[lang].weak;
}

function setLanguage(lang) {
  currentLang = lang;
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (translations[lang][key]) el.textContent = translations[lang][key];
  });
  document.documentElement.lang = lang;
  localStorage.setItem("preferredLang", lang);
  renderCorrMatrix();
}

document.getElementById("btn-gl").addEventListener("click", () => setLanguage("gl"));
document.getElementById("btn-en").addEventListener("click", () => setLanguage("en"));

const savedLang = localStorage.getItem("preferredLang") || "gl";
setLanguage(savedLang);

function renderCorrMatrix() {
  const container = document.getElementById("corr-matrix");
  if (!container) return;

  const n = corrElements.length;
  container.style.gridTemplateColumns = `60px repeat(${n}, 1fr)`;

  let html = `<div class="corr-cell corr-header"></div>`;
  corrElements.forEach(el => {
    html += `<div class="corr-cell corr-header">${el}</div>`;
  });

  corrElements.forEach(rowEl => {
    html += `<div class="corr-cell corr-header">${rowEl}</div>`;
    corrElements.forEach(colEl => {
      const value = corrMatrix[rowEl][colEl];
      const isDiagonal = rowEl === colEl;
      html += `<div class="corr-cell corr-value ${isDiagonal ? 'diagonal' : ''}"
        style="background:${corrColor(value)}"
        data-row="${rowEl}" data-col="${colEl}" data-value="${value}">
        ${value.toFixed(2)}
      </div>`;
    });
  });

  container.innerHTML = html;

  container.querySelectorAll(".corr-value:not(.diagonal)").forEach(cell => {
    cell.addEventListener("click", () => showCorrDetail(cell.dataset.row, cell.dataset.col, parseFloat(cell.dataset.value)));
  });
}

function showCorrDetail(row, col, value) {
  document.querySelectorAll(".corr-value.selected").forEach(c => c.classList.remove("selected"));
  document.querySelectorAll(`.corr-value[data-row="${row}"][data-col="${col}"], .corr-value[data-row="${col}"][data-col="${row}"]`)
    .forEach(c => c.classList.add("selected"));

  const lang = currentLang === "gl" ? "gl" : "en";
  const strength = strengthLabel(value, lang);
  const direction = value >= 0
    ? (lang === "gl" ? "positiva" : "positive")
    : (lang === "gl" ? "negativa" : "negative");

  const labels = {
    gl: {
      title: `${row} — ${col}`,
      corrLabel: "Correlación",
      strengthLabel: "Forza",
      interpretation: value >= 0
        ? `${row} e ${col} tenden a variar xuntos: cando un aumenta, o outro tamén adoita aumentar.`
        : `${row} e ${col} tenden a variar en sentido contrario: cando un aumenta, o outro adoita diminuír.`
    },
    en: {
      title: `${row} — ${col}`,
      corrLabel: "Correlation",
      strengthLabel: "Strength",
      interpretation: value >= 0
        ? `${row} and ${col} tend to vary together: when one increases, the other usually increases too.`
        : `${row} and ${col} tend to vary in opposite directions: when one increases, the other usually decreases.`
    }
  };
  const l = labels[lang];

  document.getElementById("corr-detail").innerHTML = `
    <h3>${l.title}</h3>
    <div class="corr-stats-grid">
      <div class="stat-card">
        <div class="stat-label">${l.corrLabel}</div>
        <div class="stat-value">ρ = ${value.toFixed(2)}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">${l.strengthLabel}</div>
        <div class="stat-value">${strength} (${direction})</div>
      </div>
    </div>
    <p>${l.interpretation}</p>
  `;
}
let asChart = null;
let srChart = null;

function renderAsProfileChart() {
  const canvas = document.getElementById("chart-as-profile");
  if (!canvas) return;

  const lang = currentLang === "gl" ? "gl" : "en";
  const labels = samplePoints.map(p => p.id.toUpperCase());
  const values = samplePoints.map(p => p.as);
  const limitLine = new Array(samplePoints.length).fill(10);

  const legendLabels = {
    gl: { as: "As (µg/L)", limit: "Límite legal" },
    en: { as: "As (µg/L)", limit: "Legal limit" }
  };
  const l = legendLabels[lang];

  if (asChart) asChart.destroy();

  asChart = new Chart(canvas, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: l.as,
          data: values,
          borderColor: "#1c3d5a",
          backgroundColor: "rgba(28,61,90,0.08)",
          fill: true,
          tension: 0.25,
          pointRadius: 3
        },
        {
          label: l.limit,
          data: limitLine,
          borderColor: "#c0392b",
          borderDash: [6, 4],
          pointRadius: 0,
          fill: false
        }
      ]
    },
    options: {
      responsive: true,
      plugins: { legend: { position: "top" } },
      scales: {
        y: { title: { display: true, text: "µg/L" } },
        x: { title: { display: true, text: lang === "gl" ? "Punto de mostraxe" : "Sampling point" } }
      }
    }
  });
}

function renderSrProfileChart() {
  const canvas = document.getElementById("chart-sr-profile");
  if (!canvas) return;

  const labels = srIsotopeData.map(p => p.point);
  const values = srIsotopeData.map(p => p.ratio);

  if (srChart) srChart.destroy();

  srChart = new Chart(canvas, {
    type: "line",
    data: {
      labels: labels,
      datasets: [{
        label: "87Sr/86Sr",
        data: values,
        borderColor: "#3e7c59",
        backgroundColor: "rgba(62,124,89,0.08)",
        fill: true,
        tension: 0.15,
        pointRadius: 4
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: {
        y: { title: { display: true, text: "87Sr/86Sr" } },
        x: { title: { display: true, text: currentLang === "gl" ? "Punto (augas arriba → desembocadura)" : "Point (upstream → mouth)" } }
      }
    }
  });
}
renderCorrMatrix();
renderAsProfileChart();
  renderSrProfileChart();