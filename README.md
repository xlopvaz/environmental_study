# Environmental Study of the Nogueiredo Stream

Research website on arsenic contamination and the multi-elemental and isotopic characterization of the Nogueiredo fluvial system (Castrelo de Miño, Ourense, Spain).

This project is part of the Bachelor's Thesis *"Environmental assessment of the Nogueiredo fluvial system (Castrelo de Miño, Ourense) through multi-elemental and isotopic analysis"*, Faculty of Chemistry, University of Vigo (2025/2026 academic year).

🔗 **Live site:** https://xlopvaz.github.io/environmental_study/

## About the project

The Nogueiredo stream supplies drinking water to around 200 people in Castrelo de Miño. In recent years, arsenic levels above the legal limit have been detected in its drinking water. This work studies the origin, distribution and behaviour of As and 22 other trace elements in the system, combining:

- Multi-elemental analysis via ICP-MS-TOF (23 elements quantified)
- Isotopic characterization of Sr (⁸⁷Sr/⁸⁶Sr) as a geochemical tracer, via MC-ICP-MS
- Statistical data treatment (Spearman correlations, PCA, Kruskal-Wallis tests)
- An interactive web platform with maps, predictive models and data visualization

## Website features

- 🌐 Bilingual content (Galician / English)
- 🧪 Interactive periodic table of the 23 analyzed elements, with chemical data, concentration ranges and health effects
- 🗺️ Interactive map with rainfall scenarios (wet/normal/dry)
- 📈 Advanced predictive model combining rainfall and pH (based on Smedley & Kinniburgh, 2002)
- ⛅ Real-time estimate of expected As levels based on current weather (Open-Meteo API)

## Repository structure

```
├── index.html              # Main page
├── css/
│   └── style.css           # Styles
├── js/
│   ├── main.js               # General logic and language switching
│   ├── periodic-table.js     # Interactive periodic table
│   ├── map.js                 # Interactive maps and pH model
│   └── live-estimate.js       # Real-time estimate
├── data/
│   ├── translations.js        # Galician and English text
│   ├── periodic-positions.js  # Full periodic table layout
│   ├── measured-elements.js   # Data for the 23 analyzed elements
│   └── sample-points.js       # Coordinates and As values per point
└── assets/                    # Images and resources
```

## Built with

Plain HTML, CSS and JavaScript (no frameworks), [Leaflet](https://leafletjs.com/) for the interactive maps, and the [Open-Meteo API](https://open-meteo.com/) for real-time weather data.

## Authorship

**Xoel López Vázquez** — Faculty of Chemistry, University of Vigo
Supervisor: Marta Costas Rodríguez, Department of Analytical and Food Chemistry