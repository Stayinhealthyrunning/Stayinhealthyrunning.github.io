# Loppanalys.se

Gemensam portal för interaktiva analyser av svenska löplopp.

Portalen är byggd som en statisk GitHub Pages-sajt och länkar vidare till separata analysprojekt. De första loppen är Ultravasan och Gotaleden. Strukturen är avsiktligt enkel att utöka med fler lopp.

## Struktur

- `index.html` – semantisk startsida och metadata
- `styles.css` – responsiv grafisk profil
- `script.js` – liten datadriven loppkatalog och mobilnavigering
- `assets/` – portalens egna SVG-resurser

Lopp läggs till i `races`-listan i `script.js`.

## Länkar

Portalen använder rot-relativa länkar till analysprojekten:

- `/ultravasan-analys/`
- `/gotaleden-splits/`

Det gör att samma länkar fungerar både under GitHub Pages-domänen och när `loppanalys.se` kopplas som egen domän.
