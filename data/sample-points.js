// Puntos de muestreo del regato de Nogueiredo (campaña 1, marzo 2026)
// as = concentración medida de arsénico en µg/L (escenario húmedo, real)
const samplePoints = [
  {id:"m1",  lat:42.2782088, lon:-8.1040300, as:10.8},
  {id:"m2",  lat:42.2782943, lon:-8.1040156, as:11.8},
  {id:"m3",  lat:42.2783452, lon:-8.1040116, as:11.9},
  {id:"m4",  lat:42.2799182, lon:-8.1031717, as:11.9},
  {id:"m5",  lat:42.2802131, lon:-8.1029658, as:11.8},
  {id:"m6",  lat:42.2803446, lon:-8.1029427, as:11.7},
  {id:"m7",  lat:42.2804207, lon:-8.1029286, as:11.6},
  {id:"m8",  lat:42.2804857, lon:-8.1028904, as:11.7},
  {id:"m9",  lat:42.2805520, lon:-8.1028649, as:11.5},
  {id:"m10", lat:42.2806120, lon:-8.1028606, as:12.3},
  {id:"m11", lat:42.2806745, lon:-8.1028210, as:11.9},
  {id:"m12", lat:42.2807008, lon:-8.1028391, as:9.7},
  {id:"m13", lat:42.2806983, lon:-8.1028606, as:11.8},
  {id:"m14", lat:42.2812175, lon:-8.1029176, as:8.0},
  {id:"m15", lat:42.2814437, lon:-8.1029866, as:8.0},
  {id:"m16", lat:42.2816503, lon:-8.1030265, as:8.0},
  {id:"m17", lat:42.2817821, lon:-8.1030772, as:8.7},
  {id:"m18", lat:42.2819914, lon:-8.1031650, as:9.8},
  {id:"m19", lat:42.2861127, lon:-8.1027784, as:14.1},
  {id:"m20", lat:42.2865943, lon:-8.1023597, as:7.2},
  {id:"m21", lat:42.2881564, lon:-8.1028468, as:8.4},
  {id:"m22", lat:42.2886282, lon:-8.1031871, as:7.6},
  {id:"m23", lat:42.2930783, lon:-8.1010122, as:3.8},
  {id:"m24", lat:42.2913772, lon:-8.1041286, as:1.8},
  {id:"m25", lat:42.2906295, lon:-8.1163236, as:16.0}
];

// Factores de escala do modelo preditivo estacional
// Baseado na correlación de Spearman entre precipitación acumulada e [As] (ρ = -0,71; p = 0,048)
const scenarioFactors = {
  wet:    { factor: 1.0, maxScale: 20, rangeLabel: "7,6 – 16 µg/L" },
  normal: { factor: 1.5, maxScale: 30, rangeLabel: "11 – 24 µg/L" },
  dry:    { factor: 3.0, maxScale: 50, rangeLabel: "23 – 48 µg/L" }
};