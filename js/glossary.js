function renderGlossary(filter = "") {
  const container = document.getElementById("glossary-list");
  if (!container) return;

  const lang = currentLang === "gl" ? "gl" : "en";
  const filterLower = filter.trim().toLowerCase();

  const filtered = glossaryTerms.filter(item =>
    item.termGl.toLowerCase().includes(filterLower) ||
    item.termEn.toLowerCase().includes(filterLower) ||
    item[lang].toLowerCase().includes(filterLower)
  );

  if (filtered.length === 0) {
    const noResults = { gl: "Non se atoparon termos.", en: "No terms found." };
    container.innerHTML = `<p class="glossary-empty">${noResults[lang]}</p>`;
    return;
  }

  container.innerHTML = filtered.map(item => `
    <div class="glossary-item">
      <div class="glossary-term">${lang === "gl" ? item.termGl : item.termEn}</div>
      <div class="glossary-def">${item[lang]}</div>
    </div>
  `).join("");
}

const glossarySearchEl = document.getElementById("glossary-search");
if (glossarySearchEl) {
  glossarySearchEl.addEventListener("input", (e) => renderGlossary(e.target.value));
}

renderGlossary();