# Loppanalys.se

Gemensam portal för interaktiva analyser av svenska löplopp.

Portalen är byggd som en statisk GitHub Pages-sajt och länkar vidare till separata analysprojekt. De första loppen är Ultravasan och Gotaleden. Strukturen är avsiktligt enkel att utöka med fler lopp.

## Struktur

- `index.html` – semantisk startsida, metodik, kontakt och metadata
- `lopp/index.html` – fullständig loppkatalog på `/lopp/`
- `races.js` – gemensam datakälla för startsidans och loppsidans loppkort
- `script.js` – rendering av loppkort och mobilnavigering
- `styles.css` – gemensam responsiv grafisk profil
- `assets/` – portalens egna, webbanpassade foto- och SVG-resurser

Lopp läggs till en gång i `races`-listan i `races.js`. Fälten för status, terräng, distans och år gör strukturen förberedd för framtida filtrering utan att ett filtersystem behöver finnas nu.

## Länkar

Portalen använder rot-relativa länkar till loppkatalogen och analysprojekten:

- `/lopp/`
- `/ultravasan-analys/`
- `/gotaleden-splits/`

Det gör att samma länkar fungerar både under GitHub Pages-domänen och när `loppanalys.se` används som egen domän.

## Publicering

GitHub Pages publicerar från `main` och repository-roten (`/`). Frontsidan ska därför utvecklas via pull request till `main`; den äldre branchen `feature/loppanalys-landing-page` är inte längre publiceringskälla.