# Loppanalys – designreferenser

Den här mappen dokumenterar den fastslagna visuella riktningen för startsidan. Vid framtida designarbete ska referensen läsas före implementation.

## Visuellt facit

**`approved-mockup-final.jpg` (1536 × 1024) är det primära och bindande visuella facit.**

**De tre slutliga visuella referenserna från 2026-09-23 är visuellt facit.** Helhetsbilden styr desktopkompositionen, medan de två separata kortreferenserna styr Ultravasan- respektive Gotaleden-kortet. De har företräde framför äldre kod, commits, branches, README-texter och rekonstruerade mockuper.

`approved-mockup.svg` är en äldre referens från utvecklingskedjan och får inte användas för att överstyra `approved-mockup-final.jpg`.

Implementation ska i första hand följa referensen vad gäller komposition, proportioner, typografisk hierarki, färgtemperatur, bildutsnitt, loppkort och den mörka avslutande sektionen. Fri omtolkning ska undvikas när referensen är tydlig.

### Desktopreferens: 1536 × 1024

Följande mått är avsiktliga riktvärden från den godkända bilden:

- hero: **490 px** hög
- loppsektion: **317 px** hög
- mörkt avslutande analys-/varumärkesband: **217 px** högt
- summan är exakt **1024 px** i desktopreferensen
- huvudinnehåll börjar cirka **84 px** från vänster kant
- loppintro: cirka **290 px** brett
- första loppkortet börjar cirka **410 px** från vänster kant
- loppkort: cirka **270 px** höga, varav bilddelen cirka **176 px**
- hero-funktionerna har asymmetriska kolumner med skiljelinjer ungefär vid x=364 och x=709 på 1536 px bred skärm

## Fastslagen struktur

### Header ovanpå hero

- Monokrom **mörkgrön** löparsymbol.
- Loppanalys.se i mörkgrönt.
- Tagline: **ANALYSERA MER. UPPLEV MER.**
- Navigation: **Hem · Om · Lopp · Metodik · Kontakt**
- Aktiv länk markeras med diskret mörkgrön linje.

### Hero

- Sälen–Mora-bilden från Ultravasan används som huvudbild.
- Bilden ska vara relativt ljus upptill så logotyp och navigation kan vara mörkgröna.
- Nedre delen får en mörk toning för vit hero-text.
- Rubrik: **Loppanalys**
- Underrubrik: **Interaktiva analyser av löplopp**
- Brödtext: **Resultat, pacing, banprofiler, delsträckor, kartor och loppets utveckling – samlat på ett ställe.**
- Primär knapp: **Utforska loppen →**
- Sekundär knapp: **Läs mer ↓**
- Tre funktioner längs nederkanten:
  - Djupgående resultatanalyser
  - Banprofiler och interaktiva kartor
  - Pacing och segmentjämförelser
- Signatur till höger: **TRAIL | ULTRA | NATURE | ANALYS**

### Loppsektion

Intro:
- **VÅRA LOPP**
- **Välj ett lopp och utforska analysen**
- **Detaljerade analyser baserade på verkliga resultat och banor. Upptäck, jämför och inspireras.**

Kort:
- **Ultravasan** – Sälen–Mora-bilden, status **TILLGÄNGLIG**
- **Gotaleden** – publicerad Gotaleden-bild, status **TILLGÄNGLIG**
- **Fler lopp på väg** – naturbild med lugn/dimmig ton, status **KOMMER SNART**
- Statusetikett i övre högra hörnet.
- Kort titel + två rader beskrivning + rund pilknapp.
- Aktiva kort är klickbara i sin helhet.

### Mörkt avslutande band

- Mörk skogsgrön, fotografisk skog/natur svagt synlig i bakgrunden.
- Vänster: citat **“Samma stigar, nya perspektiv.”** med orange citattecken och accentstreck.
- Mitten: fyra funktioner med vita linjeikoner:
  - Resultat & statistik
  - Kartor & banprofiler
  - Pacing & delsträckor
  - Jämför & inspireras
- Höger: vertikal skiljelinje, monokrom **vit** löparsymbol, Loppanalys.se, tagline och **LÖPNING GÖR LIVET STÖRRE**.

## Slutligt bildfacit

De senast uttryckligen godkända visuella referenserna är bindande för implementationen:

- **Hero:** panoramabilden med löpare i gul tröja på träspång i varm solnedgång, med mörkgrön Loppanalys.se-header ovanpå bilden och den vita hero-typografin enligt referensen.
- **Ultravasan-kort:** löpare bakifrån på träspång genom tall-/myrlandskap i varmt lågt ljus. Text: **“Djupanalys av UV90 och UV45 med resultat, pacing, replay, banprofil och historik.”** Status: **TILLGÄNGLIG**.
- **Gotaleden-kort:** smal stig genom ljus lövskog med stora mattor av vita vitsippor. Text: **“Interaktiv analys av Gotaleden Stafett & Ultra med delsträckor, banprofil, kartor och replay.”** Status: **TILLGÄNGLIG**.
- Ett tidigare mellanbeslut om Vasaloppsmålet som Ultravasan-kortmotiv är ersatt av ovanstående slutliga kortreferens.

## Grafisk riktning

- Modern, nordisk och professionell trail-/ultrakänsla.
- Kanonisk palett från den ursprungliga profilen: skogsgrönt **#09251f / #0d3129**, varm orange **#f5823a**, naturvit **#fbfaf6**, textgrönt **#122d27**.
- Djup skogsgrön bas, varm orange accent och naturvita/varma ljusa ytor.
- Naturfotografi ska bära känslan; undvik sportbutikskänsla och generiska motivationssymboler.
- Sidan ska samtidigt kännas som ett seriöst analysverktyg: resultat, kartor, pacing, banprofiler, delsträckor och jämförelser.
- Den ursprungliga stiliserade två-löpare-symbolen från den fastslagna profilen är kanonisk och används **monokromt**: mörkgrön i headern och vit i avslutningen.
- Responsiv mobilversion ska behålla samma visuella språk även när proportionerna måste ändras.

## Verifierade bildresurser

- **Hero:** `assets/hero-approved.jpg`, portallokal panoramabild med löpare på spång i varm solnedgång.
- **Ultravasan-kort:** `assets/ultravasan-card.jpg`, portallokal och UI-fri kortbild med löpare på spång.
- **Gotaleden-kort:** `assets/gotaleden-card.jpg`, portallokal och UI-fri kortbild med stig, lövskog och vitsippor.
- **Fler lopp:** `assets/future-card.jpg`, portallokal och UI-fri, nedtonad skogs-/bergsvy.

Statusetiketter, korttext och pilknappar ska alltid byggas i HTML/CSS och får inte vara den enda representationen inbakad i fotografiet.

## Viktigt

Designreferensen ska inte ersättas av fri designinterpretation utan uttryckligt beslut. Om implementation och den godkända referensen divergerar ska implementationen justeras mot referensen. Referera inte till bildfiler som inte faktiskt finns.


## Publiceringskälla

Portalens kanoniska kod ligger på `main` i repository-roten. Under felsökningen 2026-09-23 konstaterades att GitHub Pages faktiskt var konfigurerat för den äldre branchen `feature/loppanalys-landing-page` från `/ (root)`. Det förklarar varför äldre HTML kunde ligga kvar trots nyare kod på `main`.

Pages-källan ändrades därefter uttryckligen till **`main` / `/ (root)`**. Ingen ny utveckling ska göras direkt på den gamla feature-branchen. Den kan ligga kvar som historik utan att påverka publiceringen.
