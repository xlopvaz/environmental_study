const glossaryTerms = [
  {
    termGl: "ICP-MS", termEn: "ICP-MS",
    gl: "Espectrometría de masas con fonte de plasma acoplado indutivamente. Técnica que ioniza a mostra nun plasma de argon e mide os ións resultantes segundo a súa masa, permitindo cuantificar case calquera elemento a niveis de traza.",
    en: "Inductively Coupled Plasma Mass Spectrometry. A technique that ionizes the sample in an argon plasma and measures the resulting ions by mass, allowing quantification of almost any element at trace levels."
  },
  {
    termGl: "ICP-MS-TOF", termEn: "ICP-MS-TOF",
    gl: "Variante do ICP-MS que emprega un analizador de tempo de voo (Time-Of-Flight). Permite medir moitos isótopos de forma case simultánea, ideal para análise multielemental rápida.",
    en: "A variant of ICP-MS that uses a time-of-flight analyzer. It allows near-simultaneous measurement of many isotopes, ideal for fast multi-elemental analysis."
  },
  {
    termGl: "MC-ICP-MS", termEn: "MC-ICP-MS",
    gl: "ICP-MS de multicolector: conta con varios detectores que miden distintos isótopos ao mesmo tempo, cancelando as flutuacións do plasma. Permite unha precisión moito maior, necesaria para medir relacións isotópicas como o 87Sr/86Sr.",
    en: "Multi-Collector ICP-MS: uses several detectors that measure different isotopes simultaneously, cancelling out plasma fluctuations. It allows much higher precision, needed to measure isotope ratios such as 87Sr/86Sr."
  },
  {
    termGl: "Isótopo", termEn: "Isotope",
    gl: "Átomos dun mesmo elemento que teñen o mesmo número de protóns pero distinto número de neutróns, e por tanto distinta masa. Por exemplo, o estroncio ten varios isótopos naturais (84Sr, 86Sr, 87Sr, 88Sr).",
    en: "Atoms of the same element with the same number of protons but a different number of neutrons, and therefore different mass. Strontium, for example, has several natural isotopes (84Sr, 86Sr, 87Sr, 88Sr)."
  },
  {
    termGl: "Trazador xeoquímico", termEn: "Geochemical tracer",
    gl: "Elemento ou relación isotópica que non cambia de forma significativa ao pasar por procesos ambientais ou biolóxicos, e que polo tanto permite rastrexar a orixe dunha auga ou material. A relación 87Sr/86Sr é un exemplo típico.",
    en: "An element or isotope ratio that does not change significantly through environmental or biological processes, allowing the origin of a water or material to be traced. The 87Sr/86Sr ratio is a typical example."
  },
  {
    termGl: "LOD / LOQ", termEn: "LOD / LOQ",
    gl: "Límite de Detección e Límite de Cuantificación. O LOD é a menor concentración que se pode distinguir de forma fiable do \"ruído\" do branco; o LOQ é a menor concentración que se pode medir con precisión aceptable. Por debaixo do LOD adóitase dicir que un elemento \"non se detecta\".",
    en: "Limit of Detection and Limit of Quantification. The LOD is the smallest concentration that can be reliably distinguished from blank \"noise\"; the LOQ is the smallest concentration that can be measured with acceptable precision. Below the LOD, an element is usually said to be \"not detected\"."
  },
  {
    termGl: "Biodispoñible", termEn: "Bioavailable",
    gl: "Fracción dun elemento que está realmente accesible para ser absorbida por un organismo vivo (planta, animal), en contraste co contido total, que inclúe formas moi ligadas á matriz mineral e non accesibles biolóxicamente.",
    en: "The fraction of an element that is actually accessible for uptake by a living organism (plant, animal), as opposed to the total content, which includes forms tightly bound to the mineral matrix and not biologically accessible."
  },
  {
    termGl: "Bioacumulación", termEn: "Bioaccumulation",
    gl: "Proceso polo cal un organismo acumula un elemento ou substancia en concentracións superiores ás do medio que o rodea, xeralmente porque o absorbe máis rápido do que o elimina.",
    en: "The process by which an organism accumulates an element or substance at concentrations higher than those in its surrounding environment, generally because it absorbs it faster than it eliminates it."
  },
  {
    termGl: "PCA (Análise de Compoñentes Principais)", termEn: "PCA (Principal Component Analysis)",
    gl: "Técnica estatística multivariante que reduce moitas variables (neste caso, moitos elementos) a uns poucos \"compoñentes principais\" que resumen a maior parte da variabilidade dos datos, facilitando ver patróns e agrupacións.",
    en: "A multivariate statistical technique that reduces many variables (in this case, many elements) to a few \"principal components\" summarizing most of the data's variability, making it easier to see patterns and groupings."
  },
  {
    termGl: "Correlación de Spearman (ρ)", termEn: "Spearman correlation (ρ)",
    gl: "Medida estatística que indica se dúas variables tenden a variar xuntas (positiva ou negativamente), sen asumir que a relación sexa exactamente lineal. Vai de -1 (relación inversa perfecta) a +1 (relación directa perfecta).",
    en: "A statistical measure indicating whether two variables tend to vary together (positively or negatively), without assuming the relationship is exactly linear. It ranges from -1 (perfect inverse relationship) to +1 (perfect direct relationship)."
  },
  {
    termGl: "Proba de Kruskal-Wallis", termEn: "Kruskal-Wallis test",
    gl: "Proba estatística non paramétrica que compara se hai diferenzas significativas entre tres ou máis grupos (por exemplo, entre varios puntos de mostraxe), sen necesidade de que os datos sigan unha distribución normal.",
    en: "A non-parametric statistical test that checks whether there are significant differences between three or more groups (e.g. between several sampling points), without requiring the data to follow a normal distribution."
  },
  {
    termGl: "Hidrotermal", termEn: "Hydrothermal",
    gl: "Relacionado con auga quente que circula polo subsolo, xeralmente asociada a zonas de actividade xeolóxica antiga ou actual. As augas hidrotermais poden disolver e transportar elementos traza específicos das rochas polas que pasan.",
    en: "Related to hot water circulating underground, generally associated with areas of past or present geological activity. Hydrothermal waters can dissolve and transport trace elements specific to the rocks they pass through."
  },
  {
    termGl: "Lixiviación", termEn: "Leaching",
    gl: "Proceso polo cal a auga disolve e arrastra elementos ou compostos ao pasar a través do solo, o sedimento ou a rocha.",
    en: "The process by which water dissolves and carries away elements or compounds as it passes through soil, sediment or rock."
  },
  {
    termGl: "Matriz ambiental", termEn: "Environmental matrix",
    gl: "O tipo de mostra que se analiza (auga, sedimento, folla, madeira, miñoca...). Cada matriz require unha preparación distinta e pode reflectir aspectos diferentes da contaminación.",
    en: "The type of sample being analyzed (water, sediment, leaf, wood, earthworm...). Each matrix requires different preparation and may reflect different aspects of contamination."
  },
  {
    termGl: "Valor paramétrico / límite legal", termEn: "Parametric value / legal limit",
    gl: "Concentración máxima (ou mínima) permitida para un parámetro na auga de consumo, establecida pola normativa vixente (en España, o Real Decreto 3/2023).",
    en: "The maximum (or minimum) concentration allowed for a parameter in drinking water, set by current regulations (in Spain, Royal Decree 3/2023)."
  },
  {
    termGl: "Mass bias (discriminación de masa)", termEn: "Mass bias (mass discrimination)",
    gl: "Fenómeno polo cal o instrumento transporta e detecta lixeiramente mellor uns isótopos ca outros segundo a súa masa, o que pode desviar as relacións isotópicas medidas respecto ao valor real se non se corrixe.",
    en: "A phenomenon whereby the instrument transports and detects some isotopes slightly better than others depending on their mass, which can skew measured isotope ratios from the true value if not corrected."
  },
  {
    termGl: "Celda de colisión (CCT)", termEn: "Collision cell (CCT)",
    gl: "Compoñente do ICP-MS que introduce un gas (como o helio) para eliminar interferencias poliatómicas (ex. ArCl+ sobre o As), mellorando a exactitude da medida a costa dunha lixeira perda de sensibilidade.",
    en: "A component of the ICP-MS that introduces a gas (such as helium) to remove polyatomic interferences (e.g. ArCl+ on As), improving measurement accuracy at the cost of a slight loss in sensitivity."
  },
  {
    termGl: "Sample-standard bracketing", termEn: "Sample-standard bracketing",
    gl: "Método de corrección empregado en MC-ICP-MS no cal se mide un estándar de referencia coñecido antes e despois de cada mostra, para corrixir as variacións instrumentais e obter relacións isotópicas máis exactas.",
    en: "A correction method used in MC-ICP-MS where a known reference standard is measured before and after each sample, to correct for instrumental variations and obtain more accurate isotope ratios."
  },
  {
    termGl: "ETAP", termEn: "Water treatment plant (ETAP)",
    gl: "Estación de Tratamento de Auga Potable. Instalación onde se trata a auga captada (coagulación, filtración, desinfección) antes de distribuíla como auga de consumo.",
    en: "Drinking Water Treatment Plant. A facility where captured water is treated (coagulation, filtration, disinfection) before being distributed as drinking water."
  },
  {
    termGl: "SINAC", termEn: "SINAC",
    gl: "Sistema de Información Nacional de Auga de Consumo. Base de datos pública española cos controis de calidade da auga de consumo realizados en cada sistema de abastecemento.",
    en: "National Drinking Water Information System (Spain). A public database with the drinking water quality controls carried out at each supply system."
  },
  {
    termGl: "Dixestión ácida", termEn: "Acid digestion",
    gl: "Proceso de preparación de mostra no que se emprega unha mestura de ácidos concentrados (e ás veces calor e presión) para disolver completamente unha mostra sólida, deixando os elementos dispoñibles para a súa medida por ICP-MS.",
    en: "A sample preparation process using a mixture of concentrated acids (sometimes with heat and pressure) to completely dissolve a solid sample, making the elements available for measurement by ICP-MS."
  }
];