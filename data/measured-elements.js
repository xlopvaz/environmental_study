// Datos químicos + resultados del estudio + efectos en salud, para cada elemento cuantificado
// Límites legales verificados contra el RD 3/2023 (Anexo I, Parte B)
const measuredElements = {
  As: {
    z: 33, mass: "74,92", catKey: "metalloid", states: "-3, +3, +5",
    rangeWater: "1,8 – 16 µg/L (n = 25/25) · billa / tap: 1,1 – 1,3 µg/L",
    lod: "0,03 µg/L", loq: "0,11 µg/L", legalLimit: "10 µg/L",
    gl: { nome: "Arsénico", matriz: "Augas, sedimentos, follas, madeira, miñocas",
      nota: "Elemento central do estudo. Detectáronse ata 24 µg/L en auga de consumo en 2019. A súa variabilidade espacial está ligada á litoloxía local e á influencia mineira/hidrotermal. Bioacumúlase fortemente en miñocas e sedimentos (ata ~100 mg/kg na zona termal). Correlación negativa co Ca (ρ=-0,68) e coa precipitación acumulada (ρ=-0,71).",
      saude: "Clasificado como cancerígeno humano do Grupo 1 (IARC). A exposición crónica a través da auga de consumo asóciase con cancros de pel, pulmón e vexiga, ademais de lesións cutáneas (hiperqueratose) e efectos cardiovasculares. Non ten función biolóxica coñecida no ser humano." },
    en: { name: "Arsenic", matrix: "Water, sediment, leaves, wood, earthworms",
      note: "Central element of the study. Concentrations up to 24 µg/L were recorded in drinking water in 2019. Spatial variability is linked to local lithology and mining/hydrothermal influence. Strongly bioaccumulates in earthworms and sediments (up to ~100 mg/kg in the thermal zone). Negative correlation with Ca (ρ=-0.68) and accumulated rainfall (ρ=-0.71).",
      health: "Classified as a Group 1 human carcinogen (IARC). Chronic exposure through drinking water is associated with skin, lung and bladder cancers, skin lesions (hyperkeratosis) and cardiovascular effects. Has no known biological function in humans." }
  },
  Sr: {
    z: 38, mass: "87,62", catKey: "alkaline-earth", states: "+2",
    rangeWater: "5,21 – 49,3 µg/L (n = 25/25)",
    lod: "0,007 µg/L", loq: "0,023 µg/L", legalLimit: "—",
    gl: { nome: "Estroncio", matriz: "Augas, follas, madeira, miñocas",
      nota: "Empregado como trazador xeoquímico mediante a relación isotópica 87Sr/86Sr (rango medido: 0,7155 – 0,7259). Non sofre fraccionamento biolóxico, polo que a súa sinatura isotópica permite rastrexar a orixe da auga. Forte correlación co Ca (ρ=0,83) e o Ba (ρ=0,91).",
      saude: "O Sr estable (o medido neste estudo) ten toxicidade moi baixa; o corpo tende a tratalo como o Ca e incorpórao ao óso en pequenas cantidades sen efectos adversos coñecidos ás concentracións ambientais habituais. Distinto do 90Sr radioactivo, que non forma parte deste estudo." },
    en: { name: "Strontium", matrix: "Water, leaves, wood, earthworms",
      note: "Used as a geochemical tracer via the 87Sr/86Sr isotope ratio (measured range: 0.7155 – 0.7259). It undergoes no biological fractionation, so its isotopic signature allows tracing water origin. Strong correlation with Ca (ρ=0.83) and Ba (ρ=0.91).",
      health: "Stable Sr (as measured here) has very low toxicity; the body treats it similarly to Ca and incorporates small amounts into bone with no known adverse effects at typical environmental levels. Distinct from radioactive 90Sr, which is outside the scope of this study." }
  },
  Fe: {
    z: 26, mass: "55,85", catKey: "transition", states: "+2, +3",
    rangeWater: "19,2 – 124 µg/L (n = 25/25) · billa / tap: 27,1 – 43,5 µg/L",
    lod: "0,74 µg/L", loq: "2,48 µg/L", legalLimit: "200 µg/L (indicador)",
    gl: { nome: "Ferro", matriz: "Augas, sedimentos",
      nota: "As súas concentracións flutúan por procesos de precipitación-disolución. Actúa como \"filtro natural\" do As, xa que este queda adsorbido nos óxidos de ferro do sedimento (correlación As-Fe en sedimentos ρ=1). Forte correlación co Co (ρ=0,75) e o grupo Ni-Zn-Ga (ρ=0,71).",
      saude: "Elemento esencial (forma parte da hemoglobina). Non ten un valor paramétrico sanitario estrito, senón un valor indicador relacionado co sabor e a cor da auga. A exposición ambiental a estes niveis non supón risco para a saúde." },
    en: { name: "Iron", matrix: "Water, sediment",
      note: "Concentrations fluctuate due to precipitation-dissolution processes. Acts as a \"natural filter\" for arsenic, adsorbed onto sediment iron oxides (As-Fe correlation in sediments ρ=1). Strong correlation with Co (ρ=0.75) and the Ni-Zn-Ga group (ρ=0.71).",
      health: "Essential element (part of hemoglobin). It has no strict health-based limit, only an indicator value related to water taste and colour. Exposure at these levels poses no health risk." }
  },
  W: {
    z: 74, mass: "183,84", catKey: "transition", states: "+4, +6",
    rangeWater: "46 µg/L (m25; n = 1/25)",
    lod: "1,06 µg/L", loq: "3,54 µg/L", legalLimit: "—",
    gl: { nome: "Wolframio", matriz: "Sedimentos, miñocas, augas (zona termal)",
      nota: "Trazador da herdanza mineira histórica (mina de Santa Cristina). Practicamente só se detecta na zona termal/mineira (punto m25), con niveis moi superiores ao resto do regato — ata 25.319 mg/kg en sedimento total (S5).",
      saude: "Non existe un límite legal en auga de consumo por falta de datos toxicolóxicos concluíntes; estudos recentes suxiren posibles efectos neurolóxicos e sobre a fertilidade en exposicións moi elevadas, pero non hai evidencia de risco ás concentracións atopadas neste estudo (só na zona termal)." },
    en: { name: "Tungsten", matrix: "Sediment, earthworms, water (thermal zone)",
      note: "Tracer of the historical mining legacy (Santa Cristina mine). Almost exclusively detected in the thermal/mining zone (point m25), at levels far higher than the rest of the stream — up to 25,319 mg/kg in total sediment (S5).",
      health: "No legal drinking-water limit exists due to insufficient conclusive toxicological data; recent studies suggest possible neurological and fertility effects at very high exposures, but there is no evidence of risk at the concentrations found here (only in the thermal zone)." }
  },
  Ca: {
    z: 20, mass: "40,08", catKey: "alkaline-earth", states: "+2",
    rangeWater: "493 – 10.189 µg/L (n = 25/25)",
    lod: "215 µg/L", loq: "718 µg/L", legalLimit: "— (indicador de dureza)",
    gl: { nome: "Calcio", matriz: "Augas, sedimentos",
      nota: "Presenta fortes correlacións positivas co Sr (ρ=0,83), Ba (ρ=0,84), Ga (ρ=0,94), Co (ρ=0,73) e Ni (ρ=0,65), reflectindo unha orixe xeoxénica común pola alteración do substrato granítico.",
      saude: "Elemento esencial, mineral maioritario do óso e imprescindible na sinalización celular. Non ten efectos adversos ás concentracións ambientais; niveis baixos no regato indican unha auga branda, típica de substratos graníticos." },
    en: { name: "Calcium", matrix: "Water, sediment",
      note: "Shows strong positive correlations with Sr (ρ=0.83), Ba (ρ=0.84), Ga (ρ=0.94), Co (ρ=0.73) and Ni (ρ=0.65), reflecting a common geogenic origin from weathering of the granitic substrate.",
      health: "Essential element, the main mineral component of bone and vital for cell signalling. No adverse effects at environmental levels; low stream levels indicate soft water, typical of granitic substrates." }
  },
  Mg: {
    z: 12, mass: "24,31", catKey: "alkaline-earth", states: "+2",
    rangeWater: "7,36 – 10,5 µg/L (n = 3/25)",
    lod: "4,1 µg/L", loq: "13,7 µg/L", legalLimit: "—",
    gl: { nome: "Magnesio", matriz: "Augas",
      nota: "Só se cuantificou en 3 das 25 mostras de auga do regato (m5, m17 e m25), con valores de 7,4 a 10,5 µg/L; no resto quedou por debaixo do límite de detección (4,1 µg/L).",
      saude: "Elemento esencial (músculo, nervio e óso). Non ten un límite sanitario en auga de consumo e, ás concentracións ambientais, non supón risco." },
    en: { name: "Magnesium", matrix: "Water",
      note: "Quantified in only 3 of the 25 stream water samples (m5, m17 and m25), at 7.4 to 10.5 µg/L; in the rest it was below the detection limit (4.1 µg/L).",
      health: "Essential element (muscle, nerve and bone). It has no health-based limit in drinking water and poses no risk at environmental concentrations." }
  },
  Ba: {
    z: 56, mass: "137,33", catKey: "alkaline-earth", states: "+2",
    rangeWater: "1,92 – 13 µg/L (n = 25/25)",
    lod: "0,003 µg/L", loq: "0,011 µg/L", legalLimit: "—",
    gl: { nome: "Bario", matriz: "Augas, sedimentos",
      nota: "Correlaciona fortemente co Ca (ρ=0,84) e o Sr (ρ=0,91), compartindo unha orixe xeoxénica na lixiviación do substrato granítico.",
      saude: "En exposicións moi altas pode afectar o sistema cardiovascular e muscular (hipertensión), pero as concentracións atopadas neste estudo están moi por debaixo de calquera nivel de preocupación sanitaria." },
    en: { name: "Barium", matrix: "Water, sediment",
      note: "Strongly correlates with Ca (ρ=0.84) and Sr (ρ=0.91), sharing a geogenic origin from granitic substrate leaching.",
      health: "At very high exposures it can affect the cardiovascular and muscular systems (hypertension), but the concentrations found here are far below any level of health concern." }
  },
  Cu: {
    z: 29, mass: "63,55", catKey: "transition", states: "+1, +2",
    rangeWater: "0,012 – 1,3 µg/L (n = 13/25) · billa / tap: 175 – 852 µg/L",
    lod: "0,005 µg/L", loq: "0,018 µg/L", legalLimit: "2000 µg/L",
    gl: { nome: "Cobre", matriz: "Augas, auga de consumo",
      nota: "Vinculado ao uso recreativo de embarcacións (pinturas antifouling) na desembocadura. Incrementouse notablemente na auga de billa (de 175 a 852 µg/L) polo contacto coas tubaxes de cobre durante a noite.",
      saude: "Elemento esencial en cantidades traza (cofactor enzimático), pero en exceso pode causar molestias gastrointestinais e, en exposicións moi prolongadas, danos hepáticos. O incremento nocturno na billa é típico de instalacións con tubaxes de cobre e non indica un problema na fonte." },
    en: { name: "Copper", matrix: "Water, drinking water",
      note: "Linked to recreational boat use (antifouling paints) near the river mouth. Increased notably in tap water (from 175 to 852 µg/L) due to overnight contact with copper pipes.",
      health: "An essential trace element (enzyme cofactor), but in excess it can cause gastrointestinal discomfort and, with prolonged exposure, liver damage. The overnight increase in tap water is typical of copper plumbing and does not indicate a source-water problem." }
  },
  Zn: {
    z: 30, mass: "65,38", catKey: "transition", states: "+2",
    rangeWater: "0,85 – 83,1 µg/L (n = 20/25) · billa / tap: 35,5 – 56,7 µg/L",
    lod: "0,15 µg/L", loq: "0,49 µg/L", legalLimit: "—",
    gl: { nome: "Cinc", matriz: "Augas, auga de consumo",
      nota: "Indicador de uso recreativo náutico xunto co Cu. Na auga de consumo reduciuse durante a noite, suxerindo cambios asociados á rede de distribución. Fortemente relacionado co Ga (ρ=0,74) e o Ba (ρ=0,67).",
      saude: "Elemento esencial, imprescindible para o sistema inmunitario e a cicatrización. É un dos metais menos tóxicos; só en doses moi altas (moi por riba do atopado aquí) causa molestias dixestivas." },
    en: { name: "Zinc", matrix: "Water, drinking water",
      note: "Indicator of recreational boat use together with Cu. In drinking water it decreased overnight, suggesting changes linked to the distribution network. Strongly related to Ga (ρ=0.74) and Ba (ρ=0.67).",
      health: "An essential element, vital for the immune system and wound healing. One of the least toxic metals; only at very high doses (far above what was found here) does it cause digestive discomfort." }
  },
  Pb: {
    z: 82, mass: "207,2", catKey: "post-transition", states: "+2, +4",
    rangeWater: "0,01 – 0,84 µg/L (n = 18/25)",
    lod: "0,003 µg/L", loq: "0,009 µg/L", legalLimit: "10 µg/L (baixará a 5 µg/L en 2036)",
    gl: { nome: "Chumbo", matriz: "Augas",
      nota: "Cuantificado en 18 das 25 mostras, sempre en niveis baixos (0,01–0,84 µg/L) e moi por debaixo do límite legal. Os valores máis altos son m11 (0,84), m25 (0,46, zona termal/mineira) e m23 (0,40, zona de embarcacións).",
      saude: "Neurotóxico, especialmente prexudicial no desenvolvemento infantil (afecta o cociente intelectual). Non se coñece un limiar de exposición seguro, polo que a normativa é cada vez máis estrita (o límite legal baixará de 10 a 5 µg/L en 2036)." },
    en: { name: "Lead", matrix: "Water",
      note: "Quantified in 18 of the 25 samples, always at low levels (0.01–0.84 µg/L) and far below the legal limit. The highest values are m11 (0.84), m25 (0.46, thermal/mining zone) and m23 (0.40, boat area).",
      health: "Neurotoxic, especially harmful to child development (affects IQ). No safe exposure threshold is known, which is why regulations are becoming stricter (the legal limit will drop from 10 to 5 µg/L in 2036)." }
  },
  Mn: {
    z: 25, mass: "54,94", catKey: "transition", states: "+2, +4, +7",
    rangeWater: "0,82 – 272 µg/L (n = 9/25)",
    lod: "0,009 µg/L", loq: "0,030 µg/L", legalLimit: "50 µg/L (indicador)",
    gl: { nome: "Manganeso", matriz: "Augas",
      nota: "Flutúa ao longo do regato de forma similar ao Fe, por procesos de precipitación-disolución e interacción co sedimento. Cuantificado en 9 das 25 mostras; o máximo atópase na zona termal (m25, 272 µg/L).",
      saude: "Esencial en cantidades traza, pero a exposición crónica a doses moi elevadas (moito máis altas que as atopadas aquí) pódese asociar a efectos neurolóxicos. O valor legal é un indicador de calidade organoléptica, non un límite toxicolóxico estrito." },
    en: { name: "Manganese", matrix: "Water",
      note: "Fluctuates along the stream similarly to Fe, due to precipitation-dissolution processes and sediment interaction. Quantified in 9 of the 25 samples; the maximum is in the thermal zone (m25, 272 µg/L).",
      health: "Essential in trace amounts, but chronic exposure to very high doses (much higher than found here) can be associated with neurological effects. The legal value is an organoleptic quality indicator, not a strict toxicological limit." }
  },
  Co: {
    z: 27, mass: "58,93", catKey: "transition", states: "+2, +3",
    rangeWater: "0,02 – 2,02 µg/L (n = 25/25)",
    lod: "0,005 µg/L", loq: "0,015 µg/L", legalLimit: "—",
    gl: { nome: "Cobalto", matriz: "Augas",
      nota: "Fortes correlacións positivas co Fe (ρ=0,75), Ni (ρ=0,85), Ba (ρ=0,79) e Zn-Ga (ρ=0,86), indicando unha mobilización similar na fase acuosa.",
      saude: "Esencial como parte da vitamina B12. Non ten límite legal en auga por non representar risco ás concentracións ambientais habituais." },
    en: { name: "Cobalt", matrix: "Water",
      note: "Strong positive correlations with Fe (ρ=0.75), Ni (ρ=0.85), Ba (ρ=0.79) and Zn-Ga (ρ=0.86), indicating similar mobilization in the aqueous phase.",
      health: "Essential as part of vitamin B12. Has no legal water limit as it poses no risk at typical environmental concentrations." }
  },
  Ni: {
    z: 28, mass: "58,69", catKey: "transition", states: "+2",
    rangeWater: "0,14 – 3,23 µg/L (n = 25/25)",
    lod: "0,018 µg/L", loq: "0,061 µg/L", legalLimit: "20 µg/L",
    gl: { nome: "Níquel", matriz: "Augas",
      nota: "Correlacionado co Co (ρ=0,85), Zn (ρ=0,70), Ga (ρ=0,77) e Ba (ρ=0,80); asociado a unha mobilización xeoxénica compartida.",
      saude: "Coñecido principalmente como alérxeno de contacto (dermatite). A exposición oral crónica a niveis altos asóciase con efectos renais; clasificado como posible cancerígeno por inhalación (non por inxestión de auga)." },
    en: { name: "Nickel", matrix: "Water",
      note: "Correlated with Co (ρ=0.85), Zn (ρ=0.70), Ga (ρ=0.77) and Ba (ρ=0.80); associated with a shared geogenic mobilization.",
      health: "Best known as a contact allergen (dermatitis). Chronic oral exposure to high levels is associated with kidney effects; classified as a possible carcinogen by inhalation (not by drinking water)." }
  },
  Ga: {
    z: 31, mass: "69,72", catKey: "post-transition", states: "+3",
    rangeWater: "0,19 – 1,2 µg/L (n = 25/25)",
    lod: "0,005 µg/L", loq: "0,016 µg/L", legalLimit: "—",
    gl: { nome: "Galio", matriz: "Augas",
      nota: "Fortemente correlacionado co Ca (ρ=0,94), Sr (ρ=0,81) e Ba (ρ=0,89) — un dos mellores trazadores da alteración do substrato granítico. Correlación negativa co As (ρ=-0,71).",
      saude: "Toxicidade moi baixa por vía oral; non ten función biolóxica coñecida nin límite legal en auga de consumo." },
    en: { name: "Gallium", matrix: "Water",
      note: "Strongly correlated with Ca (ρ=0.94), Sr (ρ=0.81) and Ba (ρ=0.89) — one of the best tracers of granitic substrate weathering. Negative correlation with As (ρ=-0.71).",
      health: "Very low oral toxicity; has no known biological function or legal drinking-water limit." }
  },
  U: {
    z: 92, mass: "238,03", catKey: "actinide", states: "+4, +6",
    rangeWater: "0,05 – 0,19 µg/L (n = 25/25)",
    lod: "0,0006 µg/L", loq: "0,0019 µg/L", legalLimit: "30 µg/L",
    gl: { nome: "Uranio", matriz: "Augas",
      nota: "Presenta un perfil de mobilidade inverso, similar ao do As: correlacións negativas co Ca (ρ=-0,64), Ga (ρ=-0,58) e Ba (ρ=-0,51), afectado pola dilución pluvial.",
      saude: "No RD 3/2023 regúlase pola súa toxicidade química renal, non pola radioactividade (ás súas concentracións ambientais habituais a radioactividade é irrelevante). A exposición crónica elevada pode afectar a función renal." },
    en: { name: "Uranium", matrix: "Water",
      note: "Shows an inverse mobility profile, similar to As: negative correlations with Ca (ρ=-0.64), Ga (ρ=-0.58) and Ba (ρ=-0.51), affected by rainfall dilution.",
      health: "Regulated under RD 3/2023 for its chemical kidney toxicity, not its radioactivity (at typical environmental concentrations, radioactivity is negligible). High chronic exposure can affect kidney function." }
  },
  Rb: {
    z: 37, mass: "85,47", catKey: "alkali", states: "+1",
    rangeWater: "1,49 – 8,77 µg/L (n = 25/25)",
    lod: "0,003 µg/L", loq: "0,009 µg/L", legalLimit: "—",
    gl: { nome: "Rubidio", matriz: "Augas",
      nota: "Trazador xeoxénico, correlacionado co Sr (ρ=0,82) e o Ca (ρ=0,65). Estable ao longo do regato (3,2–3,7 µg/L), baixa no río Miño (m23–m24, ~1,5 µg/L) e é máximo na zona termal (m25, 8,8 µg/L).",
      saude: "Toxicidade moi baixa; o corpo tende a manexalo de forma similar ao potasio. Non ten límite legal en auga por non supoñer risco sanitario." },
    en: { name: "Rubidium", matrix: "Water",
      note: "Geogenic tracer, correlated with Sr (ρ=0.82) and Ca (ρ=0.65). Stable along the stream (3.2–3.7 µg/L), lower in the Miño river (m23–m24, ~1.5 µg/L) and highest in the thermal zone (m25, 8.8 µg/L).",
      health: "Very low toxicity; the body tends to handle it similarly to potassium. Has no legal water limit as it poses no health risk." }
  },
  V: {
    z: 23, mass: "50,94", catKey: "transition", states: "+3, +4, +5",
    rangeWater: "0,1 – 0,27 µg/L (n = 4/25)",
    lod: "0,045 µg/L", loq: "0,150 µg/L", legalLimit: "—",
    gl: { nome: "Vanadio", matriz: "Augas",
      nota: "Cuantificado só en 4 das 25 mostras (m1, m3, m24 e m25), con valores de 0,10 a 0,27 µg/L; o máximo atópase na zona termal (m25).",
      saude: "Non ten límite legal en auga de consumo na UE. En exposicións ocupacionais elevadas (po, non auga) pódese asociar a irritación respiratoria; a inxestión ambiental a estes niveis non representa un risco coñecido." },
    en: { name: "Vanadium", matrix: "Water",
      note: "Quantified in only 4 of the 25 samples (m1, m3, m24 and m25), with values from 0.10 to 0.27 µg/L; the maximum is in the thermal zone (m25).",
      health: "Has no EU drinking-water limit. High occupational exposure (dust, not water) can be associated with respiratory irritation; environmental ingestion at these levels poses no known risk." }
  },
  Se: {
    z: 34, mass: "78,97", catKey: "nonmetal", states: "-2, +4, +6",
    rangeWater: "< LOD (n = 0/25) · billa / tap: 0,33 µg/L (m27)",
    lod: "0,18 µg/L", loq: "0,62 µg/L", legalLimit: "20 µg/L (ata 30 µg/L en zonas autorizadas)",
    gl: { nome: "Selenio", matriz: "Augas",
      nota: "Medido co isótopo 78Se para evitar interferencias do plasma de argon (80Ar2+) sobre o isótopo máis abundante (80Se).",
      saude: "Elemento esencial (antioxidante, función tiroidea), pero cunha marxe estreita entre a dose necesaria e a tóxica. O exceso crónico pode causar selenose (perda de cabelo e uñas). Os niveis atopados aquí están moi por debaixo de calquera valor de preocupación." },
    en: { name: "Selenium", matrix: "Water",
      note: "Measured using the 78Se isotope to avoid argon plasma interferences (80Ar2+) on the most abundant isotope (80Se).",
      health: "An essential element (antioxidant, thyroid function), but with a narrow margin between the required and toxic dose. Chronic excess can cause selenosis (hair and nail loss). Levels found here are far below any level of concern." }
  },
  Mo: {
    z: 42, mass: "95,95", catKey: "transition", states: "+4, +6",
    rangeWater: "0,03 – 0,86 µg/L (n = 8/25)",
    lod: "0,007 µg/L", loq: "0,025 µg/L", legalLimit: "—",
    gl: { nome: "Molibdeno", matriz: "Augas",
      nota: "Cuantificado en 8 das 25 mostras (0,03–0,86 µg/L); o máximo atópase na zona termal (m25, 0,86 µg/L).",
      saude: "Esencial como cofactor enzimático. Non ten límite legal en auga de consumo na UE; só se asocian efectos adversos a exposicións moi superiores ás ambientais." },
    en: { name: "Molybdenum", matrix: "Water",
      note: "Quantified in 8 of the 25 samples (0.03–0.86 µg/L); the maximum is in the thermal zone (m25, 0.86 µg/L).",
      health: "Essential as an enzyme cofactor. Has no EU drinking-water limit; adverse effects are only associated with exposures far above environmental levels." }
  },
  Ag: {
    z: 47, mass: "107,87", catKey: "transition", states: "+1",
    rangeWater: "0,01 – 0,06 µg/L (n = 7/25)",
    lod: "0,003 µg/L", loq: "0,011 µg/L", legalLimit: "—",
    gl: { nome: "Prata", matriz: "Auga de consumo",
      nota: "Os seus niveis mantivéronse estables (variación inferior ao 10%) entre a medianoite e a mañá na auga de billa, indicando que non procede da rede de distribución.",
      saude: "Toxicidade baixa; o único efecto adverso coñecido en exposicións moi altas e prolongadas é a arxiria (pigmentación azulada da pel), non relevante ás concentracións atopadas." },
    en: { name: "Silver", matrix: "Drinking water",
      note: "Levels remained stable (under 10% variation) between midnight and morning in tap water, indicating it does not originate from the distribution network.",
      health: "Low toxicity; the only known adverse effect from very high, prolonged exposure is argyria (bluish skin pigmentation), not relevant at the concentrations found." }
  },
  Cd: {
    z: 48, mass: "112,41", catKey: "transition", states: "+2",
    rangeWater: "—",
    lod: "0,010 µg/L", loq: "0,034 µg/L", legalLimit: "5 µg/L",
    gl: { nome: "Cadmio", matriz: "Sedimentos e biota (non detectado en augas)",
      nota: "Cuantificado nos dixeridos de sedimento e biota da segunda campaña, pero por debaixo do límite de detección en todas as mostras de auga.",
      saude: "Tóxico renal acumulativo; a exposición crónica prolongada pode causar danos irreversibles no ril e nos ósos. Non ten función biolóxica coñecida. Non detectado en auga neste estudo, polo que non representa un risco pola vía hídrica." },
    en: { name: "Cadmium", matrix: "Sediment and biota (not detected in water)",
      note: "Quantified in sediment and biota digests from the second campaign, but below the detection limit in all water samples.",
      health: "A cumulative kidney toxicant; prolonged chronic exposure can cause irreversible kidney and bone damage. Has no known biological function. Not detected in water in this study, so it poses no risk via this pathway." }
  },
  Tl: {
    z: 81, mass: "204,38", catKey: "post-transition", states: "+1, +3",
    rangeWater: "0,036 – 0,056 µg/L (n = 24/25)",
    lod: "0,001 µg/L", loq: "0,004 µg/L", legalLimit: "—",
    gl: { nome: "Talio", matriz: "Augas",
      nota: "Rango moi estreito (0,036–0,056 µg/L) en 24 das 25 mostras, sen un patrón espacial marcado; os valores máis altos son m3 (0,056) e m25 (0,054).",
      saude: "Un dos metais máis tóxicos que existen (neurotóxico) a doses altas, aínda que non ten límite legal na UE por ser raro en auga de consumo. Os niveis atopados aquí son moi baixos e típicos de fondo xeolóxico." },
    en: { name: "Thallium", matrix: "Water",
      note: "Very narrow range (0.036–0.056 µg/L) in 24 of the 25 samples, with no marked spatial pattern; the highest values are m3 (0.056) and m25 (0.054).",
      health: "One of the most toxic metals known (neurotoxic) at high doses, though it has no EU drinking-water limit as it is rare in drinking water. The levels found here are very low and typical of geological background." }
  },
  Bi: {
    z: 83, mass: "208,98", catKey: "post-transition", states: "+3, +5",
    rangeWater: "0,04 – 0,07 µg/L (n = 5/25)",
    lod: "0,001 µg/L", loq: "0,004 µg/L", legalLimit: "—",
    gl: { nome: "Bismuto", matriz: "Augas",
      nota: "Cuantificado só en 5 das 25 mostras (m17, m18, m21, m23 e m25), en niveis moi baixos (0,04–0,07 µg/L).",
      saude: "Un dos metais pesados menos tóxicos; emprégase mesmo en medicamentos (ex. subsalicilato de bismuto). Non representa risco ás concentracións atopadas." },
    en: { name: "Bismuth", matrix: "Water",
      note: "Quantified in only 5 of the 25 samples (m17, m18, m21, m23 and m25), at very low levels (0.04–0.07 µg/L).",
      health: "One of the least toxic heavy metals; even used in medicines (e.g. bismuth subsalicylate). Poses no risk at the concentrations found." }
  }
};

// Colores por categoría química (para pintar la tabla periódica y las fichas)
const categoryColors = {
  "alkali": "#946c4f",
  "alkaline-earth": "#887233",
  "transition": "#497a9b",
  "post-transition": "#4b7d7e",
  "metalloid": "#8b698c",
  "nonmetal": "#557f55",
  "actinide": "#a05c5c"
};

const categoryNames = {
  "alkali": { gl: "Metal alcalino", en: "Alkali metal" },
  "alkaline-earth": { gl: "Metal alcalinotérreo", en: "Alkaline earth metal" },
  "transition": { gl: "Metal de transición", en: "Transition metal" },
  "post-transition": { gl: "Metal post-transición", en: "Post-transition metal" },
  "metalloid": { gl: "Metaloide", en: "Metalloid" },
  "nonmetal": { gl: "Non metal", en: "Nonmetal" },
  "actinide": { gl: "Actínido", en: "Actinide" }
};