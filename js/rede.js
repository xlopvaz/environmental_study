function renderRedeGraph() {
  const container = document.getElementById("rede-svg-wrapper");
  if (!container) return;

  const threshold = parseFloat(document.getElementById("rede-threshold").value);
  const n = corrElements.length;
  const width = 600, height = 600, cx = width / 2, cy = height / 2, radius = 220;

  const positions = corrElements.map((el, i) => {
    const angle = (i / n) * 2 * Math.PI - Math.PI / 2;
    return { el, x: cx + radius * Math.cos(angle), y: cy + radius * Math.sin(angle) };
  });

  let svg = `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" class="rede-svg">`;

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const value = corrMatrix[corrElements[i]][corrElements[j]];
      if (Math.abs(value) < threshold) continue;

      const p1 = positions[i], p2 = positions[j];
      const color = value >= 0 ? "#3e6d9e" : "#c0392b";
      const strokeWidth = 1 + Math.abs(value) * 5;
      const opacity = 0.35 + Math.abs(value) * 0.5;

      svg += `<line x1="${p1.x}" y1="${p1.y}" x2="${p2.x}" y2="${p2.y}"
        stroke="${color}" stroke-width="${strokeWidth}" stroke-opacity="${opacity}">
        <title>${p1.el} — ${p2.el}: ρ = ${value.toFixed(2)}</title>
      </line>`;
    }
  }

  positions.forEach(p => {
    svg += `<circle cx="${p.x}" cy="${p.y}" r="20" fill="#1c3d5a" stroke="white" stroke-width="2"/>`;
    svg += `<text x="${p.x}" y="${p.y + 5}" text-anchor="middle" font-size="13" font-weight="700" fill="white">${p.el}</text>`;
  });

  svg += `</svg>`;
  container.innerHTML = svg;
}

const redeThresholdEl = document.getElementById("rede-threshold");
if (redeThresholdEl) {
  redeThresholdEl.addEventListener("input", () => {
    document.getElementById("rede-threshold-value").textContent = parseFloat(redeThresholdEl.value).toFixed(2).replace(".", ",");
    renderRedeGraph();
  });
}

renderRedeGraph();