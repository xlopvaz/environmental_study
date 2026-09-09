// Cada organismo/matriz biolóxica vinculado ao seu punto e ao sedimento correspondente
const BAF_ORGANISMS = [
  { id: "L1", point: "P8",  type: { gl: "Miñoca", en: "Earthworm" } },
  { id: "L2", point: "P22", type: { gl: "Miñoca", en: "Earthworm" } },
  { id: "L3", point: "P25", type: { gl: "Miñoca", en: "Earthworm" } },
  { id: "H1", point: "P8",  type: { gl: "Folla", en: "Leaf" } },
  { id: "H2", point: "P14", type: { gl: "Folla", en: "Leaf" } },
  { id: "H3", point: "P22", type: { gl: "Folla", en: "Leaf" } },
  { id: "H4", point: "P24", type: { gl: "Folla", en: "Leaf" } },
  { id: "H5", point: "P25", type: { gl: "Folla", en: "Leaf" } },
  { id: "M1", point: "P14", type: { gl: "Madeira", en: "Wood" } },
  { id: "M2", point: "P25", type: { gl: "Madeira", en: "Wood" } }
];

// Sedimento total (S) e biodispoñible (SB) por punto
const SEDIMENT_BY_POINT = {
  "P8":  { total: "S1", bio: "SB1" },
  "P14": { total: "S2", bio: "SB2" },
  "P22": { total: "S3", bio: "SB3" },
  "P24": { total: "S4", bio: "SB4" },
  "P25": { total: "S5", bio: "SB5" }
};

function getBafElements() {
  const keys = new Set();
  resultsCampaign2.forEach(row => {
    Object.keys(row).forEach(k => { if (k !== "id" && k !== "point") keys.add(k); });
  });
  return Array.from(keys).sort();
}

function populateBafSelect() {
  const select = document.getElementById("baf-element-select");
  if (!select) return;
  const elements = getBafElements();
  select.innerHTML = elements.map(el => `<option value="${el}">${formatIsotope(el)}</option>`).join("");
  select.value = "75As";
  select.addEventListener("change", () => renderBafTable(select.value));
}

function findRow(id) {
  return resultsCampaign2.find(r => r.id === id);
}

function renderBafTable(isotope) {
  const lang = currentLang === "gl" ? "gl" : "en";
  const table = document.getElementById("baf-table");
  if (!table) return;

  const labels = {
    gl: { type: "Matriz", id: "Mostra", point: "Punto", org: "Concentración (mg/kg)", sedTotal: "Sedimento total (mg/kg)", bafTotal: "BAF (vs. total)", sedBio: "Sed. biodispoñible (mg/kg)", bafBio: "BAF (vs. biodispoñible)" },
    en: { type: "Matrix", id: "Sample", point: "Point", org: "Concentration (mg/kg)", sedTotal: "Total sediment (mg/kg)", bafTotal: "BAF (vs. total)", sedBio: "Bioavail. sediment (mg/kg)", bafBio: "BAF (vs. bioavailable)" }
  };
  const l = labels[lang];

  let thead = `<thead><tr><th>${l.type}</th><th>${l.id}</th><th>${l.point}</th><th>${l.org}</th><th>${l.sedTotal}</th><th>${l.bafTotal}</th><th>${l.sedBio}</th><th>${l.bafBio}</th></tr></thead>`;
  let tbody = "<tbody>";

  BAF_ORGANISMS.forEach(org => {
    const orgRow = findRow(org.id);
    const sedInfo = SEDIMENT_BY_POINT[org.point];
    const sedTotalRow = findRow(sedInfo.total);
    const sedBioRow = findRow(sedInfo.bio);

    const orgVal = orgRow && orgRow[isotope] ? orgRow[isotope][0] : null;
    const sedTotalVal = sedTotalRow && sedTotalRow[isotope] ? sedTotalRow[isotope][0] : null;
    const sedBioVal = sedBioRow && sedBioRow[isotope] ? sedBioRow[isotope][0] : null;

    const bafTotal = (orgVal !== null && sedTotalVal) ? (orgVal / sedTotalVal) : null;
    const bafBio = (orgVal !== null && sedBioVal) ? (orgVal / sedBioVal) : null;

    const dash = "—";
    tbody += `<tr>
      <td>${org.type[lang]}</td>
      <td class="data-id-cell">${org.id}</td>
      <td>${org.point}</td>
      <td>${orgVal !== null ? orgVal : dash}</td>
      <td>${sedTotalVal !== null && sedTotalVal !== undefined ? sedTotalVal : dash}</td>
      <td class="${bafTotal > 1 ? 'baf-high' : bafTotal !== null ? 'baf-low' : ''}">${bafTotal !== null ? bafTotal.toFixed(3) : dash}</td>
      <td>${sedBioVal !== null && sedBioVal !== undefined ? sedBioVal : dash}</td>
      <td class="${bafBio > 1 ? 'baf-high' : bafBio !== null ? 'baf-low' : ''}">${bafBio !== null ? bafBio.toFixed(3) : dash}</td>
    </tr>`;
  });

  tbody += "</tbody>";
  table.innerHTML = thead + tbody;
}

populateBafSelect();
renderBafTable("75As");