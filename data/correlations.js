// Matriz de correlacións de Spearman para as augas (Figura A1-A da memoria)
// N = 27 mostras. Matriz simétrica; a diagonal principal é sempre 1.
const corrElements = ["Ca", "Fe", "Co", "Ni", "Zn", "Ga", "As", "Rb", "Sr", "Ba", "Tl", "Pb", "U"];

const corrMatrix = {
  Ca: { Ca: 1.00, Fe: 0.59, Co: 0.73, Ni: 0.65, Zn: 0.68, Ga: 0.94, As: -0.68, Rb: 0.65, Sr: 0.83, Ba: 0.84, Tl: 0.61, Pb: 0.42, U: -0.64 },
  Fe: { Ca: 0.59, Fe: 1.00, Co: 0.75, Ni: 0.71, Zn: 0.71, Ga: 0.71, As: -0.43, Rb: 0.35, Sr: 0.47, Ba: 0.55, Tl: 0.74, Pb: 0.35, U: -0.17 },
  Co: { Ca: 0.73, Fe: 0.75, Co: 1.00, Ni: 0.85, Zn: 0.86, Ga: 0.86, As: -0.48, Rb: 0.47, Sr: 0.61, Ba: 0.79, Tl: 0.85, Pb: 0.67, U: -0.23 },
  Ni: { Ca: 0.65, Fe: 0.71, Co: 0.85, Ni: 1.00, Zn: 0.70, Ga: 0.77, As: -0.46, Rb: 0.58, Sr: 0.71, Ba: 0.80, Tl: 0.73, Pb: 0.56, U: -0.28 },
  Zn: { Ca: 0.68, Fe: 0.71, Co: 0.86, Ni: 0.70, Zn: 1.00, Ga: 0.74, As: -0.22, Rb: 0.43, Sr: 0.56, Ba: 0.67, Tl: 0.63, Pb: 0.60, U: -0.23 },
  Ga: { Ca: 0.94, Fe: 0.71, Co: 0.86, Ni: 0.77, Zn: 0.74, Ga: 1.00, As: -0.71, Rb: 0.61, Sr: 0.81, Ba: 0.89, Tl: 0.72, Pb: 0.41, U: -0.58 },
  As: { Ca: -0.68, Fe: -0.43, Co: -0.48, Ni: -0.46, Zn: -0.22, Ga: -0.71, As: 1.00, Rb: -0.20, Sr: -0.57, Ba: -0.62, Tl: -0.25, Pb: -0.21, U: 0.55 },
  Rb: { Ca: 0.65, Fe: 0.35, Co: 0.47, Ni: 0.58, Zn: 0.43, Ga: 0.61, As: -0.20, Rb: 1.00, Sr: 0.82, Ba: 0.70, Tl: 0.55, Pb: 0.33, U: -0.40 },
  Sr: { Ca: 0.83, Fe: 0.47, Co: 0.61, Ni: 0.71, Zn: 0.56, Ga: 0.81, As: -0.57, Rb: 0.82, Sr: 1.00, Ba: 0.91, Tl: 0.58, Pb: 0.44, U: -0.57 },
  Ba: { Ca: 0.84, Fe: 0.55, Co: 0.79, Ni: 0.80, Zn: 0.67, Ga: 0.89, As: -0.62, Rb: 0.70, Sr: 0.91, Ba: 1.00, Tl: 0.62, Pb: 0.51, U: -0.51 },
  Tl: { Ca: 0.61, Fe: 0.74, Co: 0.85, Ni: 0.73, Zn: 0.63, Ga: 0.72, As: -0.25, Rb: 0.55, Sr: 0.58, Ba: 0.62, Tl: 1.00, Pb: 0.59, U: -0.12 },
  Pb: { Ca: 0.42, Fe: 0.35, Co: 0.67, Ni: 0.56, Zn: 0.60, Ga: 0.41, As: -0.21, Rb: 0.33, Sr: 0.44, Ba: 0.51, Tl: 0.59, Pb: 1.00, U: -0.07 },
  U:  { Ca: -0.64, Fe: -0.17, Co: -0.23, Ni: -0.28, Zn: -0.23, Ga: -0.58, As: 0.55, Rb: -0.40, Sr: -0.57, Ba: -0.51, Tl: -0.12, Pb: -0.07, U: 1.00 }
};