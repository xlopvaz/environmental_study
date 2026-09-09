// ===== Función gamma (aproximación de Lanczos) =====
function logGamma(x) {
  const g = 7;
  const coef = [
    0.99999999999980993, 676.5203681218851, -1259.1392167224028,
    771.32342877765313, -176.61502916214059, 12.507343278686905,
    -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7
  ];
  if (x < 0.5) {
    return Math.log(Math.PI / Math.sin(Math.PI * x)) - logGamma(1 - x);
  }
  x -= 1;
  let a = coef[0];
  const t = x + g + 0.5;
  for (let i = 1; i < g + 2; i++) a += coef[i] / (x + i);
  return 0.5 * Math.log(2 * Math.PI) + (x + 0.5) * Math.log(t) - t + Math.log(a);
}

// ===== Función gamma incompleta regularizada (inferior) P(a,x) =====
function gammaIncLower(a, x) {
  if (x < 0) return 0;
  if (x === 0) return 0;

  if (x < a + 1) {
    let sum = 1 / a, term = sum, n = a;
    for (let i = 0; i < 200; i++) {
      n += 1;
      term *= x / n;
      sum += term;
      if (Math.abs(term) < Math.abs(sum) * 1e-12) break;
    }
    return sum * Math.exp(-x + a * Math.log(x) - logGamma(a));
  } else {
    let b = x + 1 - a, c = 1e308, d = 1 / b, h = d;
    for (let i = 1; i < 200; i++) {
      const an = -i * (i - a);
      b += 2;
      d = an * d + b;
      if (Math.abs(d) < 1e-30) d = 1e-30;
      c = b + an / c;
      if (Math.abs(c) < 1e-30) c = 1e-30;
      d = 1 / d;
      const del = d * c;
      h *= del;
      if (Math.abs(del - 1) < 1e-12) break;
    }
    const upper = Math.exp(-x + a * Math.log(x) - logGamma(a)) * h;
    return 1 - upper;
  }
}

function chiSquarePValue(chiSq, df) {
  if (chiSq <= 0) return 1;
  return 1 - gammaIncLower(df / 2, chiSq / 2);
}

// ===== Kruskal-Wallis =====
function kruskalWallis(groups) {
  const allValues = [];
  groups.forEach((g, gi) => g.forEach(v => allValues.push({ value: v, group: gi })));

  allValues.sort((a, b) => a.value - b.value);

  const ranks = new Array(allValues.length);
  let i = 0;
  const tieGroupSizes = [];
  while (i < allValues.length) {
    let j = i;
    while (j < allValues.length - 1 && allValues[j + 1].value === allValues[i].value) j++;
    const avgRank = (i + j) / 2 + 1;
    for (let k = i; k <= j; k++) ranks[k] = avgRank;
    if (j > i) tieGroupSizes.push(j - i + 1);
    i = j + 1;
  }

  const N = allValues.length;
  const rankSumByGroup = new Array(groups.length).fill(0);
  allValues.forEach((item, idx) => { rankSumByGroup[item.group] += ranks[idx]; });

  let H = 0;
  groups.forEach((g, gi) => {
    if (g.length > 0) H += (rankSumByGroup[gi] ** 2) / g.length;
  });
  H = (12 / (N * (N + 1))) * H - 3 * (N + 1);

  const tieCorrection = 1 - tieGroupSizes.reduce((sum, t) => sum + (t ** 3 - t), 0) / (N ** 3 - N);
  if (tieCorrection > 0) H = H / tieCorrection;

  const df = groups.filter(g => g.length > 0).length - 1;
  const pValue = chiSquarePValue(H, df);

  return { H, df, pValue, N };
}

// ===== Interfaz =====
function getKwElements() {
  const keys = new Set();
  resultsCampaign2.forEach(row => Object.keys(row).forEach(k => { if (k !== "id" && k !== "point") keys.add(k); }));
  return Array.from(keys).sort();
}

function populateKwSelect() {
  const select = document.getElementById("kw-element-select");
  if (!select) return;
  const elements = getKwElements();
  select.innerHTML = elements.map(el => `<option value="${el}">${formatIsotope(el)}</option>`).join("");
  select.value = "75As";
  select.addEventListener("change", () => renderKwResult(select.value));
}

function renderKwResult(isotope) {
  const container = document.getElementById("kw-result");
  if (!container) return;
  const lang = currentLang === "gl" ? "gl" : "en";

  const groups = MATRIX_GROUPS.map(g => {
    return g.ids
      .map(id => {
        const row = resultsCampaign2.find(r => r.id === id);
        return row && row[isotope] ? row[isotope][0] : null;
      })
      .filter(v => v !== null);
  });

  const validGroups = groups.filter(g => g.length > 0);
  if (validGroups.length < 2) {
    container.innerHTML = `<p>${lang === "gl" ? "Non hai datos suficientes para este elemento." : "Not enough data for this element."}</p>`;
    return;
  }

  const { H, df, pValue, N } = kruskalWallis(groups);
  const significant = pValue < 0.05;

  const labels = {
    gl: {
      hStat: "Estatístico H", df: "Graos de liberdade", pVal: "p-valor", nTotal: "N total",
      sig: "Diferenza estatisticamente significativa (p < 0,05)",
      notSig: "Non hai diferenza estatisticamente significativa (p ≥ 0,05)",
      groupSizes: "Tamaño de cada grupo (n)"
    },
    en: {
      hStat: "H statistic", df: "Degrees of freedom", pVal: "p-value", nTotal: "Total N",
      sig: "Statistically significant difference (p < 0.05)",
      notSig: "No statistically significant difference (p ≥ 0.05)",
      groupSizes: "Size of each group (n)"
    }
  };
  const l = labels[lang];

  const groupSizesHtml = MATRIX_GROUPS.map((g, i) => `${g[lang]}: n=${groups[i].length}`).join(" · ");

  container.innerHTML = `
    <div class="kw-stats-grid">
      <div class="stat-card"><div class="stat-label">${l.hStat}</div><div class="stat-value">${H.toFixed(3)}</div></div>
      <div class="stat-card"><div class="stat-label">${l.df}</div><div class="stat-value">${df}</div></div>
      <div class="stat-card"><div class="stat-label">${l.pVal}</div><div class="stat-value">${pValue < 0.001 ? "< 0,001" : pValue.toFixed(3)}</div></div>
      <div class="stat-card"><div class="stat-label">${l.nTotal}</div><div class="stat-value">${N}</div></div>
    </div>
    <div class="kw-verdict ${significant ? 'kw-sig' : 'kw-nosig'}">
      ${significant ? "✓ " + l.sig : "○ " + l.notSig}
    </div>
    <p class="map-note">${l.groupSizes}: ${groupSizesHtml}</p>
  `;
}

populateKwSelect();
renderKwResult("75As");