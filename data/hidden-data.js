// ===== Datos agochados temporalmente na web =====
// Non se borra nada: os valores seguen no ficheiro data/full-results.js.
// Para volver amosalos, pon a bandeira correspondente a false (e recarga).

// Pb en sedimentos e biota (mg/kg): valores moi superiores aos de referencia,
// pendentes de revisión co laboratorio antes de amosalos.
const HIDE_PB_SOLIDS = true;

if (HIDE_PB_SOLIDS) {
  const waterIds = ["1", "2", "3", "4", "5"]; // as augas da campaña 2 (µg/L) consérvanse
  resultsCampaign2.forEach(row => {
    if (!waterIds.includes(row.id)) delete row["208Pb"];
  });
}