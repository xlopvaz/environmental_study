# Changelog

Todos os cambios notables deste proxecto documéntanse neste arquivo.

## [Sen publicar]
- Táboa e gráficos completos multielemental/isotópico (pendente de exportación CSV/R)
- Comparador de matrices auga/sedimento/biota
- Issues de GitHub para planificación de features

## [2026-07-27] — Preguntas frecuentes
### Engadido
- Sección de FAQ tipo acordeón (8 preguntas bilingües) sobre seguridade da auga, orixe do arsénico, límites legais e a distinción dato real/modelo

## [2026-07-23] — Banner en directo e cronoloxía
### Engadido
- Banner fixo con estimación en directo (tempo actual + As estimado), visible en toda a web
- Sección de liña temporal con 7 fitos da contaminación (2007-2026)
### Corrixido
- Contido duplicado en `live-estimate.js` que deixaba o banner cargando indefinidamente
- Banner aniñado incorrectamente dentro de `<nav>`, causando mal comportamento en pantalla completa
- Estilos responsive do banner en móbil

## [2026-07-23] — Páxina de análise avanzada
### Engadido
- Páxina independente `analise.html` para figuras técnicas
- Matriz de correlacións de Spearman interactiva (13×13 elementos, datos de auga)
- Gráficos de perfil lonxitudinal (As en 25 puntos, relación isotópica 87Sr/86Sr en 5 puntos)
- Diagrama esquemático de PCA por cuadrantes
- Botón destacado "Análise avanzada" no menú principal

## [2026-07-23] — Estimación en tempo real
### Engadido
- Widget de estimación de As en directo conectado á API de Open-Meteo
- Cálculo de normal climática real (media de 10 anos, mesma xanela de 30 días do calendario) en vez dunha aproximación fixa
- Caché de 24h en localStorage para evitar recalcular o histórico climático en cada visita
### Corrixido
- Erro 429 (demasiadas peticións) ao consultar 10 anos por separado — reducido a 1 soa petición continua
- Modelo saíndose do rango validado (factor >×3) en condicións de seca extrema

## [2026-07-19] — README, cabeceira e glosario
### Engadido
- README.md bilingüe coa descrición do proxecto e a estrutura do repositorio
- Redeseño da cabeceira cunha textura topográfica sutil de fondo
- Glosario de 21 termos técnicos con buscador, bilingüe
### Corrixido
- Variable `currentLang` referenciada antes de ser declarada, rompendo o renderizado dependente do idioma en GitHub Pages

## [2026-07-14] — Mapas interactivos e modelo preditivo
### Engadido
- Mapa con escenarios pluviométricos (húmido/normal/seco)
- Modelo avanzado combinando precipitación e pH (adsorción do As en óxidos de Fe, baseado en Smedley & Kinniburgh, 2002)
- Etiquetaxe explícita de datos reais (ICP-MS-TOF) fronte a estimacións de modelo

## [2026-07-14] — Táboa periódica interactiva
### Engadido
- Táboa periódica completa cos 23 elementos cuantificados resaltados por categoría química
- Ficha por elemento: propiedades químicas, rango de concentración, LOD/LOQ, límite legal e efectos na saúde
### Corrixido
- Límites legais verificados contra o RD 3/2023 (corrixidos Se, Pb, Ni)

## [2026-07-14] — Estrutura base
### Engadido
- Estrutura inicial do proxecto (HTML/CSS/JS separados)
- Sistema de tradución bilingüe (galego/inglés)
- Contido completo de texto: Inicio, O problema, Metodoloxía, Conclusións, Sobre o proxecto