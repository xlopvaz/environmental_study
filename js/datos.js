const SUPERSCRIPT_MAP = { "0":"⁰","1":"¹","2":"²","3":"³","4":"⁴","5":"⁵","6":"⁶","7":"⁷","8":"⁸","9":"⁹" };

function formatIsotope(isotope) {
  const match = isotope.match(/^(\d+)([A-Za-z]+)$/);
  if (!match) return isotope;
  const [, number, symbol] = match;
  const superNumber = number.split("").map(d => SUPERSCRIPT_MAP[d]).join("");
  return `${superNumber}${symbol}`;
}

const ALL_ISOTOPE_KEYS = [
  "24Mg","44Ca","51V","55Mn","54Fe","59Co","60Ni","63Cu","66Zn","69Ga",
  "75As","78Se","85Rb","88Sr","95Mo","107Ag","111Cd","137Ba","138Ba",
  "182W","203Tl","205Tl","208Pb","209Bi","238U"
];

function buildDataTable(tableId, data, hasPointCol) {
  const table = document.getElementById(tableId);
  if (!table) return;

  const usedElements = ALL_ISOTOPE_KEYS.filter(el => data.some(row => row[el]));

  let thead = "<thead><tr><th>ID</th>";
  if (hasPointCol) thead += "<th>Punto</th>";
  usedElements.forEach(el => thead += `<th>${formatIsotope(el)}</th>`);
  thead += "</tr></thead>";

  let tbody = "<tbody>";
  data.forEach(row => {
    tbody += `<tr><td class="data-id-cell">${row.id}</td>`;
    if (hasPointCol) tbody += `<td>${row.point || "—"}</td>`;
    usedElements.forEach(el => {
      if (row[el]) {
        const [val, rsd] = row[el];
        tbody += `<td>${val}<span class="rsd-tag">±${rsd}%</span></td>`;
      } else {
        tbody += `<td class="empty-cell">—</td>`;
      }
    });
    tbody += "</tr>";
  });
  tbody += "</tbody>";

  table.innerHTML = thead + tbody;
}

function filterDataTable(searchInputId, tableId, data, hasPointCol) {
  const query = document.getElementById(searchInputId).value.trim().toUpperCase();
  if (!query) {
    buildDataTable(tableId, data, hasPointCol);
    return;
  }
  const filtered = data.filter(row =>
    row.id.toString().toUpperCase().includes(query) ||
    (row.point && row.point.toUpperCase().includes(query)) ||
    Object.keys(row).some(k => k.toUpperCase() === query)
  );
  buildDataTable(tableId, filtered, hasPointCol);
}

function renderDataTables() {
  buildDataTable("table-waters1", resultsWaters1, false);
  buildDataTable("table-campaign2", resultsCampaign2, true);
}

const searchEl1 = document.getElementById("datos-search-1");
const searchEl2 = document.getElementById("datos-search-2");
if (searchEl1) searchEl1.addEventListener("input", () => filterDataTable("datos-search-1", "table-waters1", resultsWaters1, false));
if (searchEl2) searchEl2.addEventListener("input", () => filterDataTable("datos-search-2", "table-campaign2", resultsCampaign2, true));

renderDataTables();

// Mapa pequeño de referencia con la localización dos 25 puntos de mostraxe
let miniMap = null;
function renderMiniMap() {
  const container = document.getElementById("datos-mini-map");
  if (!container || miniMap) return;

  miniMap = L.map('datos-mini-map', { center: [42.284, -8.112], zoom: 13, scrollWheelZoom: false });
  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap &copy; CARTO', subdomains: 'abcd', maxZoom: 19
  }).addTo(miniMap);

  samplePoints.forEach(p => {
    L.circleMarker([p.lat, p.lon], {
      radius: 5, fillColor: "#1c3d5a", color: "#fff", weight: 1, fillOpacity: 0.9
    }).addTo(miniMap).bindTooltip(p.id.toUpperCase(), { permanent: false });
  });
}
renderMiniMap();