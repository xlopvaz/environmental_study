const PCA_ELEMENTS = ["44Ca", "54Fe", "59Co", "60Ni", "69Ga", "75As", "85Rb", "88Sr", "137Ba", "238U"];

// ===== Álxebra matricial mínima necesaria =====
function transpose(m) { return m[0].map((_, i) => m.map(row => row[i])); }
function matMulVec(m, v) { return m.map(row => row.reduce((s, x, i) => s + x * v[i], 0)); }
function dot(a, b) { return a.reduce((s, x, i) => s + x * b[i], 0); }
function norm(v) { return Math.sqrt(dot(v, v)); }

// Iteración de potencias: atopa o autovector dominante e o seu autovalor
function powerIteration(matrix, iterations = 200) {
  const n = matrix.length;
  let v = new Array(n).fill(1 / Math.sqrt(n)); // vector inicial fixo (determinista)
  for (let i = 0; i < iterations; i++) {
    const v2 = matMulVec(matrix, v);
    const mag = norm(v2);
    v = v2.map(x => x / mag);
  }
  const Av = matMulVec(matrix, v);
  const eigenvalue = dot(v, Av);
  return { vector: v, value: eigenvalue };
}

// Deflación: elimina a compoñente xa atopada para poder atopar a seguinte
function deflate(matrix, eigenvalue, eigenvector) {
  const n = matrix.length;
  const result = [];
  for (let i = 0; i < n; i++) {
    const row = [];
    for (let j = 0; j < n; j++) {
      row.push(matrix[i][j] - eigenvalue * eigenvector[i] * eigenvector[j]);
    }
    result.push(row);
  }
  return result;
}

function computePCA(dataMatrix) {
  const n = dataMatrix.length;       // número de mostras
  const p = dataMatrix[0].length;    // número de elementos

  // Estandarización (media 0, desviación típica 1) por columna
  const means = [], stds = [];
  for (let j = 0; j < p; j++) {
    const col = dataMatrix.map(row => row[j]);
    const mean = col.reduce((a, b) => a + b, 0) / n;
    const std = Math.sqrt(col.reduce((a, b) => a + (b - mean) ** 2, 0) / (n - 1));
    means.push(mean); stds.push(std);
  }
  const Z = dataMatrix.map(row => row.map((x, j) => (x - means[j]) / stds[j]));

  // Matriz de covarianza (= correlación, xa que os datos están estandarizados)
  const Zt = transpose(Z);
  const cov = [];
  for (let i = 0; i < p; i++) {
    const row = [];
    for (let j = 0; j < p; j++) {
      row.push(dot(Zt[i], Zt[j]) / (n - 1));
    }
    cov.push(row);
  }

  const pc1 = powerIteration(cov);
  const covDeflated = deflate(cov, pc1.value, pc1.vector);
  const pc2 = powerIteration(covDeflated);

  const totalVariance = p; // p variables estandarizadas -> varianza total = p
  const varExplained1 = (pc1.value / totalVariance) * 100;
  const varExplained2 = (pc2.value / totalVariance) * 100;

  const scores = Z.map(row => [dot(row, pc1.vector), dot(row, pc2.vector)]);
  const loadings = PCA_ELEMENTS.map((el, j) => [pc1.vector[j] * Math.sqrt(pc1.value), pc2.vector[j] * Math.sqrt(pc2.value)]);

  return { scores, loadings, varExplained1, varExplained2 };
}

function renderPcaBiplot() {
  const container = document.getElementById("pca-biplot-container");
  if (!container) return;

  const dataMatrix = resultsWaters1.map(row => PCA_ELEMENTS.map(el => row[el][0]));
  const { scores, loadings, varExplained1, varExplained2 } = computePCA(dataMatrix);

  const width = 700, height = 500, cx = width / 2, cy = height / 2;
  const maxScore = Math.max(...scores.flat().map(Math.abs));
  const maxLoading = Math.max(...loadings.flat().map(Math.abs));
  const scoreScale = (width / 2 - 60) / maxScore;
  const loadingScale = (width / 2 - 80) / maxLoading;

  let svg = `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" class="pca-svg">`;
  svg += `<line x1="0" y1="${cy}" x2="${width}" y2="${cy}" stroke="#ddd" stroke-width="1"/>`;
  svg += `<line x1="${cx}" y1="0" x2="${cx}" y2="${height}" stroke="#ddd" stroke-width="1"/>`;

  loadings.forEach(([lx, ly], i) => {
    const x = cx + lx * loadingScale;
    const y = cy - ly * loadingScale;
    svg += `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="#c0793b" stroke-width="1.5" marker-end="url(#arrowhead)"/>`;
    svg += `<text x="${x + (lx >= 0 ? 4 : -4)}" y="${y}" font-size="12" fill="#a8631f" font-weight="700" text-anchor="${lx >= 0 ? 'start' : 'end'}">${PCA_ELEMENTS[i].replace(/^\d+/, '')}</text>`;
  });

  resultsWaters1.forEach((row, i) => {
    const [sx, sy] = scores[i];
    const x = cx + sx * scoreScale;
    const y = cy - sy * scoreScale;
    svg += `<circle cx="${x}" cy="${y}" r="4" fill="#1c3d5a" fill-opacity="0.75" stroke="white" stroke-width="1"><title>${row.id.toUpperCase()}</title></circle>`;
    svg += `<text x="${x}" y="${y - 6}" font-size="8" fill="#1c3d5a" text-anchor="middle">${row.id.replace('m','')}</text>`;
  });

  svg += `<defs><marker id="arrowhead" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><polygon points="0 0, 8 4, 0 8" fill="#c0793b"/></marker></defs>`;
  svg += `</svg>`;

  container.innerHTML = svg;

  const lang = currentLang === "gl" ? "gl" : "en";
  const noteText = lang === "gl"
    ? `PC1 explica un ${varExplained1.toFixed(1)}% da variabilidade e PC2 un ${varExplained2.toFixed(1)}% (${(varExplained1 + varExplained2).toFixed(1)}% acumulado).`
    : `PC1 explains ${varExplained1.toFixed(1)}% of variability and PC2 ${varExplained2.toFixed(1)}% (${(varExplained1 + varExplained2).toFixed(1)}% cumulative).`;
  const noteEl = document.getElementById("pca-variance-note");
  if (noteEl) noteEl.textContent = noteText;
}

renderPcaBiplot();