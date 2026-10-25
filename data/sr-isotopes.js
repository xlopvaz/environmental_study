// Relación isotópica 87Sr/86Sr medida por MC-ICP-MS (CACTI, Universidade de Vigo)
// Segunda campaña (12/03/2026). Fonte: Táboa A6 da memoria.
// point = punto de mostraxe 1-5 (augas arriba -> desembocadura): 1 = P8, 2 = P14, 3 = P22, 4 = P24, 5 = P25
// precision = precisión interna da medida
const srIsotopes = [
  // Augas
  { id: "A1", matrix: "water", point: 1, ratio: 0.72589, precision: 0.00014 },
  { id: "A2", matrix: "water", point: 2, ratio: 0.72404, precision: 0.00011 },
  { id: "A3", matrix: "water", point: 3, ratio: 0.72375, precision: 0.00013 },
  { id: "A4", matrix: "water", point: 4, ratio: 0.71778, precision: 0.00013 },
  { id: "A5", matrix: "water", point: 5, ratio: 0.71624, precision: 0.00014 },
  // Follas
  { id: "H1", matrix: "leaves", point: 1, ratio: 0.72500, precision: 0.00012 },
  { id: "H2", matrix: "leaves", point: 2, ratio: 0.72247, precision: 0.00012 },
  { id: "H3", matrix: "leaves", point: 3, ratio: 0.72179, precision: 0.00016 },
  { id: "H4", matrix: "leaves", point: 4, ratio: 0.72035, precision: 0.00012 },
  { id: "H5", matrix: "leaves", point: 5, ratio: 0.72065, precision: 0.00014 },
  // Madeira
  { id: "M1", matrix: "wood", point: 2, ratio: 0.72335, precision: 0.00011 },
  { id: "M2", matrix: "wood", point: 5, ratio: 0.72237, precision: 0.00009 },
  // Miñocas
  { id: "L1", matrix: "earthworms", point: 1, ratio: 0.72464, precision: 0.00012 },
  { id: "L2", matrix: "earthworms", point: 3, ratio: 0.71549, precision: 0.00010 },
  { id: "L3", matrix: "earthworms", point: 5, ratio: 0.71825, precision: 0.00013 }
];

const srPointSites = { 1: "P8", 2: "P14", 3: "P22", 4: "P24", 5: "P25" };

// Material de referencia isotópico NIST SRM 987 (control de calidade)
const srReference = { measured: 0.71040, sd2: 0.00003, n: 30, certified: 0.71034, certifiedU: 0.00026 };