// ===== Traducións engadidas (cárgase DESPOIS de translations.js e ANTES de main.js) =====
// Engade as claves novas e SOBRESCRIBE as que xa existían co mesmo nome
// (resultados.aviso e resultados.liveNota). Se algún día queres cambiar un destes
// textos, cámbiao AQUÍ (non en translations.js, que este arquivo pisaría).

Object.assign(translations.gl, {
  "resultados.aviso": "Os valores do escenario Húmido (150 % de choiva) son os medidos na campaña de marzo de 2026 mediante ICP-MS-TOF no CACTI (Universidade de Vigo). Os demais valores do mapa son estimacións dun modelo de dilución baseado nunha correlación empírica e non substitúen unha medida real.",
  "resultados.sliderHint": "Move a barra ou elixe un escenario para estimar o As en cada punto. Fai clic nun punto do mapa para ver o seu valor.",
  "resultados.mediaRegato": "Media do regato (m1–m22)",
  "resultados.modeloNota": "Modelo de dilución: factor = 150 ÷ % de choiva acumulada (4 meses) respecto á referencia 1991–2020 (AEMET). Só marzo de 2026 (150 %) está medido; entre 50 % e 150 % son estimacións do modelo e fóra dese rango (zonas raiadas) son extrapolacións sen datos que as apoien. A media amósase ± desviación estándar entre os puntos m1–m22.",
  "resultados.badgeExp": "EXPERIMENTAL",
  "resultados.zonaModelo": "Rango contemplado polo modelo (50–150 %)",
  "resultados.zonaExtrap": "Extrapolación (sen datos)",
  "resultados.liveNota": "Estimación orientativa e experimental: compara a choiva dos últimos 120 días coa media de 10 anos para as mesmas datas (ERA5, Open-Meteo) e aplica un factor de dilución calibrado con só dúas campañas (marzo e setembro de 2026). Non segue o mesmo cálculo que a barra do mapa e non substitúe unha medida real."
});

Object.assign(translations.en, {
  "resultados.aviso": "The Wet scenario values (150% rainfall) are those measured in the March 2026 campaign by ICP-MS-TOF at CACTI (University of Vigo). All other map values are estimates from a dilution model based on an empirical correlation and do not replace an actual measurement.",
  "resultados.sliderHint": "Move the slider or pick a scenario to estimate As at each point. Click a point on the map to see its value.",
  "resultados.mediaRegato": "Stream mean (m1–m22)",
  "resultados.modeloNota": "Dilution model: factor = 150 ÷ % of accumulated rainfall (4 months) relative to the 1991–2020 reference (AEMET). Only March 2026 (150%) was measured; between 50% and 150% the values are model estimates, and outside that range (hatched zones) they are extrapolations with no data to support them. The mean is shown ± standard deviation between points m1–m22.",
  "resultados.badgeExp": "EXPERIMENTAL",
  "resultados.zonaModelo": "Range covered by the model (50–150%)",
  "resultados.zonaExtrap": "Extrapolation (no data)",
  "resultados.liveNota": "Indicative, experimental estimate: compares rainfall over the last 120 days with the 10-year average for the same dates (ERA5, Open-Meteo) and applies a dilution factor calibrated with only two campaigns (March and September 2026). It does not follow the same calculation as the map slider and does not replace an actual measurement."
});