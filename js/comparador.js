const MATRIX_GROUPS = [
  { key: "water", ids: ["1","2","3","4","5"], gl: "Augas", en: "Water", color: "#3e7c9e" },
  { key: "sb", ids: ["SB1","SB2","SB3","SB4","SB5"], gl: "Sed. biodispoñible", en: "Bioavail. sediment", color: "#c8a84b" },
  { key: "h", ids: ["H1","H2","H3","H4","H5"], gl: "Follas", en: "Leaves", color: "#5c8a5c" },
  { key: "m", ids: ["M1","M2"], gl: "Madeira", en: "Wood", color: "#8e6b5c" },
  { key: "l", ids: ["L1","L2","L3"], gl: "Miñocas", en: "Earthworms", color: "#a05c5c" },
  { key: "s", ids: ["S1","S2","S3","S4","S5"], gl: "Sedimento total", en: "Total sediment", color: "#5f5c8e" }
];

function getComparatorElements() {
  const keys = new Set();
  resultsCampaign2.forEach(row => {
    Object.keys(row).forEach(k => {
      if (k !== "id" && k !== "point") keys.add(k);
    });
  });
  return Array.from(keys).sort();
}

function populateComparatorSelect() {
  const select = document.getElementById("comp-element-select");
  if (!select) return;

  const elements = getComparatorElements();
  select.innerHTML = elements.map(el => `<option value="${el}">${formatIsotope(el)}</option>`).join("");
  select.value = "75As"; // por defecto, o elemento central do estudo

  select.addEventListener("change", () => renderComparador(select.value));
}

let comparadorChart = null;

function renderComparador(isotope) {
  const lang = currentLang === "gl" ? "gl" : "en";

  const groupData = MATRIX_GROUPS.map(group => {
    const values = group.ids
      .map(id => {
        const row = resultsCampaign2.find(r => r.id === id);
        return row && row[isotope] ? row[isotope][0] : null;
      })
      .filter(v => v !== null);
    const mean = values.length ? values.reduce((a, b) => a + b, 0) / values.length : null;
    return { ...group, values, mean };
  });

  const canvas = document.getElementById("chart-comparador");
  if (comparadorChart) comparadorChart.destroy();

  comparadorChart = new Chart(canvas, {
    type: "bar",
    data: {
      labels: groupData.map(g => g[lang]),
      datasets: [{
        label: formatIsotope(isotope),
        data: groupData.map(g => g.mean),
        backgroundColor: groupData.map(g => g.color)
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: {
        y: {
          type: "logarithmic",
          title: { display: true, text: lang === "gl" ? "Concentración (escala log)" : "Concentration (log scale)" }
        }
      }
    }
  });

  renderComparadorTable(groupData, isotope, lang);
}

function renderComparadorTable(groupData, isotope, lang) {
  const table = document.getElementById("comp-detail-table");
  if (!table) return;

  const unitLabel = { gl: "Unidade", en: "Unit" }[lang];
  const matrixLabel = { gl: "Matriz", en: "Matrix" }[lang];
  const valuesLabel = { gl: "Valores por punto", en: "Values per point" }[lang];
  const meanLabel = { gl: "Media", en: "Mean" }[lang];
  const naLabel = { gl: "Sen datos", en: "No data" }[lang];

  let thead = `<thead><tr><th>${matrixLabel}</th><th>${valuesLabel}</th><th>${meanLabel}</th></tr></thead>`;
  let tbody = "<tbody>";
  groupData.forEach(g => {
    const unit = g.key === "water" ? "µg/L" : "mg/kg";
    const valuesStr = g.values.length ? g.values.map(v => v).join(", ") + ` ${unit}` : naLabel;
    const meanStr = g.mean !== null ? `${g.mean.toFixed(3)} ${unit}` : "—";
    tbody += `<tr><td class="data-id-cell">${g[lang]}</td><td>${valuesStr}</td><td>${meanStr}</td></tr>`;
  });
  tbody += "</tbody>";

  table.innerHTML = thead + tbody;
}

populateComparatorSelect();
renderComparador("75As");