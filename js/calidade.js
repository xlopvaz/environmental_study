function collectAllRsdValues() {
  const values = [];
  [...resultsWaters1, ...resultsCampaign2].forEach(row => {
    Object.entries(row).forEach(([key, val]) => {
      if (key !== "id" && key !== "point" && Array.isArray(val)) {
        values.push(val[1]); // o RSD% é o segundo elemento de cada par [valor, RSD]
      }
    });
  });
  return values;
}

let rsdChart = null;

function renderRsdHistogram() {
  const canvas = document.getElementById("chart-rsd-histogram");
  if (!canvas) return;

  const rsdValues = collectAllRsdValues();
  const lang = currentLang === "gl" ? "gl" : "en";

  const bins = [
    { label: "0-5%", min: 0, max: 5 },
    { label: "5-10%", min: 5, max: 10 },
    { label: "10-15%", min: 10, max: 15 },
    { label: "15-20%", min: 15, max: 20 },
    { label: "20-30%", min: 20, max: 30 },
    { label: "30-50%", min: 30, max: 50 },
    { label: ">50%", min: 50, max: Infinity }
  ];

  const counts = bins.map(b => rsdValues.filter(v => v >= b.min && v < b.max).length);

  if (rsdChart) rsdChart.destroy();

  rsdChart = new Chart(canvas, {
    type: "bar",
    data: {
      labels: bins.map(b => b.label),
      datasets: [{
        label: lang === "gl" ? "Número de medidas" : "Number of measurements",
        data: counts,
        backgroundColor: "#3e7c9e"
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: {
        y: { title: { display: true, text: lang === "gl" ? "Nº de medidas" : "No. of measurements" }, beginAtZero: true },
        x: { title: { display: true, text: "RSD (%)" } }
      }
    }
  });

  renderCalidadeStats(rsdValues, lang);
}

function renderCalidadeStats(values, lang) {
  const container = document.getElementById("calidade-stats");
  if (!container) return;

  const sorted = [...values].sort((a, b) => a - b);
  const n = sorted.length;
  const mean = values.reduce((a, b) => a + b, 0) / n;
  const median = n % 2 === 0 ? (sorted[n/2 - 1] + sorted[n/2]) / 2 : sorted[(n-1)/2];
  const under10 = (values.filter(v => v < 10).length / n * 100).toFixed(0);

  const labels = {
    gl: { n: "Total de medidas", mean: "RSD media", median: "RSD mediana", u10: "Medidas con RSD < 10%" },
    en: { n: "Total measurements", mean: "Mean RSD", median: "Median RSD", u10: "Measurements with RSD < 10%" }
  };
  const l = labels[lang];

  container.innerHTML = `
    <div class="stat-box"><div class="stat-number">${n}</div><div>${l.n}</div></div>
    <div class="stat-box"><div class="stat-number">${mean.toFixed(1)}%</div><div>${l.mean}</div></div>
    <div class="stat-box"><div class="stat-number">${median.toFixed(1)}%</div><div>${l.median}</div></div>
    <div class="stat-box"><div class="stat-number">${under10}%</div><div>${l.u10}</div></div>
  `;
}

renderRsdHistogram();