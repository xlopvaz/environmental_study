// ===== Isótopos de estroncio (87Sr/86Sr) =====
// Necesita data/sr-isotopes.js. Chámase desde setLanguage() en analise.js.

const SR_MATRICES = {
  water:      { gl: "Auga",     en: "Water",      color: "#d1495b", pointStyle: "circle",   line: true },
  leaves:     { gl: "Follas",   en: "Leaves",     color: "#5b8c2a", pointStyle: "rectRot",  line: true },
  wood:       { gl: "Madeira",  en: "Wood",       color: "#1a9aa0", pointStyle: "rect",     line: false },
  earthworms: { gl: "Miñocas",  en: "Earthworms", color: "#9b5de5", pointStyle: "triangle", line: false }
};

const SR_POINT_ZONES = {
  1: { gl: "cabeceira",     en: "headwater" },
  2: { gl: "curso medio",   en: "mid-course" },
  3: { gl: "curso medio",   en: "mid-course" },
  4: { gl: "desembocadura", en: "outlet" },
  5: { gl: "zona termal",   en: "thermal zone" }
};

function srLang() {
  return currentLang === "gl" ? "gl" : "en";
}

function srFormat(value, decimals) {
  const s = value.toFixed(decimals);
  return srLang() === "gl" ? s.replace(".", ",") : s;
}

let srChart = null;

function renderSrProfileChart() {
  const canvas = document.getElementById("chart-sr-profile");
  if (canvas && typeof srIsotopes !== "undefined") {
    const lang = srLang();
    const points = [1, 2, 3, 4, 5];
    const labels = points.map(p => `${p} · ${srPointSites[p]}`);

    const datasets = Object.entries(SR_MATRICES).map(([key, m]) => {
      const rows = srIsotopes.filter(r => r.matrix === key);
      const data = points.map(p => {
        const r = rows.find(row => row.point === p);
        return r ? r.ratio : null;
      });
      const ids = points.map(p => {
        const r = rows.find(row => row.point === p);
        return r ? r.id : null;
      });
      return {
        label: m[lang],
        data,
        ids,
        borderColor: m.color,
        backgroundColor: m.color,
        pointStyle: m.pointStyle,
        pointRadius: 6,
        pointHoverRadius: 8,
        borderDash: [6, 4],
        borderWidth: 2,
        showLine: m.line,
        spanGaps: false,
        tension: 0
      };
    });

    if (srChart) srChart.destroy();

    srChart = new Chart(canvas, {
      type: "line",
      data: { labels, datasets },
      options: {
        responsive: true,
        interaction: { mode: "nearest", intersect: true },
        plugins: {
          legend: { position: "bottom", labels: { usePointStyle: true } },
          tooltip: {
            callbacks: {
              label: ctx => {
                const id = ctx.dataset.ids[ctx.dataIndex];
                return `${id} (${ctx.dataset.label}): ${srFormat(ctx.parsed.y, 5)}`;
              }
            }
          }
        },
        scales: {
          y: {
            min: 0.714,
            max: 0.727,
            title: { display: true, text: "⁸⁷Sr/⁸⁶Sr" },
            ticks: { callback: v => srFormat(v, 4) }
          },
          x: {
            title: {
              display: true,
              text: lang === "gl" ? "Punto de mostraxe (augas arriba → desembocadura)" : "Sampling point (upstream → outlet)"
            }
          }
        }
      }
    });
  }

  renderSrTable();
  renderSrStats();
}

function renderSrTable() {
  const table = document.getElementById("sr-table");
  if (!table || typeof srIsotopes === "undefined") return;
  const lang = srLang();

  const head = lang === "gl"
    ? ["Mostra", "Matriz", "Punto", "⁸⁷Sr/⁸⁶Sr", "Precisión interna"]
    : ["Sample", "Matrix", "Point", "⁸⁷Sr/⁸⁶Sr", "Internal precision"];

  const order = Object.keys(SR_MATRICES);
  const rows = [...srIsotopes].sort((a, b) =>
    order.indexOf(a.matrix) - order.indexOf(b.matrix) || a.point - b.point
  );

  const body = rows.map(r => `
    <tr>
      <td><strong>${r.id}</strong></td>
      <td>${SR_MATRICES[r.matrix][lang]}</td>
      <td>${r.point} · ${srPointSites[r.point]} (${SR_POINT_ZONES[r.point][lang]})</td>
      <td>${srFormat(r.ratio, 5)}</td>
      <td>± ${srFormat(r.precision, 5)}</td>
    </tr>`).join("");

  table.innerHTML = `<thead><tr>${head.map(h => `<th>${h}</th>`).join("")}</tr></thead><tbody>${body}</tbody>`;
}

function renderSrStats() {
  const container = document.getElementById("sr-stats");
  if (!container || typeof srIsotopes === "undefined") return;
  const lang = srLang();

  const cards = Object.entries(SR_MATRICES).map(([key, m]) => {
    const vals = srIsotopes.filter(r => r.matrix === key).map(r => r.ratio);
    const mean = vals.reduce((a, b) => a + b, 0) / vals.length;
    const sd = Math.sqrt(vals.reduce((a, b) => a + (b - mean) ** 2, 0) / (vals.length - 1));
    return `
      <div class="stat-card">
        <div class="stat-label">${m[lang]} (n = ${vals.length})</div>
        <div class="stat-value">${srFormat(mean, 4)} ± ${srFormat(sd, 4)}</div>
      </div>`;
  }).join("");

  const ref = srReference;
  const refLabel = `NIST SRM 987 (2SD, n = ${ref.n})`;
  const refCard = `
    <div class="stat-card">
      <div class="stat-label">${refLabel}</div>
      <div class="stat-value">${srFormat(ref.measured, 5)} ± ${srFormat(ref.sd2, 5)}</div>
    </div>`;

  container.innerHTML = cards + refCard;
}