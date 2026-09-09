# Environmental Study of the Nogueiredo Stream

Research website on arsenic contamination and the multi-elemental and isotopic characterization of the Nogueiredo fluvial system (Castrelo de Miño, Ourense, Spain).

🔗 **Live site:** https://xlopvaz.github.io/environmental_study/

## About the project

The Nogueiredo stream supplies drinking water to around 200 people in Castrelo de Miño. In recent years, arsenic levels above the legal limit have been detected in its drinking water. This study examines the origin, distribution and behaviour of As and 22 other trace elements in the system, combining:

- Multi-elemental analysis via ICP-MS-TOF (23 elements quantified)
- Isotopic characterization of Sr (⁸⁷Sr/⁸⁶Sr) as a geochemical tracer, via MC-ICP-MS
- Statistical data treatment (Spearman correlations, PCA, Kruskal-Wallis tests)
- An interactive web platform with maps, predictive models and data visualization

## Website features

### Main site
- 🌐 Bilingual content (Galician / English), with a light/dark theme switch
- 🧪 Interactive periodic table of the 23 analyzed elements, with chemical data, concentration ranges, legal limits and health effects
- 🗺️ Interactive maps with rainfall scenarios (wet/normal/dry), clearly distinguishing real ICP-MS-TOF measurements from model estimates
- 📈 Advanced predictive model combining rainfall and pH (based on Smedley & Kinniburgh, 2002)
- ⛅ Real-time estimate of expected As levels based on current weather and a 10-year climate normal (Open-Meteo API)
- 🕰️ Contamination timeline, searchable glossary, and FAQ section

### Advanced analysis page
- 📊 Full ICP-MS-TOF results tables for both sampling campaigns
- 🔥 Interactive Spearman correlation matrix and network graph
- 📉 Multi-element longitudinal profile and matrix comparator (water/sediment/leaves/wood/earthworms)
- 🧮 Bioaccumulation Factor (BAF) and Geoaccumulation Index (Igeo) calculators, computed live from the raw data
- 🔬 In-browser PCA (principal component analysis)

## Repository structure

```
├── index.html                  # Main page
├── analise.html                 # Advanced analysis page
├── css/
│   ├── style.css                 # Main styles (incl. dark theme)
│   └── analise.css               # Advanced analysis page styles
├── js/
│   ├── main.js                    # General logic and language switching
│   ├── theme.js                   # Light/dark theme toggle
│   ├── periodic-table.js          # Interactive periodic table
│   ├── map.js                      # Interactive maps and pH model
│   ├── live-estimate.js            # Real-time estimate
│   ├── glossary.js / faq.js        # Glossary and FAQ rendering
│   ├── icpms-diagram.js            # ICP-MS-TOF process diagram
│   ├── analise.js                  # Correlation matrix, profiles, PCA schematic
│   ├── datos.js                    # Full results tables + mini map
│   ├── comparador.js               # Matrix comparator
│   ├── baf.js / igeo.js            # BAF and Igeo calculators
│   ├── rede.js                     # Correlation network graph
│   └── pca-real.js                 # In-browser PCA computation
├── data/
│   ├── translations.js             # Galician and English text
│   ├── periodic-positions.js       # Full periodic table layout
│   ├── measured-elements.js        # Data for the 23 analyzed elements
│   ├── sample-points.js            # Coordinates and As values per point
│   ├── sr-isotopes.js              # 87Sr/86Sr isotope data
│   ├── correlations.js             # Spearman correlation matrix
│   ├── full-results.js             # Full ICP-MS-TOF results (both campaigns)
│   └── glossary.js / faq.js        # Glossary terms and FAQ content
└── assets/                         # Images and resources
```

## Built with

Plain HTML, CSS and JavaScript (no frameworks), [Leaflet](https://leafletjs.com/) for the interactive maps, [Chart.js](https://www.chartjs.org/) for charts, and the [Open-Meteo API](https://open-meteo.com/) for real-time weather data. Statistical methods (PCA, Kruskal-Wallis) are computed natively in JavaScript, without external statistical libraries.

## Authorship

**Xoel López Vázquez**
Centro de Investigación Mariña (CIM), Universidade de Vigo
Departamento de Química Analítica e Alimentaria — Grupo QA2
Supervisor: Marta Costas Rodríguez

## Contact

📧 [xoel.lopez.vazquez@rai.usc.es](mailto:xoel.lopez.vazquez@rai.usc.es)
💼 [LinkedIn](https://www.linkedin.com/in/xoellopezvazquez)
