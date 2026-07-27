const faqItems = [
  {
    gl: {
      q: "É segura a auga de consumo agora mesmo?",
      a: "Segundo os últimos controis dispoñibles (SINAC, 2026), a auga de consumo de Nogueiredo está por debaixo do límite legal de 10 µg/L de As. Porén, os niveis flutuaron no pasado por riba deste límite, e a concentración depende en boa medida das condicións pluviométricas. A ferramenta de estimación en directo desta web dá unha idea aproximada da situación actual, pero para información oficial e actualizada consulta sempre o SINAC ou o teu concello."
    },
    en: {
      q: "Is the drinking water safe right now?",
      a: "According to the latest available controls (SINAC, 2026), Nogueiredo's drinking water is below the 10 µg/L legal limit for As. However, levels have fluctuated above this limit in the past, and concentration depends largely on rainfall conditions. This site's live estimate gives an approximate idea of the current situation, but for official, up-to-date information always check SINAC or your local council."
    }
  },
  {
    gl: {
      q: "De onde vén o arsénico?",
      a: "A orixe é principalmente xeoxénica: o substrato rochoso da zona (xistos e micaxistos) e a herdanza da actividade mineira histórica (extracción de wolframio na mina de Santa Cristina) favorecen a presenza natural de As nas augas e sedimentos. Non se identificou unha fonte de contaminación puntual (como un vertido industrial), senón un proceso natural de lixiviación da rocha."
    },
    en: {
      q: "Where does the arsenic come from?",
      a: "The origin is mainly geogenic: the region's rock substrate (schists and mica-schists) and the legacy of historical mining activity (tungsten extraction at the Santa Cristina mine) favour the natural presence of As in waters and sediments. No point-source contamination (such as an industrial discharge) was identified — rather a natural rock-leaching process."
    }
  },
  {
    gl: {
      q: "Por que varía tanto a concentración de As dun día a outro?",
      a: "Principalmente pola precipitación. A choiva dilúe a concentración de As no regato: en períodos húmidos os niveis baixan, e en períodos secos tenden a subir. Por iso esta web inclúe un modelo que estima como cambiaría a concentración segundo o escenario pluviométrico."
    },
    en: {
      q: "Why does the As concentration vary so much day to day?",
      a: "Mainly due to rainfall. Rain dilutes the As concentration in the stream: during wet periods levels drop, and during dry periods they tend to rise. That's why this site includes a model estimating how concentration would change under different rainfall scenarios."
    }
  },
  {
    gl: {
      q: "Podo bañarme ou tocar a auga do regato?",
      a: "Este estudo céntrase na auga de consumo (a que sae da billa), non avalía especificamente o risco do contacto ocasional coa auga do regato. O contacto dérmico puntual co As presenta xeralmente un risco moito menor que a inxestión continuada. Ante calquera dúbida sobre usos recreativos, consulta coas autoridades sanitarias locais."
    },
    en: {
      q: "Can I bathe in or touch the stream water?",
      a: "This study focuses on drinking water (what comes out of the tap), not specifically on the risk of occasional contact with stream water. Occasional dermal contact with As generally carries much lower risk than continued ingestion. For any doubts about recreational use, check with local health authorities."
    }
  },
  {
    gl: {
      q: "Por que o límite legal é 10 µg/L e non outro valor?",
      a: "É o valor establecido pola Organización Mundial da Saúde e adoptado pola normativa europea e española (Real Decreto 3/2023), baseado en estudos epidemiolóxicos sobre risco de cancro e outros efectos á saúde por exposición crónica ao As na auga de consumo."
    },
    en: {
      q: "Why is the legal limit 10 µg/L and not another value?",
      a: "It is the value set by the World Health Organization and adopted by European and Spanish regulations (Royal Decree 3/2023), based on epidemiological studies on cancer risk and other health effects from chronic As exposure in drinking water."
    }
  },
  {
    gl: {
      q: "Como se relaciona isto coa antiga mina de Santa Cristina?",
      a: "A zona termal/mineira próxima ao encoro do río Miño (punto m25 deste estudo) mostrou niveis moi elevados de wolframio (ata 46 µg/L en auga e 25.319 mg/g en sedimento), un trazador claro da actividade mineira histórica. Isto suxire que a xeoloxía mineralizada da rexión podería influír tamén na presenza natural doutros elementos traza, incluído o As, aínda que a problemática principal do As reside no propio regato de Nogueiredo, non nesta zona illada."
    },
    en: {
      q: "How does this relate to the former Santa Cristina mine?",
      a: "The thermal/mining zone near the Miño river reservoir (point m25 in this study) showed very high tungsten levels (up to 46 µg/L in water and 25,319 mg/g in sediment), a clear tracer of historical mining activity. This suggests the region's mineralized geology could also influence the natural presence of other trace elements, including As, although the main As issue lies in the Nogueiredo stream itself, not in this isolated zone."
    }
  },
  {
    gl: {
      q: "Que significa que un dato sexa \"modelo preditivo\" e non \"real\"?",
      a: "Nesta web, \"dato real\" significa que foi medido experimentalmente no laboratorio (CACTI, Universidade de Vigo) mediante ICP-MS-TOF. \"Modelo\" significa que é unha estimación matemática baseada en correlacións (por exemplo, entre precipitación e concentración de As) e na literatura científica, pero que non substitúe unha medida directa. Ambos tipos de dato están claramente etiquetados en toda a web."
    },
    en: {
      q: "What does it mean for data to be a \"predictive model\" rather than \"real\"?",
      a: "On this site, \"real data\" means it was experimentally measured in the lab (CACTI, University of Vigo) using ICP-MS-TOF. \"Model\" means it is a mathematical estimate based on correlations (e.g. between rainfall and As concentration) and scientific literature, but does not replace a direct measurement. Both data types are clearly labelled throughout the site."
    }
  },
  {
    gl: {
      q: "Podo empregar os datos ou o código deste proxecto?",
      a: "O código fonte da web está dispoñible no repositorio de GitHub ligado en \"Sobre o proxecto\". Para o uso dos datos científicos da memoria do TFG, contacta coa autoría do traballo."
    },
    en: {
      q: "Can I use the data or code from this project?",
      a: "The website's source code is available in the GitHub repository linked in \"About the project\". For use of the scientific data from the thesis report, please contact the author."
    }
  }
];