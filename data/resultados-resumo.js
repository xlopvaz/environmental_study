const resultadosResumoItems = [
  {
    gl: {
      title: "Arsénico ao longo do regato",
      bullets: [
        "Curso alto: 9,7–12,3 µg/L, case todos os puntos por riba de 10 µg/L*",
        "Curso medio e baixo: maioritariamente 7,2–9,8 µg/L, cun pico local de 14,1 µg/L",
        "Río Miño: 3,8 → 1,8 µg/L. O problema do As reside no regato e dilúese ao chegar ao Miño",
        "Diferenzas significativas entre zonas (Kruskal-Wallis χ² = 14,5, p = 0,002)",
        "*Auga do regato sen tratar; o límite amósase como referencia."
      ]
    },
    en: {
      title: "Arsenic along the stream",
      bullets: [
        "Upper course: 9.7–12.3 µg/L, almost all sites above 10 µg/L*",
        "Middle and lower course: mostly 7.2–9.8 µg/L, with a local peak of 14.1 µg/L",
        "Miño River: 3.8 → 1.8 µg/L. The As problem lies in the stream and is diluted on reaching the Miño",
        "Significant differences between zones (Kruskal–Wallis χ² = 14.5, p = 0.002)",
        "*Untreated stream water; the limit is shown as a reference."
      ]
    }
  },
  {
    gl: {
      title: "A choiva dilúe o arsénico",
      bullets: [
        "O As está anticorrelacionado con elementos xeoxénicos: Ca (ρ=-0,68), Ga (-0,71), Ba (-0,62), Sr (-0,57)",
        "Datos históricos da auga de billa 2014-2026: máis choiva → menos As (ρ=-0,71, p<0,05)",
        "Os anos con menos As (2014, 2026) foron os de maior precipitación"
      ]
    },
    en: {
      title: "Rain dilutes arsenic",
      bullets: [
        "As anti-correlates with geogenic elements: Ca (ρ=-0.68), Ga (-0.71), Ba (-0.62), Sr (-0.57)",
        "Historical tap water data 2014-2026: more rain → less As (ρ=-0.71, p<0.05)",
        "Lowest As years (2014, 2026) = wettest periods"
      ]
    }
  },
  {
    gl: {
      title: "Foco termal e mineiro (augas abaixo da presa de Castrelo)",
      bullets: [
        "O As máis alto de todas as augas: 16 µg/L",
        "W de 46 µg/L, non atopado en ningún outro sitio → pegada das antigas minas de W",
        "Altos Sr, Rb e U → mestura da auga do río con fluídos hidrotermais"
      ]
    },
    en: {
      title: "Thermal and mining hotspot (below Castrelo dam)",
      bullets: [
        "Highest As of all waters: 16 µg/L",
        "W 46 µg/L, found nowhere else → fingerprint of the old W mines",
        "High Sr, Rb and U → river water mixing with hydrothermal fluids"
      ]
    }
  },
  {
    gl: {
      title: "Auga de consumo",
      bullets: [
        "As 1,1-1,3 µg/L → cumpre ✔ (coincide cos datos oficiais do SINAC: 2 µg/L)",
        "Estancamento nocturno: Cu ×5 (175 → 852 µg/L) procedente das tubaxes de cobre",
        "Fe e Zn diminuíron; Co, Ni, Pb, Ag e Sr estables (<10% de cambio)"
      ]
    },
    en: {
      title: "Tap water",
      bullets: [
        "As 1.1–1.3 µg/L → compliant ✔ (matches official SINAC data: 2 µg/L)",
        "Overnight stagnation: Cu ×5 (175 → 852 µg/L) from copper pipes",
        "Fe and Zn decreased; Co, Ni, Pb, Ag and Sr stable (< 10% change)"
      ]
    }
  },
  {
    gl: {
      title: "PCA: tres factores principais (73,1% da varianza)",
      bullets: [
        "As xeoxénico → curso alto e medio do regato (o As só no seu propio cuadrante)",
        "Achega mineira/hidrotermal → foco illado, asociado a Rb e U",
        "Control do Fe → desembocadura. O Fe óponse ao As, polo que os óxidos de Fe actúan como sumidoiro de As"
      ]
    },
    en: {
      title: "PCA: three drivers (73.1% of variance)",
      bullets: [
        "Geogenic As → upper and middle stream (As alone in its quadrant)",
        "Mining/hydrothermal input → hotspot isolated, associated with Rb and U",
        "Fe control → stream mouth. Fe opposes As, so Fe oxides act as an As sink"
      ]
    }
  },
  {
    gl: {
      title: "Sedimentos e biota",
      bullets: [
        "As: sedimentos e miñocas ≫ auga e follas (p<0,001)",
        "As no sedimento ata ~55 µg/g, totalmente ligado ao Fe (ρ=1,0, p=0,017) → os óxidos de Fe actúan como \"filtro natural\"",
        "O foco termal/mineiro é un reservorio de metais: W no sedimento ≈ 25.300 µg/g",
        "Miñocas do foco: As ×10 (~10 → 100 µg/g) e W ×8 (~350 → 2.774 µg/g)",
        "Menos As na auga pero máis nas miñocas → a exposición vén do sedimento histórico, non do fluxo actual",
        "A maior parte do W non é biodispoñible (total vs. biodispoñible, p<0,01)",
        "Follas > madeira para As, Ca, Fe, Sr e Zn, agás o W (madeira ≫ follas no foco)"
      ]
    },
    en: {
      title: "Sediments and biota",
      bullets: [
        "As: sediments and earthworms ≫ water and leaves (p < 0.001)",
        "Sediment As up to ~55 µg/g, fully linked to Fe (ρ=1.0, p=0.017) → Fe oxides act as a \"natural filter\"",
        "Thermal/mining site = metal reservoir: sediment W ≈ 25,300 µg/g",
        "Hotspot earthworms: As ×10 (~10 → 100 µg/g) and W ×8 (~350 → 2,774 µg/g)",
        "Less As in water but more in worms → exposure driven by legacy sediments, not current flow",
        "Most W is not bioavailable (total vs. bioavailable sediment, p<0.01)",
        "Leaves > wood for As, Ca, Fe, Sr and Zn, except W (wood ≫ leaves at the hotspot)"
      ]
    }
  },
  {
    gl: {
      title: "Isótopos de Sr: rastrexando a orixe",
      bullets: [
        "Sinatura moi radioxénica: 0,7155-0,7259 (codia continental antiga; media global dos ríos ≈ 0,712)",
        "A relación na auga diminúe aguas abaixo: 0,7259 → 0,7162 → mestura co río Miño",
        "Auga, follas e miñocas da cabeceira coinciden (0,7259 / 0,7250 / 0,7246) → sen fraccionamento biolóxico",
        "Sen diferenzas significativas entre matrices (p=0,85)",
        "Inversión do sinal: aguas arriba auga > follas; aguas abaixo follas > auga. As plantas conservan a sinatura do solo",
        "87Sr/86Sr relacionado inversamente coa relación Sr/Ca"
      ]
    },
    en: {
      title: "Sr isotopes: tracing the origin",
      bullets: [
        "Highly radiogenic signature: 0.7155–0.7259 (old continental crust; global river mean ≈ 0.712)",
        "Water ratios decrease downstream: 0.7259 → 0.7162 → mixing with the Miño River",
        "Headwater water, leaves and earthworms match (0.7259 / 0.7250 / 0.7246) → no biological fractionation",
        "No significant differences among matrices (p=0.85)",
        "Signal inversion: upstream water > leaves, downstream leaves > water. Plants keep the soil signature",
        "87Sr/86Sr inversely related to Sr/Ca"
      ]
    }
  },
  {
    gl: {
      title: "Modelo preditivo e plataforma web",
      bullets: [
        "Modelo de dilución pluviométrica baseado na precipitación acumulada de 4 meses",
        "Marzo 2026 (150% de choiva) = escenario de máxima dilución",
        "Ano normal: 11-24 µg/L · Ano seco: 23-48 µg/L",
        "Coherente co pico de 2019 (24 µg/L)",
        "Mapa interactivo e modelo en aberto, en galego e inglés (R Markdown · GitHub Pages)",
        "As estimacións son orientativas: o modelo asume unha dilución lineal"
      ]
    },
    en: {
      title: "Predictive model and web platform",
      bullets: [
        "Rainfall-dilution model based on 4-month cumulative precipitation",
        "March 2026 (150% rainfall) = maximum-dilution scenario",
        "Normal year: 11–24 µg/L · Dry year: 23–48 µg/L",
        "Consistent with the 2019 peak (24 µg/L)",
        "Open interactive map and model, in Galician and English (R Markdown · GitHub Pages)",
        "Estimates are indicative: the model assumes linear dilution"
      ]
    }
  }
];