# Loppanalys.se – standardspecifikation för nya analysverktyg

**Version:** 1.0.0 (kravbaslinje)  
**Datum:** 2026-10-08  
**Status:** Normerande målbild för *nya* lopp. Ej instruktion att bygga om befintliga fyra system.  
**Språk för UI:** svenska (`sv-SE`).  
**Primär målgrupp:** Codex/utvecklare, granskare och projektägare.  
**Syfte:** Ett nytt lopp ska kunna implementeras från verifierade resultat, banor och en loppkonfiguration, utan att standardiserade analyser, layout, hjälptexter eller interaktioner uppfinns på nytt.

> **LÄS DETTA FÖRST.** Detta är ett **produkt- och acceptanskontrakt**, inte ett påstående om att en gemensam kodbas redan existerar. De fyra befintliga repona utgör referensimplementationer. Ett nytt lopp kan kräva en ny datakälladapter och faktagranskning. Saknade källvärden får aldrig hittas på för att uppfylla mallen. Vid konflikt mellan en äldre bild och denna kravspecifikation gäller denna text. Vid konflikt mellan denna mall och verifierad tävlingsdata gäller källtrohet och evidensreglerna.

## 0. Läsanvisning och bindande beslut

### 0.1 Kravnivåer
- **MÅSTE (M):** blockerar färdigställande om kravet inte är uppfyllt där datan gör det möjligt.
- **SKA (S):** standardbeteende; avsteg måste dokumenteras och godkännas.
- **KAN (K):** opt-in-modul där underlag och loppformat stöder funktionen.
- **Evidensspärr:** en modul som kräver data som saknas får inte simulera dessa källobservationer. Den ska visa ett specificerat reservläge, döljas eller märkas som otillgänglig.
- **Källvärde:** officiellt publicerad eller i övrigt verifierbar tids-/resultatobservation. **Härlett värde:** transparent formel på källvärden. **Rekonstruktion:** illustrativ kartposition mellan observationer; aldrig uppmätt GPS-position.

### 0.2 Prioriteringar som inte får omtolkas
1. **Loppets identitet/år/distans längst upp.**
2. **Direkt därefter en kompakt faktaöversikt i EN rad med FEM boxar på desktop:** `Startande` · `Fullföljde` · `DNF` · `Tider kvinnor/män` (båda i SAMMA box) · `Snabbaste tid`. Ingen layout med två desktoprader.
3. **Besökarens personliga verktyg före allmän statistik:** `Hitta din löpare` → `Individuell analys` → `Direktjämförelse 2.0` → `Kartduell` → `Personlig loppplan`.
4. **Därefter fältstatistik och fördjupning.** Klubb-/ortanalyser, resultatdatabas, dataunderlag och metodik ligger långt ned.
5. **Ändra inte de fyra publicerade referensprodukterna bara för att uppfylla mallen.** Nya block får återanvända deras logik och UX-mönster. Regression i publicerade produkter är förbjuden utan separat uppdrag.
6. **Alla knappar och länkar måste ha verklig funktion.** Exempel: `Lägg till jämförelse`, `Ta bort`, `Öppna individuell analys`, `Öppna Direktjämförelse`, `Starta Kartduell`, `Spara`, `Dela`, `Nollställ` och `Planera mitt lopp`.
7. **Varje analytisk ruta, serie och beräkning har en fungerande `(i)`-knapp med hjälp enligt §13.** Ingen dekorativ informationsikon.

### 0.3 Referenser och källa till befintlig funktionalitet
- Ultravasan: https://github.com/Stayinhealthyrunning/ultravasan-analys – Engine 1.0, historia, Course Intelligence och Comparison 2.0.
- Gotaleden: https://github.com/Stayinhealthyrunning/gotaleden-splits – individuell analys, stafett-/lagkontrakt, metodhjälp och replay.
- Österlen Spring Trail: https://github.com/Stayinhealthyrunning/osterlen-spring-trail-analys – datadriven capability-gating, sparse data och olika banor över år.
- Sätila Trail: https://github.com/Stayinhealthyrunning/satila-splits – sidornas informationsordning, resultatrutor, karta/höjd, loppplan och flerårig Kartduell.
- **Normerande jämförelsekontrakt:** `ultravasan-analys/config/comparison-contract-v2.json` samt `reports/COMPARISON_2_0.md`. Koden i denna mall får inte urholka detta kontrakt.
- För varje nytt arbete: läs aktuell `main`, `AGENTS.md`, data-/course-kontrakt och senaste relevanta CI. Äldre README/statusdokument kan vara historiska.

## 1. Sidans informationsarkitektur – exakt ordning

Den konceptuella bilden visar 10 grupper. Denna specifikation gör grupperna implementerbara. **Det är ordningen i tabellen som gäller**; interna underrubriker får inte förändra den på desktop eller mobil.

| Ordning | ID | Sektion och synlig rubrik | Standardplacering | Aktivering |
|---|---|---|---|---|
| 1 | `race-header` | Loppets namn, bild och välj distans/år | Överst | Alltid |
| 2 | `race-facts` | Loppet i siffror | Omedelbart efter header | Alltid; kända delvärden |
| 3 | `runner-finder` | Hitta din löpare | Högt upp | Alltid när resultat finns |
| 4 | `runner-analysis` | Individuell löparanalys | Direkt efter sökning | Visa inbjudan; aktiv efter val |
| 5 | `direct-comparison` | Direktjämförelse 2.0 | Efter individuell analys | Alltid synlig väljare, analys när 2 val |
| 6 | `map-duel` | Kartduell – jämför på kartan | Efter Direktjämförelse | Visa även om datatäckning är begränsad |
| 7 | `personal-plan` | Personlig loppplan | Efter jämförelseverktygen | Alltid med resultat; segmentplan gated |
| 8 | `field-overview` | Loppets dynamik och fältets trösklar | Efter alla personliga verktyg | Finishdata |
| 9 | `extended-analysis` | Fler analyser och statistik | Efter fältöversikt | Underlag/capabilities |
| 10a | `course-history` | Bana, banversioner och historik | Längre ned | Underlag/capabilities |
| 10b | `results-database` | Resultatdatabas | Nästan längst ned | Publicerade resultat |
| 10c | `methodology` | Data, metod och datakvalitet | Sist före sidfot | Alltid |

**Desktop-wireframe (logisk, ej färdig färgsättning):**

```text
[ HERO / KORT INTRO ................................... DISTANS  ÅR ]
[ STARTANDE ][ FULLFÖLJDE ][ DNF ][ TIDER KVINNOR / MÄN ][ SNABBASTE ]  <-- EN RAD
[ HITTA DIN LÖPARE ...................................... SÖK / SPARA ]
[ INDIVIDUELL ANALYS .... öppna vid val / förhandsläge ............... ]
[ DIREKTJÄMFÖRELSE 2.0 ... två valda, analys, karta och höjd ........ ]
[ KARTDUELL ............... 2–5 valda, karta, replay ............... ]
[ PERSONLIG LOPPPLAN ..... måltid, passager, segmentandelar .......... ]
[ SLUTTIDSFÖRDELNING .................. FÄLTETS TRÖSKLAR ............. ]
[ TID/PLACERING ] [ DNF ] [ PACE ] [ SEGMENTLABB ] [ PRESTATIONER ]
[ KÖN/KLASS ] [ ÅLDER ] [ KLUBB/ORT ] [ HISTORIK ] [ BANA ]
[ RESULTATDATABAS ................................................. ]
[ DATA / METOD / PROVENIENS / INTEGRITET ........................... ]
```

**Mobil:** exakt samma ordning, kolumner bryts enligt §3.4. Användaren ska aldrig behöva scrolla förbi hela statistikverkstaden för att hitta personliga verktyg.

## 2. Designsystem och visuella standarder

### 2.1 Grid, spacing och skalor

| Token | Standardvärde | Krav |
|---|---:|---|
| `--layout-max` | `1440px` | innehåll centrerat |
| `--page-padding-desktop` | `24px` | 16–32 px tillåten i tema |
| `--page-padding-mobile` | `12px` | min 12 px |
| `--section-gap` | `20px` | kompakt, inte överdriven whitespace |
| `--card-gap` | `12px` | mellan parallella analysboxar |
| `--card-padding` | `16px` | 12 px på små skärmar |
| `--card-radius` | `12px` | lätt rundade ytor |
| `--control-height` | `44px` | minsta pekmål 44×44 px |
| `--shadow-card` | `0 2px 12px rgba(8,28,43,.07)` | subtil, inte tung |
| `--font-body` | `system-ui, -apple-system, Segoe UI, sans-serif` | ingen extern font krävs |
| `--font-size-body` | `16px` | innehållstext 15–17 px |
| `--font-size-small` | `13px` | metadata/hjälp, ej mindre än 12 px |
| `--font-size-h2` | `clamp(22px, 2vw, 29px)` | semantisk rubrikhierarki |

Tillåt temavariation i hero, bakgrunder, primärknappar och accentfärger. **Könsfärger och evidensstatus har semantik som inte får ersättas av tema.**

### 2.2 Semantiska färger och kontrast
- `male`: **blå** `#2563EB`; `female`: **rosa** `#DB2777` (eller kontrasttestad närliggande nyans). Färgerna följer M/F-analys genom samtliga system.
- `unknown/other/no reported value`: neutral grå, aldrig antagen könskategori. Event kan definiera fler publicerade kategorier neutralt.
- **Jämförelselöpare A/B:** tydligt skilda rollfärger som inte får tolkas som kön. Standard A blå `#2563EB`, B magenta `#C026D3`, tredje grön, fjärde orange, femte turkos/lila efter kontrastkontroll. Markörens form/initialer ska särskilja även utan färgseende.
- Höjd-/lutningsprofil: tydlig skala **grönt → gult → orange → rött** för tilltagande uppförslutning; negativa lutningar får en egen tydlig förklaring. Färggrad baseras på verifierade/normaliserade profilvärden.
- `success` grön, `warning` bärnsten, `error` röd, `neutral` grå; text + ikon ska alltid komplettera färg.
- Text/underlag minst WCAG AA-kontrast (4,5:1 för löptext, 3:1 för stora text- och UI-markörer).

### 2.3 Kortskelett för varje analysbox
1. Ögonbryn/analyskategori (frivilligt, en rad).
2. Titel i `h3`/`h4` på rätt nivå.
3. `(i)`-knapp i rubrikens övre högra hörn, `aria-label="Om [titel]"`.
4. Eventuell underrubrik som förklarar vald årgång/urval.
5. Diagram/tabell/KPI och verktygskontroller.
6. Legend inklusive enhet och källa/rekonstruktion.
7. Statusyta för tomt/litet/täckt underlag.
8. Inget horisontellt scrollande inne i modal eller diagram som designprincip; större tabeller får egen responsiv tabellvy eller kontrollerad tabellscroll.

### 2.4 Responsiva brytpunkter
- `>=1200px`: 12-kolumners huvudgrid; faktaraden **exakt fem parallella kort i en rad**, `grid-template-columns: repeat(5, minmax(0,1fr))`; gemensam höjd. Graf/diagram högst 2–3 per rad beroende på innehåll.
- `900–1199px`: **fortsatt fem faktakort i en rad** om innehållet förblir läsbart. Inuti `Tider kvinnor/män` får kvinnors och mäns innehåll radbrytas *inom samma kort* vid behov; kortet splittras aldrig till två kort.
- `600–899px`: faktakorten `grid-template-columns: repeat(2, minmax(0,1fr))`, sista kortet kan spänna två kolumner. Övriga sektioner max två kolumner.
- `<600px`: faktakort normalt två kolumner, sista spänner båda; vid <380 px eller textöverflöd en kolumn. Knappar 44 px, kartmodal fullskärm. Ingen horisontell dokumentoverflow vid `390px` eller `360px`.
- Vid `200%` webbläsarzoom ska allt innehåll vara tillgängligt utan överlapp; skala först ned grafetiketter och bryt i kolumner snarare än att dölja värden.

### 2.5 Typografi, talformat och axlar
- UI: svenska benämningar. Datum: `8 oktober 2026` i text, `2026-10-08` i maskindata.
- Tid: `H:MM:SS`, alltid `0:MM:SS` vid under en timme när jämförelsen annars kan bli tvetydig. Tidsskillnad: `+M:SS` / `−M:SS`. Längd `km` med svenskt decimaltecken. D+ i meter. Numeriska KPI:er med grupperade tusental, t.ex. `1 245`.
- Linjediagram: alltid både X- och Y-axel med märkta enheter, lagom täta skalstreck (minst 4 om spannet tillåter); grafen får aldrig klippa text/legender/etiketter.
- Två löpare: två faktiska serier där båda har stöd, synliga legendnamn **enbart namn och år**, axelskalor, eventuell noll-/100%-referens och tooltips.
- `min/km` och `km/h` kan bytas där fysisk distans är verifierad. När fysisk segmentlängd inte är tillförlitlig får **inte** pace räknas; tid och antal observationer kan ändå visas.

## 3. Tillstånd, filter och navigationskontrakt

### 3.1 Valda dimensioner
**Obligatoriskt tillstånd:** `eventId`, `raceFamilyId`, `raceEditionId`, `year`, `filters`, `runnerId`, `comparisonIds[]`, `mapDuelIds[]`, `planTargetSeconds`, `segmentId`, `replayTime`, `replayCamera`, `speedUnit`, `audioEnabled` (från användarens uttryckliga val), `infoDialogId`.

- Senaste tillgängliga/verifierade år för vald familj förvalt; planerad/inställd upplaga får inte behandlas som genomfört år.
- Standarddistans kan konfigureras per lopp (t.ex. Sätila 43 km); **måste vara explicit i `event.json`**, ej hårdkodad från namn eller kilometer.
- Byte av år/distans ska uppdatera sidhänvisningar, KPI, filtreringsalternativ och analysdata. Personlig aktiv profil stängs om resultatet inte tillhör den nya upplagan; jämförelseval över år **ska bevaras** när `Alla år`-läge används och får inte tyst rensas. Visa valda som `Namn (ÅÅÅÅ)`.
- Browser Back/Forward ska kunna återställa år/distans, sektion, profil och delad jämförelse där URL:en innehåller tillståndet.
- Direktlänk till ett resultat ska öppna relevant upplaga automatiskt och sedan profilen, även om annat år är förvalt.

### 3.2 Filter – explicit räckvidd
| Filter | Typ | Default | Påverkar | Påverkar inte |
|---|---|---|---|---|
| Kön | `F/M/annat/okänt`, där källan medger | Alla | Fältanalyser, tabell | Redan vald löparprofil, referensfältsmått definierade som fasta |
| Status | FINISHED/DNF/DNS/DSQ/UNKNOWN | Alla | Filterstyrda diagram och lista | Officiella absoluta årskort om de är låsta till hela upplagan |
| Klass | exakta publicerade klasser | Alla | Filterstyrd statistik | Resultatens ursprungliga klasser |
| Klubb/ort | källverifierad text, autokomplettering | Alla | Filtrerade resultat | Permanent identitet eller stafettetapp |
| Fartenhet | min/km eller km/h | min/km | Pace-diagram och tabeller | Källans registrerade tider |
| År/distans | edition/familj | explicit default | Kontext, publicerade urval | Jämförelseval i explicit flerårsläge |

**Kritiskt:** översta faktakorten beskriver normalt **hela valda RaceEdition**, inte det nedan filtrerade fältet. Fältfilter ska därför ligga under KPI-raden och vara tydligt märkta `Filter för analyserna nedan`. Visa två separata scopeindikatorer vid behov: `Loppets totaler` och `Aktuellt urval`. Filtrerade totaler får inte visuellt misstas för officiella totaltal.

### 3.3 Val och favoriter
- `Lägg till jämförelse`: en aktiv klickbar knapp intill sökträff/resultatrad och i individuell profil. Tryck tillför unikt **edition-scopat result-ID** till valt jämförelseläge; knappen ändras direkt till `Ta bort från jämförelse`. Knappen ska uppdatera räknare/chips utan sidomladdning.
- `Jämför två löpare`: aktiveras när **exakt två** giltiga resultat har valts; en text förklarar varför den är avaktiverad annars. Välj fler än två? Visa tydligt vad som gäller och erbjud Kartduell i stället; undvik tyst trunkering.
- `Starta Kartduell`: aktiveras med **2–5** resultat för visuell duell; event med eventuell stödd en-löparreplay använder separat `Se loppet på kartan`.
- Resultatval kan göras över år i `Alla år`-läge. Knappar för `Ta bort`, `Rensa valda`, `Öppna`, `Spara favorit`, `Dela` fungerar var för sig.
- Favoriter lagras per event i webbläsaren, enbart publika result-ID:n, inte profilkoppling baserad på namn; inget person-ID antas mellan år.
- Sök efter namn/startnummer/klubb med svenska tecken och utan krav på exakt versalisering. Debounce 150–250 ms, tangentbord pilar/Enter/Escape, aria-live-resultatantal och explicita no-match-förslag.

### 3.4 Fel- och laddtillstånd
Alla block ska stödja: `loading` (skelett utan layoutförskjutning), `ready`, `small_sample`, `partial_data`, `unavailable`, `error`, `stale_version`. Visa användbar svensk text och återförsök vid tillfälligt nätfel. Ett fel i en enskild modul ska **inte** stoppa hela analysen. Ändra inte `UNKNOWN` till DNF/DNS på antaganden.

## 4. Block 1 – herobild, loppidentitet och val

**ID:** `race-header` · **MÅSTE** · **Förvalt läge:** senaste publicerade RaceEdition inom explicit förvald familj.

**Skelett:** stor, skarp hero med löpare/banmiljö, aldrig suddig beskärning; text-overlay har kontrastgradient; loppets fullständiga officiella namn i `h1`, sekundär introduktion i högst 2–3 meningar. Väljare för distans/familj (knappar/tabbar eller rullista när många), därefter år/upplaga som `select`. Visa vid behov lagtävling/individ, startplats, datum, annonserad längd, stigning, banversion och källa. Hero från event assets; alternativ bildtext och delningsbild i config.

**Handlingar:** byte distans och upplaga utan full omladdning; efter byte uppdateras sektion 2 omedelbart, sedan resterande sektioner via lazy loading. Knappar har verkliga `aria-pressed`/`aria-selected`-lägen. Tydlig länk tillbaka till Loppanalys.se och gärna länk till officiell arrangör. Stora tävlingsfamiljer med >4 distanser bör ha rullista eller wrap utan horisontell overflow.

**Tomläge:** framtida upplaga märks `Planerad – inga resultat ännu` och kan inte öppnas som om analyserbar. Inställt år märks `Inställd` och skiljs från saknad import. En upplaga utan verifierad bana kan fortfarande visa resultat.

**Hjälp `(i)`:** `Om den valda upplagan`: "Distansnamnet är arrangörens namn. Bangeometri och faktisk distans kan skilja mellan år. Denna sida visar [år, distans, källa] och uppdateras när du väljer en annan upplaga. Historiska jämförelser visas endast där banorna är jämförbara."

## 5. Block 2 – loppet i siffror; EXAKT desktoplayout

**ID:** `race-facts` · **MÅSTE** · **Placering:** direkt efter hero, före löparsökning, utan filterfält framför. **Detta är en särskilt låst layoutregel.**

### 5.1 Layoutkrav och exakt kortordning

```text
┌─────────────────┬─────────────────┬─────────────────┬────────────────────────┬──────────────────┐
│ STARTANDE       │ FULLFÖLJDE      │ DNF             │ TIDER KVINNOR / MÄN    │ SNABBASTE TID    │
│ 1 245           │ 1 016           │ 86              │ Kvinnor  ...          │ 4:03:12          │
│                 │ 81,6 %          │ 6,9 %           │ Män     ...          │ [löpare/lag]     │
└─────────────────┴─────────────────┴─────────────────┴────────────────────────┴──────────────────┘
                ALLA FEM BOXAR PÅ EN OCH SAMMA HORISONTELLA RAD PÅ DESKTOP
```

- **Exakt fem kort, exakt en rad vid bredd >=900px** om läsbarhet säkras; vid smalare skärm tillåts mobilanpassning enligt §2.4.
- Likahöga kort. Fast rubrikrad och flexibelt innehåll. Inga två-raders desktoprutor och inte separata kvinnor/män-kort.
- `Tider kvinnor/män` är **ett enda gemensamt kort** med två tydliga inre fält (`Kvinnor`, `Män`). Visa både **medeltid** och **mediantid** i samma kort med fullständiga etiketter för att undvika förväxling: huvudtal = `Mediantid`, sekundärrad = `Medeltid`, per kön. Detta löser att äldre önskemål avsåg median medan senaste önskemålet uttryckligen också nämner medeltid. Vill projektägaren visa bara ett av måtten måste det anges som konfigurationsavsteg, inte lämnas åt Codex att tolka.
- Vid lågt utrymme: en rad per kön inom samma kort (`Kvinnor – median ... · medel ...`, följt av män). Ingen intern sidscroll.
- För stafett/team utan säkra könsklasser: kortet heter `Tider per grupp` och visar källstödda tävlingsklasser enligt config, alternativt `Uppdelning saknas`; det får **inte** härledas kön från lagmedlemmar. Om grupperna är fler än två kan innehållet visa en primär rad + `Visa klasser`, **fortfarande ett kort**.
- Inget illustrativt/fiktivt värde får följa med till produktion. Siffror hämtas från vald edition och uppdateras vid år/distansbyte.

### 5.2 KPI-definitioner

| Kort | Synlig etikett | Formel och underlag | Sekundärinformation | Tom-/felläge |
|---|---|---|---|---|
| 1 | **Startande** | Antal unika edition-scopade resultat med **verifierad start**: `FINISHED + DNF + DSQ + annan explicit STARTED`, aldrig DNS/UNKNOWN | `Av N publicerade anmälda` endast när anmälningsantal verkligen finns | `Ej fastställt` vid saknad startinformation; visa inte ett antaget tal |
| 2 | **Fullföljde** | Antal `FINISHED` med positiv giltig officiell sluttid | `X % av startande`, om nämnaren definierad | `–` om tävlingsdata inte finns |
| 3 | **DNF** | Antal med **officiell** status `DNF` | `X % av startande`; inte DNS, DSQ eller UNKNOWN | `–` där DNF inte kan särskiljas i källan |
| 4 | **Tider kvinnor/män** | För respektive källstödd grupp: **median** och **aritmetiskt medel** av positiva sluttider för `FINISHED` i gruppen; samma edition | `n=...` per grupp i `(i)` och eventuellt liten stödtext | Om grupp saknas: `Uppgift saknas`, inte noll; median/medel visas bara när `n>=5` enligt §12 |
| 5 | **Snabbaste tid** | Lägsta giltiga `finish_seconds` bland `FINISHED` med officiellt resultat | publicerat namn + år/klass, om tillåtet; vid delad snabbaste tid `Delad snabbaste tid` | `–` om ingen fullföljare |

**Övergripande statusprincip:** `Anmälda` får inte synonymiseras med totalt antal resultatrader. Om faktiska anmälningsdata finns visas detta som ett diskret extra faktum i undertext eller detaljpanel, **inte ett sjätte desktopkort**. `Fullföljandegrad=FINISHED/STARTED`; `DNF-andel=DNF/STARTED`. `UNKNOWN` och DNS ingår inte i startnämnaren. DSQ räknas som startande endast med stöd av definierad källstatus. Visa antal exkluderade/okända i `(i)`.

**Interaktioner:** hela kort kan öppna ett expanderat faktablad längre ned eller informationsmodal; snabbaste löparens namn kan öppna profil; kort får inte gömma den viktiga informationen bakom hover. År/distanser styr ny beräkning. Huvudfilter ändrar inte officiella totalsiffror.

**Formler:**
- `median(S)` = mittvärdet av sorterade tider; jämnt `n` = medelvärdet av de två mittersta.
- `medeltid(S) = sum(finish_seconds) / n` med avrundning till närmaste sekund **efter** aggregation.
- `rate = 100 * numerator / starters`, en decimal, bara om `starters > 0`.
- Saknade könsuppgifter exkluderas ur M/F-uppdelningen men inkluderas i totaler och snabbaste tid; visa täckning.
- Vid `FINISHED` utan giltig tid: avvikelsen är datakvalitetsfel; skapa inte uppskattad tid.

**Obligatoriska `(i)`-knappar:** separata för de fem korten. Full hjälptext finns i §13.2. `Tider kvinnor/män` ska tydligt förklara skillnaden **medel vs median**, gruppuppgiftens ursprung och bortfall.

## 6. Block 3 – Hitta din löpare

**ID:** `runner-finder` · **MÅSTE** · **Huvudrubrik:** `Hitta din löpare` (eller `Hitta ditt lag` om entity=team) · **Placering:** efter faktaraden.

### 6.1 Sökgränssnitt och tabell
- Sökfält `Sök namn, startnummer eller klubb`; träfflista inom samma panel, aldrig obligatorisk navigering till längst ned på sidan.
- Kolumner på desktop: `Namn/lag`, `År`, `Startnr`, `Klubb/ort` (om känd), `Klass`, `Sluttid/status`, `Åtgärder`. På mobil: radkort med viktigaste värden och synliga åtgärdsknappar.
- Stöd `Alla år` som separat sökläge för att hitta historiska resultat, med senaste upplaga som default. Matchning på namn skapar **inte** gemensam personidentitet över år.
- Träffar pagineras/virtualiseras; första 10 resultat visas direkt med `Visa fler` där behövligt. Tom sökning visar hjälpinstruktion i stället för hela databasen.
- Klubbsök: autokomplettering med verkliga publicerade klubbvärden och tangentbordsstöd. Ingen fuzzy merge av klubbar utan separat aliaslista.

### 6.2 Handlingar i VARJE sökträff
| Kontroll | MÅSTE göra | Tillstånd/feedback |
|---|---|---|
| `Öppna analys` | Öppna individuell profil i stor modal eller integrerad vy | Fokus flyttas till rubriken; återgår till ursprung vid stängning |
| `Lägg till jämförelse` | Lägg till resultat i direktjämförelse-väljaren | Ändras till `Ta bort`, valda chips och räknare uppdateras |
| `Lägg till Kartduell` | Välj detta resultat för 2–5-läget | Avviker bara visuellt från direktjämförelse när lägena kräver separat urval |
| `Spara löpare` | Spara publikt result-ID som lokal favorit | Ändras till `Ta bort favorit` och uppdaterar sparadelistan |
| `Dela resultat` | Skapa stabil länk till exakt edition+result-ID | Web Share eller kopiera länk; faktisk felhantering |

När sökträffen representerar ett team: byt text till `lag`, visa lagets publika uppgifter, men skapa aldrig en implicit etappkoppling.

### 6.3 Valraden och räknare
- Sticky/kompakt väljarrad inne i personlig del: `Valda till jämförelse: Anna (2025) × · Erik (2026) ×`.
- Visa endast **namn och år** i chip, inga långa klasser/klubbar/statusar.
- `Jämför två löpare (2/2)` aktiveras vid exakt två. `Starta Kartduell (3/5)` aktiveras vid 2–5; knapparna ändrar status i realtid.
- Byter användaren år i ett flerårsläge kvarstår valda resultat; nytt år ändrar sökträffar, inte urvalet. Duplicerade result-ID:n blockeras. Meddelande vid gränsen fem.

**Hjälp `(i)`:** se §13.3. Förklara separat `Sökning`, `Favoriter`, `Jämförelseval`.

## 7. Block 4 – Individuell löparanalys (prioriterad)

**ID:** `runner-analysis` · **MÅSTE som modul**, innehåll datagatat per vald upplaga. **Öppning:** från resultat, sökning, sparade löpare, kartjämförelse eller delad direktlänk. Kan vara stor modal (rekommenderat med tydlig stängning) eller inline-panel direkt under sökning; aldrig längst ned som enda inträde.

### 7.1 Profilens fasta interna ordning
1. **Profilhuvud:** namn/lag, startnummer, år, distans, officiell status, klubb, klass; `Föregående/Nästa` endast där en definierad resultatlista finns. `Dela`, `Spara favorit`, `Lägg till jämförelse`/`Ta bort från jämförelse`, `Planera måltempo` och `Stäng`.
2. **Loppet i korthet:** sluttid (eller senaste officiella observation för DNF), officiell totalplacering, klassplacering (om publicerad), snittfart om verifierad distans, andel av fältet som deltagaren slog (med tydlig kohort), starkaste/svagaste verifierade segment och passagetäckning. Avsaknad visas `–`, aldrig uppfunnet värde.
3. **Personlig replay:** karta över aktuell tillåten bana, markör, höjdprofil direkt **under kartan**, tidsreglage, start/paus, återställ, kameraval, ljud, hastighet/uppspelningstid och seek genom segment eller checkpoints. Se §10.
4. **`Fart per delsträcka i förhållande till hela loppet`:** procentuell fart relativt individens egen verifierade hel-loppsfart; **streckad 100%-linje**; `Start` första referenspunkt. Ej visa fysisk fart där segmentdistans ej tillförlitlig.
5. **`Tidsåtgång per delsträcka`:** staplar/linje för riktiga segmenttider, `Start` som första punkt (tid 0); Y-skala med tidsenheter, X = delsträckor i banordning.
6. **Placeringsresa:** officiella totalplaceringar endast där källa publicerar dem; Y-axeln inverterad så plats 1 är högst; luckor för saknade mätningar.
7. **Tidslucka mot referensfält/klass:** jämförelse mot stabil **komplett FINISHED-kohort** inom respektive definierad klass/edition, inte flytande kohort per checkpoint. Ange vald referens.
8. **Pacing-profil:** segmenten i banordning, relativ styrka, var placering/tid vanns/förlorades, källstödda observationer.
9. **Mellantidstabell:** `Kontroll`, `Distans`, `Ackumulerad tid`, `Segmenttid`, `min/km` (om säkert), `Officiell placering` (om publicerad), `Datakälla`. Sorteras i kronologisk banordning, inte på tid som standard.
10. **Käll- och täckningsnot:** antal observerade/krävda kontroller, vilka som saknas, version av rutt och interpolationens begränsning.

### 7.2 Synkronisering och handlingar
- Klick på segmentstapel, segmenttabell eller höjdprofil **markerar motsvarande segment på karta och i övriga diagram**.
- Klick på källdokumenterad checkpoint gör `seek` till motsvarande verklig passagetid; markerar samma kontroll i karta/höjd utan att spela upp automatiskt.
- Hover är endast komplement. Klick/touch/Enter/Space ska fungera.
- `Lägg till jämförelse` byter knappstatus och global valrad direkt; profilen behöver inte stängas.
- `Planera måltempo` fyller förslagsfält med vald löpares tid om denna är giltig; annars loppets median (ej hårdkodat mål).
- `Dela loppet` skapar URL med event, edition och **unikt result-ID**, inte bara namn/startnummer utan år.
- DNF: analys endast till sista verkliga observation; ingen syntetisk målgång eller placering. DNS: statusvy utan falsk replay.

### 7.3 Datagating
- Ingen äkta split → visa officiellt slutresultat och jämförelse mot fältets sluttider; meddela `Mellantider saknas för denna upplaga – delsträckeanalys visas inte.`
- Äkta splits men ingen redistribuerbar route → visa tabeller/segment men stäng map och märk orsak.
- Ingen pålitlig fysisk segmentdistans → visa tidsåtgång och faktiskt antal passager, inte min/km.
- Teamresultat → lagprofil, inte tillskrivna individuella löpare eller etapper.

**Obligatoriska hjälptexter:** individkort, relativ fart, tidsåtgång, placeringsresa, fältgap, pacing, replay, mellantidstabell, källstatus – se §13.4.

## 8. Block 5 – Direktjämförelse 2.0

**ID:** `direct-comparison` · **MÅSTE** · **Normativ källa:** Comparison 2.0-kontraktet i Ultravasan. **Exakt två** edition-scopade resultat; deltagare/lag enligt adapterkontrakt.

### 8.1 Väljare och aktivering
- Rubrik `Direktjämförelse 2.0`, kort introduktion: `Välj två resultat för en detaljerad jämförelse av tider, placeringar, delsträckor och – när underlaget räcker – replay på kartan.`
- Väljare A och B med autokomplettering, filter `Valt år`/`Alla år`, stöd för resultat med samma namn från olika år, chip `Namn (år)`.
- `Lägg till jämförelse` från profil/tabell ska kunna fylla första lediga plats. Vid tredje direktval visas `Direktjämförelse använder exakt två resultat. Byt eller ta bort ett val, eller använd Kartduell.`
- Primärknapp `Öppna Direktjämförelse` aktiv bara vid två giltiga resultat. `Byt A/B`, `Rensa valda`, `Dela` finns inne i vyn.
- Om valen är från olika upplagor tillämpas separata evidensgrindar för slutresultat, checkpoint, segment och gemensam geometri; **inte** total avstängning av all jämförelse.

### 8.2 Modalens ordning och layout
1. **Stor rubrikdel** med två namn/år, distans, status, tydlig stängning.
2. **Två parallella faktakort**: sluttid/status, officiell placering, klass, antal verifierade checkpoints; direkt sammanfattning av verklig jämförbarhet.
3. **Tidslucka:** linjediagram med officiella gemensamma checkpoints, X = banordning/distans, Y = signerad tidsskillnad; nollinje och axelskalor. `B:s ackumulerade tid − A:s`; positivt betyder A före, men UI ska skriva `A före med 3:14`.
4. **Placeringsresa:** två linjer endast där officiella placeringsvärden finns; invers Y-axel (1 högst); aldrig beräknade placeringar.
5. **Segmentduell:** `Start → första kontroll` till `sista kontroll → Mål`, bara när respektive ändpunkter är verkliga. Segmentskillnad `B:s segmenttid − A:s`. Klick visar båda värden, tid som vanns och evidens.
6. **Fältpacing:** varje deltagares segmentfart mot **den egna upplagans** stabila referensmedian. Nollinje `0 % = fältmedian`; positiv = snabbare. Referens `n>=5`.
7. **Gemensam interaktiv bana/replay:** karta hela modalens tillgängliga bredd, höjdprofil **under** kartan, två markörer, två banlinjer när olika års geometrier, gemensam klocka, synkroniserade checkpoint/segment.
8. **Metod och datakvalitet:** vad som är källa, härledning, rekonstruktion och vilka jämförelser som inte är tillåtna.

### 8.3 Viktiga preciseringar
- Om samma loppår: individuella resultat med verkliga endpoints på samma analyssegment kan jämföras.
- Över olika år: whole-course-tidsskillnad kräver **explicit verifierad jämförbarhetsgrupp**; segmentjämförelse kräver explicita jämförbara segment plus exakta endpoints. Samma marknadsförda distans räcker inte.
- Checkpointgap bygger endast på gemensamma verkliga passager. Det får inte interpoleras analytiskt.
- Fältmedian är editionsspecifik. A och B från olika år jämförs var för sig mot respektive års fält; kalla det inte gemensam absolut prestation.
- Sparsamma data: visa `START → [verklig checkpoint] → MÅL` när den finns. Skapa aldrig "extra segment" eller syntetiska lagbyten.
- Modal: bredd `min(1440px, calc(100vw - 32px))`, maxhöjd `calc(100dvh - 24px)`, vertikal scroll i modalens *innehåll*, inte horisontell. Desktopkontroller på gemensam rad där plats finns; klocka, kamera, uppspelningslängd och musik ska linjera snyggt.
- Två separata kartmarkörer måste vara urskiljbara även om de överlappar; använd halvt transparent fyllning/offset/outline, ingen opak markör som gömmer den andra.

### 8.4 Interaktioner
`Spela/Pausa`, `Återställ`, `Sök tid`, `Till checkpoint`, `Välj segment`, `Kamera: Hela banan / Följ båda / Följ ledaren`, `30/60/120/180 s`, `Musik av/på`, `Volym`, `Zoom +/-`, `Anpassa karta`, `Dela länk`, `Stäng`, `Back/Forward` ska fungera enligt §10. Kartklick och höjd-/segmentklick får inte förstöra användarens valda deltagare.

**Hjälptext:** används från Comparison 2.0, kompletteras med eventets särskilda course/evidence-regler; se §13.5.

## 9. Block 6 – Kartduell, 2–5 löpare/lag

**ID:** `map-duel` · **MÅSTE ha gränssnitt**, replay styrs av capability. Syftet är **visuell gemensam uppspelning**, skilt från den analytiskt djupa Direktjämförelsen.

- Välj **2–5** resultat (stöd enstaka löpare enbart i separat `Individuell replay`). Visa `Valda: x/5`; chips endast namn och år; `Alla år`-sökning kan välja resultat från olika år.
- Primära knappar: `Lägg till Kartduell`, `Ta bort`, `Rensa`, `Starta Kartduell` och `Dela`. Om mer än fem markeras: stoppa tillägget med begripligt meddelande, ersätt inte osynligt ett annat resultat.
- Kartmodal: fullbreddskarta, samtidiga positionsmarkörer, höjdprofil under, tydliga banfärger och märkt rekonstruktion. Olika års geometrier ska ritas var för sig där evidens/rättigheter medger det.
- Uppspelningen delar **gemensam tid sedan respektive start**, inte påstått identiska startklockslag. Alla löpares positioner projiceras från tillåtna riktiga tidankare.
- Default kamera `Följ båda` vid två; för 3–5 `Följ alla`/`Hela banan` ska finnas om implementerat. Pan/zoom från användaren får inte omedelbart överstyras utan begriplig handling `Återgå till följning`.
- Under uppspelning: bevara markerade resultat, vald modal och kartlager. Undvik tile-refresh per animation frame – ingen "blinkande/flimrande" karta.
- Om en löpare saknar splits: visas antingen endast kontrollerade delsträckor eller en tydligt märkt otillgänglig replay. **Inte** fiktiv exakt GPS-position.
- Om två resultat har samma måltid ska deras målmarkörer sammanfalla på den respektive verifierade målpositionen; inga godtyckliga förskjutningar av tidsaxeln.
- Spela musik endast efter uttrycklig användarhandling och tillgänglig eventmusik; volym standard 30 %. Reselektor och delbar URL fungerar även när audio inte finns.

**Hjälp `(i)`:** `Kartduell`, `Årsjämförelse`, `Rekonstruktion`, `Banversion`, `Musik/uppspelning` – §13.5–13.6.

## 10. Gemensamma replay-, kart- och höjdkontrakt

### 10.1 Tidsbas, position och höjd
- Race clock mäts i `elapsed_seconds` från respektive startsignal/official race elapsed clock, inte ett antaget gemensamt väggklockslag.
- Replayankare är godkända observationer med `elapsed_seconds`, `route_distance_km` och `observation_kind` samt explicit `course_version_id`.
- Interpolation **endast för visning** inom två närliggande verifierade ankare: `d(t)=d0+(d1−d0)*(t−t0)/(t1−t0)`; inga resultatsplits eller officiella placeringsvärden genereras.
- Om sista verkliga observationen för DNF är en kontroll: markör stannar där eller försvinner enligt tydligt märkt policy; den får aldrig springa i mål. DNS har ingen replay.
- Höjden hämtas ur versionerad normaliserad referensprofil på **samma distansaxel som kartan**; höjdmätningens metod/proveniens ska framgå.
- Fysisk pacing kräver verifierad geometrisk delsträcka; officiella timing-"km" är inte automatiskt GPS-distans.

### 10.2 Regler och standardkontroller
| Kontroll | Default | Förväntat beteende |
|---|---|---|
| Start/Paus | Paus vid öppning | Start från aktuell playhead, tangentbord och touch |
| Återställ | ej aktiv förrän relevant | Stoppar klockan och placerar markörer vid start |
| Uppspelningstid | **120 sekunder** | val **30, 60, 120, 180 sek** för normaliserad hel uppspelning |
| Kamera | **Följ båda** för 2 | `Hela banan`, `Följ båda`, `Följ ledaren`, utöka för flera |
| Musik | Av tills användaren uttryckligen startar/aktiverar | spelar eventfil om tillgänglig; **30 %** standardvolym; preferens lokalt per event |
| Zoom | auto-fit vid öppning enligt valda rutter | zoomknappar, scroll/pinch, egen pan paus på kameraföljning |
| Regler | aktuell tid / max tid | dragbar playhead uppdaterar karta och profil samtidigt, ingen gammal visuell position |
| Checkpoint-seek | – | söker till **verklig** publicerad passagetid för vald runner när möjligt |
| Segment-seek | – | markerar segment i karta+profil+tabell, visar källstatus |
| Delning | – | URL innehåller edition/result-ID:n, läge och tillåten replayposition/kamera |

- **Mjuk kamera:** följningsläge justerar bounds kontinuerligt utan upprepade brutala `fitBounds`/tile-reloads. Kartlager skapas EN gång per öppning och uppdateras inkrementellt.
- **Frysta element:** höjdprofilens axlar uppdateras inte om varje frame; endast playhead/markörer uppdateras. Undvik DOM-rebuild av hela karta/modalyta under `requestAnimationFrame`.
- **Kontrollrad:** desktop klocka | tidsreglage | uppspelningstid | kamera | musik | volym ska ligga i tydliga linjer; responsiv nedbrytning först vid begränsad bredd; inga reglage får falla utanför.
- **Tillgänglighet:** `prefers-reduced-motion` ger stillbild + manuellt tidssteg; ljud av som automatiskt fallback. Tangentbordsstyrning, fokusring och skärmläsarstatus ska fungera.
- **Karta/höjdprofil:** karta först, höjdprofil under, gemensam distansskala, gradient grön→röd på stigning, markera start och mål, checkpointnamn från config (inte rå `32 km` om verifierat visningsnamn är `Bengtemölla Kvarn`).

### 10.3 Undantag som INTE får kringgås
- GPS-källa: kontrollera ägande/redistributionsrätt innan publicering av deltagarspår. En privat deltagar-GPX är **inte** automatiskt godkänd som offentlig route asset.
- Endast källverifierade teametapper/lagväxlingar visas som officiella. Medlemslista ≠ verifierad etappfördelning.
- Olika banversioner kräver separata versionerade rutter; använd aldrig modern rutt som tyst historiskt facit.
- Långsamma/bortfallna tiles får ge bakgrundsfallback, men uppspelning, markörer och kontrollrad får inte försvinna eller blixtra.

## 11. Block 7 – personlig loppplan

**ID:** `personal-plan` · **MÅSTE** med transparent degradation; standardrubrik **`Simulera ditt lopp baserat på faktiska tidigare tider per delsträcka`**.

### 11.1 Huvudgränssnitt
- **Måltid** inmatning `H:MM:SS`, plus/minus snabbjustering `±5 min`, `±15 min`, samt `Återställ till mediantid`.
- **Default måltid = aktuell valda RaceEditions median av giltiga FINISHED-sluttider**, inte medianen från annan distans/år och aldrig ett godtyckligt hårdkodat tidsvärde. Om n < 5 eller ingen median: använd tydligt märkt manuellt inmatningsläge med tomt fält.
- `Bygg loppplan` är primärknapp. `Jämför med min tidigare tid`, `Visa på karta`, `Dela plan`, `Skriv ut` och `Återställ` visas där respektive funktion kan genomföras.
- Valbar referens: `Hela fältet` (standard), `Kvinnor`, `Män`, `Klass` och `Mina tidigare lopp` **endast där verifierad data finns**. Visa n och vilken edition/banversion referensen avser.
- Planens tabell: `Från`, `Till`, `Distans` (endast verifierad), `Andel av loppet (%)`, `Beräknad segmenttid`, `Ackumulerad passagetid`, `Beräknad pace` (endast känd distans), `Underlag`.
- Samma segment väljs och framhävs vid klick i tabell, karta och höjdprofil. Export med jämförelse mot en personlig tidigare prestation där sådan är källsäker.

### 11.2 Algoritm och noggrannhet
- Välj deltagargruppen `C` = FINISHED med **äkta positiva passager för samtliga** analytiska segment i relevant CourseVersion och med giltiga målresultat.
- `w_j = median_{r in C}(segment_time(r,j) / finish_time(r))`; normalisera `p_j = w_j / sum(w_j)` så `sum_j p_j = 1`.
- För en måltid `T` tilldela `plan_time_j = T * p_j`; avrunda till hela sekunder med **största restmetoden**, så att summan av segmenttider **exakt blir T** och sista passagetiden blir måltiden.
- Minst `n=5` kompletta jämförbara resultat för historiskt vägd plan. Om färre: visa inte `baserad på faktiska tider per delsträcka`. Använd endast enkel målfart/avståndsbaserad uppskattning där fysisk segmentdistans är verifierad, märkt **`Distansbaserat räkneexempel – inte historiskt segmentmönster`**. Om även distans saknas: visa enbart total måltid med tydlig begränsning.
- Resultat från annan banversion får användas endast med uttryckligen verifierad same-course/segment-comparison-regel och dokumenterat val; annars inte.
- Beräkningen är ett **scenario** och ingen framtidsprognos. Vind, väder, temperatur och stopp ingår inte utan separat verifierad modell.
- `Personlig referens` får bara använda samma verifierade personnyckel och banjämförbarhet, aldrig namnmatchning.
- Om beräknad segmenttid blir <=0 eller checkpoint saknar konsistent ordning: valideringsfel, ingen publicering av delplan.

### 11.3 Presentation, förklaringar och reservationer
- Visa alltid enhet, referensår, distans, `n` och status `historiskt fördelad` / `distansbaserat räkneexempel` / `otillräckliga underlag`.
- Visa tempo/pace endast där fysisk banlängd är tillförlitlig; tid kan vara tillgänglig även när pace är spärrad.
- `Planerad passagetid` är ackumulerad **tävlingsgångtid** efter start, inte lokal klocktid om startens faktiska klockslag saknas.
- Tydlig `i` enligt §13.6.

## 12. Block 8–10 – standardbibliotek för statistik, bana och nedre sektioner

Varje nedan nämnd modul SKA vara implementerad i det återanvändbara biblioteket. Publicering i ett specifikt lopp styrs av capability och faktisk käll-/fält-täckning; ett nytt lopp ska normalt inte behöva ny specialkod för statistiken.

### 12.1 Block 8 – Loppets dynamik och fältets trösklar

**Modul `finish-distribution` – `När gick fältet i mål?`**
- Histogram av `FINISHED` med positiv `finish_seconds` för vald edition, sekundärt filtrerat urval om filter finns. X-axel i `H:MM`, Y-axel antal. Startintervall vid nedåtrundad minimitid; default binbredd 15 min, eventkonfigurerbar 10/15/30/60 min så att 8–35 synliga intervall eftersträvas.
- Toggle `Alla`, `Kvinnor`, `Män` där könsdatan räcker; män blå, kvinnor rosa, saknat kön neutralt. **Alla** ska alltid räkna även okänt kön.
- Streckade markörer för `P10`, `Median/P50`, `P90` och valfri snabbaste tid, var och en med tooltip; i fördelningen kan en serie per kön läggas över med transparens men legend måste visa vad som räknas.
- Hover/klick visar `Intervall`, `Antal`, `Andel`, `Grupp`. Ingen exakt målgångstid för en viss individ fabriceras av histogram.
- `(i)` i §13.7.

**Modul `finish-percentiles` – `Fältets trösklar`**
- Lista/diagram med **P10, P25, P50, P75, P90** av godkända FINISHED-sluttider; `P10` är tiden som de snabbaste cirka 10 % klarar eller underskrider (lägre tid = bättre); `P50` = median.
- Ange statistisk kvantilmetod: sortera `x[0..n-1]`, `h=(n-1)*p`, linjär interpolation `q(p)=x[floor(h)]+fraction*(x[ceil(h)]−x[floor(h)])`; median definieras i §5.2 och är densamma som `q(.5)`.
- Visa totalfält och valbar M/F-uppdelning, alltid med `n` och tydlig etikett `P10 / P50 / P90`. Visa `Ungefär X % snabbare` för **vald sluttid** enbart via verkliga resultattider, inte omvänd approximativ tabellranking.
- Interaktiva markörer: klick på P-värde förhandsfyller `Personlig loppplan` med den tidens värde eller hoppar till måltidsimulatorn; detta ska vara tydlig åtgärd med knapptext.
- `(i)` i §13.7.

**Modul `target-vs-place` – `Vad räcker tiden till?`**
- Reglage/inmatning för valt `H:MM:SS`; default aktuell median (n>=5), inte hårdkodat värde. Visa antal `FINISHED` med sluttid `<=T`, andel, ungefärlig position i valda *publicerade* resultat och relevant grupp/klass när underlag räcker.
- För exakt officiell `overall_place` används data endast från verkliga resultatrader; en hypotetisk måltid ska visas som **retrospektiv ungefärlig placering**, inte officiell startposition.
- Uppdatera graf/utfall vid knapp/reglage. Lägg separat `Planera detta mål` → block 7.
- `(i)` i §13.7.

### 12.2 Block 9 – fördjupade resultatanalyser

| Modul-ID | Rubrik | Minsta datakrav / presentation | Huvudhandling |
|---|---|---|---|
| `time-vs-place` | Tid mot placering | FINISHED med officiell sluttid **och** officiell totalplacering; scatter med båda axlar, köns-/klasslegend | Zooma genom drag och `Återställ zoom`; klicka datapunkt för löparprofil |
| `status-breakdown` | Status i loppet | FINISHED/DNF/DNS/DSQ/UNKNOWN separat, utan statusgissning | Filtrera fältanalys efter status (inte övre officiella faktarad) |
| `dnf-course-flow` | Avhopp genom loppet | DNF + verkliga passager; annars bara DNF-antal | Välj kontroll för observerad täckning, aldrig "bröt just där" |
| `segment-stats` | Delsträckornas karaktär | Verklig start/slut-tid per segment; fysisk pace kräver verklig distans | Klicka segment → karta, höjd och segmenttabell |
| `segment-lab` | Delsträckelabbet | Två valbara **verkliga** analyspassager och giltiga ändpunkter | Från/Till/klass/sortera efter tid, fart (om giltig), placering |
| `placement-gains` | Största avancemang | Publicerad placering vid minst två punkter | Klicka löpare för profil |
| `strongest-finish` | Snabbaste avslutningen – spurten mot mål | Sista officiella analyskontroll före MÅL samt mål, verkliga tider | Kvinnor/män sida vid sida och valbara klasser |
| `standouts` | Prestationer som sticker ut | Valid scoring/observerade resultat | Tabbar `Jämnast`, `Största förbättring`, `Snabbaste avslutning`, `Flest lopp` – endast verifierbara lägen |
| `pacing-retention` | Fart jämfört med eget loppsnitt | Komplett FINISHED-referenskohort, tillförlitliga segmentdistans/tid | Kön/klass-serier, streckad **100 %**-linje, hover+klick |
| `field-spread` | Fältets spridning genom loppet | Minst 5 kompletta FINISHED med äkta checkpoints | Median och Q25–Q75 per segment, Q10–Q90 vid n>=20 |
| `gender-classes` | Klasser och kön | Källstödd köns-/klassdata; saknat kön inte infererat | Byt klass/visning, välj 1–5 klasser |
| `age` | Åldersanalys | Verklig exakt ålder eller officiell åldersklass; separat täckningsgrad | Filtrera åldersgrupper, växla antal/median |
| `clubs` | Klubbar och orter | Publicerad klubb/ort, exakta filteralias | Autokomplettera, jämför upp till 4 grupper |
| `podium` | Pallplatser & toppresultat | Publicerad rankning eller strikt rankad FINISHED-resultatlista enligt källkontrakt | Klicka placering/person, växla kvinnor/män/klass |
| `edition-history` | Loppets utveckling genom åren | Minst 2 dokumenterade editions, jämförbarhet tydligt deklarerad | Årsväljare, antal, andel, median bara i tillåtna grupper |
| `person-history` | Löparen genom åren | Explicit verifierad canonical person-identity, inte namnlikhet | Öppna resultat och jämför över år |
| `course-difficulty` | Banans svårighetsprofil | Tillförlitlig versionerad bana, höjd och verkliga segmentsplits | Klicka segment för synk karta+höjd+analys |
| `route-version` | Banversioner | Verifierad version/proveniens per edition | Visa årens banvarianter på karta |

**Varje modul ska ha egen `(i)` enligt §13.8–13.12**, även om tabellen ovan sammanfattar dem. `age`, `clubs`, `pacing-retention` och `history` flyttas **inte** ovanför de personliga blocken.

### 12.3 Detaljregler för utvalda statistikmoduler

**A. `time-vs-place`**
- X-axeln = sluttid, Y = officiell placering (1 högst), läsbara etiketter; alla publicerade punkter med tillräckligt underlag; Y får inte ersättas av filtrerad omräknad rang.
- `Lasso/rutmarkering` eller dragzoom och `Zooma in`, `Återställ`; muspekaren får inte stanna i dragläge efter avslut. Klick på datapunkt öppnar samma resultat som sökning.
- Stafett med unranked mixed-fri visar inte artificiell officiell rang.

**B. `dnf-course-flow`**
- Visa `Startande`, `passerade` per faktisk kontroll och `Fullföljde` där jämförbara observationer finns. En saknad split bevisar **inte** att löparen bröt där; redovisa datatäckning och använd separata etiketter `senast observerad` endast om observationen faktiskt finns.
- I lopp som Sätila utan tillförlitliga DNF-observationer: visa enbart officiellt DNF-antal/andel och hjälptext `Ingen verifierbar avhoppsplats finns`; aldrig fabricerad sista kontroll.

**C. `segment-stats`, `field-spread` och `course-difficulty`**
- För pacing jämförs bara kompletta FINISHED-resultat där alla efterfrågade passager finns, när det krävs samma kohort över loppet. Redovisa tydligt när ett separat segmentdiagram i stället har segmentvis n – blanda inte dessa populationer under samma rubricering.
- `median` n>=5; `Q25–Q75` n>=10; `Q10–Q90` n>=20; ingen statistisk bandyta under respektive tröskel. Bandet är fördelningsintervall, **inte** konfidensintervall.
- Fartdiagram använder genomsnittlig km/h respektive min/km enligt datatillgänglighet; räkna kvantiler på observationer i visad enhet, inte genom att felaktigt invertera gruppkvantil.
- Kursens svårighet beskriver observerade variabler (stigning, fartvariation, placeringsförändringar), inte en uppfunnen teknisk stigsvårighet eller syntetiskt totalscore.

**D. `strongest-finish` och `standouts`**
- `Snabbaste avslutningen – spurten mot mål` ersätter ospecifika "sista verifierade delsträckan". Kontroll → MÅL måste vara den verkliga sista **officiella analytiska** kontrollen, inte valfri speakerpassage.
- Visa män och kvinnor **sida vid sida på desktop** med blå/rosa markörer och var sin topp 3/ranking om underlag räcker. Vid team, visa officiella tävlingsklasser utan antagen könsklassificering.
- `Starkaste avslutningen` kan även betyda *störst placeringsförbättring* i sista segment; detta är ett **annat** mått och måste märkas `Största placeringslyft på avslutningen` – inte förväxlas med snabbaste segmenttid.
- `Flest lopp`, `Mest förbättrad`, `Jämnast` och `Hall of Fame` bygger på verifierad identitet och jämförbara banor där prestationsmått korsar editions.

**E. `gender-classes` och `clubs`**
- Män/kvinna visas med **konsekvent blå/rosa**, men dolda könsdata visas inte som uppskattade.
- Klasseffekter får inte slå ihop klasser med olika regler utan explicit mapping.
- Klubb- och ortnamn normaliseras bara med dokumenterade alias; `Borås LK` får inte automatiskt bli `Borås Löparklubb` utan verifiering.
- Köns-/klubbfiltren ska inte ändra den översta faktaraden; egna kort visar sitt lokala aktiva urval.

**F. `edition-history` och `person-history`**
- Historisk volym (starter, finisher, DNF) kan visas över banändringar med tydlig markering. Historiska **prestationstider** jämförs inte som like-for-like utan dokumenterad jämförbarhet.
- År som saknas i källan visas som `saknar import`, inställt år `inställt`, ännu ej genomfört `planerat`; aldrig 0 deltagare som om loppet genomfördes.
- En och samma person över år bara när canonical `person_key` uttryckligen verifierats. Manuell merge är adminåtgärd med spårbarhet, inte frontendfunktion för anonyma besökare.

### 12.4 Block 10a – bana, karta, banhistorik
- `Banöversikt`: kartlinje, start/mål, verkliga checkpoints, distans (annonserad och GPX vid behov separat), D+/D− från jämförbar höjdmetod, ytvärden per segment.
- `Interaktiv höjdprofil`: karta ovan, höjdprofil under, lutningsfärg grön→röd, klick på segment ↔ tabell/karta. `Start` först. Axlar: km och meter, minst 4 relevanta skalstreck.
- `Banversioner`: tydliga årsetiketter, exakt/verified shared/reference only/provisional; olika års rutter i separata linjer. En referensrutt utger sig aldrig för att vara exakt tävlingsspår.
- `GPS och källor`: källa, datum, tillåtelse, SHA-256, person-/arrangörsspår, höjdmetod, osäkerhetsnivå. Länka bara publikt godkända resurser.
- `Loppets historia`: deltagande/finish över år och valbara verifierade prestationsjämförelser, nedanför personliga block.

### 12.5 Block 10b – resultatdatabas
- Sök, filter, sortering och pagination av *publicerade, anonymiserade* resultat. Kolumner `Plac`, `Namn/lag`, `År`, `Klass`, `Kön` (om känt), `Klubb`, `Sluttid`, `Status`, `Visa analys`, `Lägg till jämförelse`.
- **10 rader som default** i standardtabell, konfigurerbara 10/25/50. Sidnumrering, totalt antal, `Föregående/Nästa`, återställ sortering; stabil andra sorteringsnyckel `resultId`.
- Resultatdatabasen ligger nära botten eftersom löparsökningen redan finns högt upp. `Öppna analys` fungerar fortfarande med direkt profilmodal och behåller position/scroll/fokus efter stängning.
- Visa fulla tider bara när publicering tillåts. Anonymiserad deltagare får etiketten `Löparen har valt att vara anonym` (eventuellt anpassad case), **inte ursprungligt namn i dataattribut, title, URL eller delningsmetadata**.
- Mobile: radkort eller vältestad `overflow-x:auto` på tabellen enbart med synlig hint; aldrig på sida/modal som helhet.

### 12.6 Block 10c – data, metod, kvalitet och sidfot
- `Så fungerar analysen` allra sist: källor per RaceEdition, metoder för resultatimport, status, sortering, median, medel, kvantiler, rekonstruktion, banversioner, underlag, personkoppling, anonymisering, datatäckning.
- `Datatäckning`: vad som är tillgängligt per år/distans (resultat, kön, klubbar, splits, GPS, höjd, replay, jämförelse). Visa en begriplig coverage-matris som kan expanderas.
- `Definitioner`: FINISHED, DNF, DNS, DSQ, UNKNOWN, median, percentil, relativ fart, observerad passage, rekonstruktion, annan upplaga, jämförbar CourseVersion.
- `Datakvalitet`: visa eventuella source-known limitations, antal observationer och dokumenterad osäkerhet. Meddela att data kan rättas när arrangören ändrar publicerade resultat.
- `Integritet`: saklig information om hantering av publicerade resultat och kontaktväg för rättelser/anonymisering. Publikt datalager och rådata ska separeras.
- Sidfot med `Loppanalys.se`, källhänvisningar, ansvarstext, integritet och senaste publiceringsdatum om känt. Sociala länkar endast om konfigurerade.

## 13. Katalog över informationsknappar – FÄRDIG svensk hjälptext

**Implementationskrav (M):** varje hjälp-ID nedan ska vara en namngiven post i en central hjälpkatalog, t.ex. `help/sv.json`, och kunna öppnas från tangentbord, touch eller mus. Hjälpen ska visas i en riktig `dialog`/popover med rubrik, `Stäng`, fokusfälla och tillbaka-fokus. Länka `data-help-id` i varje komponent. **Hjälptexter här är miniminivå och färdig copy**, inte bara exempel eller påminnelser. Platshållare inom `[hakparentes]` ersätts med **verklig** edition/källa/n/banversion i UI. Om sådan data saknas används neutral text `för vald upplaga` i stället för tom placeholder. Varje analytisk hjälp ska täcka: *vad*, *källa/urval*, *exakt formel/metod*, *hur tolka*, *begränsningar*.

### 13.1 Global hjälp

**`help-filters` – Filter och urval**  
**Vad visas?** Filter avgränsar vilka publicerade deltagarresultat som ingår i analyserna längre ned. **Underlag:** vald distans/upplaga och officiella resultat; kön, klass, klubb/ort och status används bara när respektive källa har fältet. **Metod:** flera aktiva filter kombineras med OCH, och statistik beräknas om på det filtrerade urvalet. **Tolkning:** en filterstyrd median beskriver bara urvalet, inte hela loppet. **Begränsning:** översta `Loppet i siffror` visar alltid hela den valda upplagans officiella totaler; individuell profil och fasta referenskohorter förändras inte av filtren. Okänt kön eller ålder gissas aldrig.

**`help-data-status` – Officiellt, härlett och rekonstruerat**  
**Vad visas?** Officiella resultat, kontroller och placeringar kan ligga till grund för vidare uträkningar. **Underlag:** publicerade resultattider, godkända banor och dokumenterad metodik. **Metod:** segmenttid är differensen mellan två verkliga passager; median är en beräkning; replayposition mellan passager är en interpolerad visning längs tillåten bana. **Tolkning:** samma graf kan innehålla verkliga ankare och illustrativa positioner, markerade var för sig. **Begränsning:** vi kan inte veta exakt var en löpare befann sig eller passerade en annan mellan tidtagningarna.

### 13.2 Block 2 – informationsknappar för samtliga fem faktakort

**`help-starters` – Startande**  
**Vad visas?** Antal deltagare eller lag som enligt resultatkällans statusuppgifter påbörjade vald tävling. **Källa/urval:** samtliga publika resultat för vald distans och upplaga, oberoende av analysfiltren. **Metod:** FINISHED, DNF, DSQ och andra uttryckligen verifierade startstatusar räknas som startande; DNS och UNKNOWN räknas inte. **Tolkning:** talet anger tävlingsstarter, inte nödvändigtvis alla som var anmälda. **Begränsning:** om arrangören inte skiljer startande från anmälda visar vi `Ej fastställt` och hittar inte på ett antal.

**`help-finishers` – Fullföljde**  
**Vad visas?** Antal resultat med verifierad målgång samt andelen av verifierat startande. **Källa/urval:** officiella resultat i vald RaceEdition, inte det nedanför filtrerade fältet. **Metod:** räkna FINISHED med positiv officiell sluttid; fullföljandegrad = `100 × antal fullföljande / antal startande`, avrundat till en decimal. **Tolkning:** 81,6 % innebär att cirka 82 av 100 verifierade startande fullföljde. **Begränsning:** DSQ och UNKNOWN ingår inte som fullföljande. Saknas tillförlitlig startnämnare visas ingen procentsats.

**`help-dnf` – DNF**  
**Vad visas?** Antal som enligt officiell källa startade men inte fullföljde (`DNF`). **Källa/urval:** publicerad status för vald distans och upplaga. **Metod:** räkna bara explicit DNF; DNF-andel = `100 × DNF / startande`. **Tolkning:** avhoppen ska sättas i relation till startande, inte enbart anmälda. **Begränsning:** DNS (kom aldrig till start), DSQ (diskvalificerad) och UNKNOWN ingår inte i DNF. Antalet anger inte var eller varför någon bröt.

**`help-times-sex` – Tider för kvinnor och män**  
**Vad visas?** Tidsnivåer för kvinnor och män i **ett gemensamt kort**. **Källa/urval:** officiella positiva sluttider för FINISHED i vald upplaga med publicerad könsgrupp. **Metod:** median = mittersta sluttiden sorterad i stigande ordning; medeltid = alla sluttiders summa delat med antalet, för respektive grupp. Båda visas separat och med namn – de får inte blandas ihop. **Tolkning:** median är oftast mer robust mot enstaka mycket långa sluttider; medeltid påverkas av alla tider. **Begränsning:** grupper med färre än fem giltiga tider får `Otillräckligt underlag`; saknat kön exkluderas bara från könskorten, inte från totalresultatet. Vid lag används källans verifierade lagklasser i stället.

**`help-fastest` – Snabbaste tid**  
**Vad visas?** Lägsta publicerade positiva sluttid bland alla FINISHED i vald upplaga. **Källa/urval:** officiella slutresultat, oberoende av sekundära fältfilter. **Metod:** minsta `finish_seconds` och motsvarande tävlingsresultat; vid exakt lika tider märks delad snabbaste tid. **Tolkning:** detta är en sluttid, inte en automatiskt säker banrekordnotering över andra år. **Begränsning:** olika års banor kan skilja sig; banrekord får bara anges när regler och banjämförbarhet har verifierats. Anonymiserade löpare visas med anonym etikett.

### 13.3 Block 3 – sökning och val

**`help-search` – Hitta din löpare**  
**Vad visas?** Officiella resultat som matchar sökord för namn, startnummer och publicerad klubb. **Källa/urval:** vald upplaga, alternativt alla publicerade år om `Alla år` har valts. **Metod:** textmatchning söker resultatposter; samma namn över år är inte bevis för samma person. **Tolkning:** klicka på `Öppna analys` för att se resultatet i detalj. **Begränsning:** vissa personer saknar klubbtillhörighet eller visas anonymt, och det finns ingen garanterad personmatchning över upplagor.

**`help-comparison-selection` – Lägg till jämförelse**  
**Vad visas?** Dina valda publicerade resultat för Direktjämförelse och Kartduell. **Källa/urval:** unika result-ID:n och deras år/upplagor. **Metod:** knappen `Lägg till jämförelse` väljer resultatet; samma knapp blir `Ta bort från jämförelse`. Direktjämförelse kräver exakt två; Kartduell två till fem. **Tolkning:** chipen visar endast namn och år så att du kan kontrollera vilka resultat som valts. **Begränsning:** saknade mellanpassager eller bana kan begränsa kart-/segmentanalys trots att resultatet har valts; valet får ändå kunna behållas där det är meningsfullt.

**`help-favorites` – Sparade löpare**  
**Vad visas?** Resultat du valt att spara på denna enhet. **Källa/urval:** enbart publicerade result-ID:n, lagrade lokalt i webbläsaren för det aktuella loppet. **Metod:** `Spara` lägger till referensen och `Ta bort favorit` tar bort den. **Tolkning:** detta är ett bokmärke till ett specifikt resultat, inte en permanent konto- eller personkoppling. **Begränsning:** listan kan försvinna om webbläsarens lagring rensas och synkroniseras inte mellan enheter.

### 13.4 Block 4 – individuell analys

**`help-runner-summary` – Loppet i korthet**  
**Vad visas?** Sluttid/status, officiell placering, klass, täckning och källdokumenterade prestationsmått för exakt ett publicerat resultat. **Källa/urval:** valt resultat och, för relativa mått, uttryckligen definierat referensfält inom samma upplaga. **Metod:** officiella siffror hämtas direkt; segment/relativa mått beräknas enbart ur verkliga passager. **Tolkning:** värden märkta `Beräknat` är inte originalfält från arrangören. **Begränsning:** DNF/DNS och resultat med saknade mellantider får en begränsad profil utan uppfunna tidsdata.

**`help-runner-relative` – Fart per delsträcka i förhållande till hela loppet**  
**Vad visas?** Hur snabb varje delsträcka var relativt individens egen verifierade genomsnittshastighet över hela loppet. **Källa/urval:** individens officiella segmenttider och tillförlitliga ban-/segmentdistanser. **Metod:** relativ fart = `100 × (segmenthastighet / hel-loppshastighet)`; streckad **100 %-linje** = individens eget snitt. **Tolkning:** över 100 % betyder snabbare än eget helsnitt, under 100 % långsammare. `Start` är en första referenspunkt, inte ett påhittat segment. **Begränsning:** saknade eller osäkra distanser spärrar fysikaliskt pace; tempo kan påverkas av terräng och höjd.

**`help-runner-segment-time` – Tidsåtgång per delsträcka**  
**Vad visas?** Verklig tidsåtgång mellan två efterföljande analyserbara kontroller. **Källa/urval:** individens positiva ackumulerade tid vid båda verkliga ändpunkter. **Metod:** segmenttid = `slutpassagens tid − startpassagens tid`; `Start` visas med tid noll som referens. **Tolkning:** staplarna visar var tiden användes, men längre segment ger ofta högre värden även vid jämn fart. **Begränsning:** saknas en av gränspassagerna kan tidsåtgången inte beräknas; tiden fylls inte i.

**`help-runner-placement` – Officiell placeringsresa**  
**Vad visas?** Hur den officiella placeringen förändrades vid kontroller där placering publicerats. **Källa/urval:** resultatets officiella total- eller klassplacering, tydligt vald och namngiven i grafen. **Metod:** punkterna visas i banordning och Y-axeln vänds så plats 1 är högst. **Tolkning:** en rörelse från plats 80 till 50 visar bättre registrerad position vid nästa kontroll. **Begränsning:** linjen mellan punkter beskriver inte exakt omkörningsplats eller tid; saknade placeringar interpoleras inte.

**`help-runner-gap` – Tidslucka mot fältet**  
**Vad visas?** Hur valt resultat förhåller sig tidsmässigt till ett angivet stabilt referensfält eller en källstödd klass. **Källa/urval:** samma kompletta FINISHED-kohort över samtliga visade checkpoints i den aktuella jämförbara upplagan. **Metod:** skillnad mellan löparens verkliga passage och referensens medianpassage vid varje kontroll; tecknets betydelse skrivs ut. **Tolkning:** negativ egen tidsavvikelse betyder att löparen var snabbare än medianens ackumulerade tid. **Begränsning:** referensfält och jämförelsebara checkpoints måste vara samma genom serien; felande passager ger inga punkter.

**`help-runner-pacing` – Pacingprofil och styrkor**  
**Vad visas?** Relative segmentprestationer mot samma definierade referensfält, uppdelat efter banans verkliga kontrollsegment. **Källa/urval:** verkliga tider samt tillåtna segmentdistanser. **Metod:** beräkna segmenthastighet eller segmenttidsandel och jämför med referensmedianen; håll kohorten stabil. **Tolkning:** en positiv relativ fart anger en snabbare prestation på den delsträckan än referensen. **Begränsning:** analysen visar mönster, inte varför de uppstått, och kräver säkra segmentmått.

**`help-runner-splits` – Mellantider och analysgränser**  
**Vad visas?** Publicerade tidtagningar och härledda intervaller i rätt banordning. **Källa/urval:** officiella passageposter knutna till exakt detta resultat och denna RaceEdition. **Metod:** ackumulerad tid publiceras som källa, segmenttid beräknas som skillnad mellan två verkliga observationer. Starttid 0 anges uttryckligen som modellstart. **Tolkning:** tabellen visar vad som faktiskt är känt. **Begränsning:** speaker-/servicepunkter är inte automatiskt officiella analysgränser; ingen saknad passage gissas.

**`help-runner-replay` – Personlig replay**  
**Vad visas?** En illustration av resultatets väg längs den versionerade banan med verkliga passager som ankare. **Källa/urval:** verkliga tidtagningar och en lagligt tillgänglig rutt för vald upplaga. **Metod:** position mellan kontrollerna interpoleras längs banan med segmentets observerade förflutna tid; höjden följer banans referensprofil. **Tolkning:** passagerna är observationer, markörens mellanposition är rekonstruktion. **Begränsning:** detta är inte individens GPS-registrering eller exakt omkörningsdata; DNF stannar vid sista verkliga hållpunkt.

### 13.5 Block 5–6 – jämförelse, gap, kartduell

**`help-head-to-head` – Direktjämförelse 2.0**  
**Vad visas?** Två officiella resultat jämförs avseende sluttid, gemensamma kontroller, segment och – när möjligt – karta och höjdprofil. **Källa/urval:** två specifika result-ID:n samt deras respektive editioner. **Metod:** varje mått har egen jämförbarhetskontroll; tidslucka = B:s tid minus A:s vid samma verifierbara passage. **Tolkning:** positiv lucka betyder A före, vilket också skrivs ut i klartext. **Begränsning:** resultat från olika år/bangenerationer kan inte jämföras absolut utan dokumenterad jämförbarhet, och saknade tidsankare skapar inga analytiska värden.

**`help-head-to-head-segments` – Segmentduellen**  
**Vad visas?** Vilken av två valda personer/lag som var snabbast mellan samma två tillåtna analyspassager. **Källa/urval:** verkliga tidsobservationer för båda vid både segmentets start och slut. **Metod:** `segmenttid = tid_slut − tid_start`; `skillnad = B_segment − A_segment`. **Tolkning:** positiv skillnad innebär att A vann tid, negativ att B vann tid. **Begränsning:** över olika upplagor krävs explicit segmentekvivalens; saknas en ändpunkt lämnas segmentet utan vinnare.

**`help-head-to-head-field` – Segmentfart mot respektive års fält**  
**Vad visas?** Varje jämförd deltagare ställs mot fältmedianen för **sin egen** upplaga på varje verkligt jämförbart segment. **Källa/urval:** komplett FINISHED-kohort med `n>=5` giltiga segmentobservationer i respektive RaceEdition. **Metod:** `100 × (fältmedianpace / deltagarpace − 1)`. **Tolkning:** 0 % = editionsfältets median, positiva värden = snabbare. **Begränsning:** en positiv siffra mellan olika år säger inte att banor, väder eller motstånd var identiska; absolut sluttidsjämförelse är en separat regel.

**`help-map-duel` – Kartduell**  
**Vad visas?** Två till fem valda resultat med gemensam uppspelningsklocka på en eller flera verifierade banlinjer. **Källa/urval:** valda källresultat och upplagornas tillåtna rutter. **Metod:** markörposition beräknas för samma tid sedan respektive start utifrån verkliga tidankare. **Tolkning:** uppspelningen visar ett begripligt möjligt loppförlopp, inte en film av uppmätt GPS-data. **Begränsning:** mellan passager är positionerna uppskattningar. Olika års banor ska visas separat och kan sakna grund för direkt tidsjämförelse.

**`help-map-geometry` – Banversioner och kartjämförelse**  
**Vad visas?** Den kartreferens som är verifierad för varje vald upplaga. **Källa/urval:** officiell GPX, godkänd deltagargeometri eller rekonstruerad och tydligt märkt referensrutt. **Metod:** varje linje är knuten till ett versions-ID med proveniens och jämförbarhetsregler. **Tolkning:** när olika års banor har olika färger visar det geografiska skillnader i rutt. **Begränsning:** en snyggt överlappande linje är inte bevis för samma exakta tävlingsbana eller automatiskt rätt att publicera privata spår.

**`help-replay-controls` – Klocka, kamera och musik**  
**Vad visas?** Reglage för rekonstruktionens hastighet, visning och eventuellt ljud. **Källa/urval:** klockan följer vald rekonstruktion; kameran påverkar bara kartvyn. **Metod:** hel uppspelning standard 120 sekunder, val 30/60/120/180; default kamera `Följ båda`; ljud aktiveras av besökaren, standardvolym 30 %. **Tolkning:** kortare uppspelningstid är snabbare animation, inte högre löpfart i officiella data. **Begränsning:** reducerad rörelse eller blockerad uppspelning kan begränsa animation/ljud utan att påverka analysen.

### 13.6 Block 7 – loppplan

**`help-race-plan` – Personlig loppplan**  
**Vad visas?** Ett scenario för hur en vald måltid kan fördelas mellan officiella analyspassager. **Källa/urval:** verkliga kompletta FINISHED-resultat från rätt banversion, alternativt tydligt märkt distansbaserat exempel. **Metod:** varje komplett resultats segmenttid delas med sin sluttid, medianandel beräknas per segment och normaliseras till 100 %; måltiden multipliceras med andelarna och passagetiderna summeras. **Tolkning:** detta ger en historiskt grundad disponering av loppet, inte ett löfte att hålla tiden. **Begränsning:** saknade verkliga splits, annan bana, individuella stopp och väder kan göra planen mindre tillämplig. Default måltid är loppets mediansluttid, aldrig en fast godtycklig tid.

**`help-race-plan-pace` – Beräknat tempo och kontrollpassager**  
**Vad visas?** Planerad segmenttid, beräknad medelfart och ackumulerad tid till varje kontroll. **Källa/urval:** personlig loppplan och verifierad segmentdistans, om den finns. **Metod:** `pace = planerade sekunder / verifierad segmentdistans`; kontrolltid är summan av segmenttider till kontrollen. **Tolkning:** värden är beräknade måltider, inte faktiska eller officiellt uppmätta passager. **Begränsning:** där tillförlitlig distans saknas visar vi bara tidsplanen; ett rått timing-kilometervärde ersätter inte fysisk distans.

### 13.7 Block 8 – tid, percentiler och mål

**`help-finish-distribution` – När gick fältet i mål?**  
**Vad visas?** Hur många deltagare/lag som fullföljde inom olika sluttidsintervall. **Källa/urval:** publicerade giltiga FINISHED-tider i valt filtrerat analysurval. **Metod:** tider grupperas i jämnbreda intervall (normalt 15 min) och räknas; median/P10/P90 kan markeras. **Tolkning:** högre stapel betyder fler i det intervallet, inte fler vid en exakt sekund. **Begränsning:** intervallstorleken påverkar histogrammets form; DNS och DNF har ingen målgångstid och inkluderas inte.

**`help-percentiles` – Fältets trösklar och percentiler**  
**Vad visas?** Sluttider vid percentiler P10, P25, P50, P75 och P90. **Källa/urval:** giltiga officiella måltider för FINISHED i aktuellt urval. **Metod:** sortera tider stigande, välj percentil via deklarerad linjär interpolation mellan ordnade observationer; P50 är median. **Tolkning:** P10 är en snabb tidsgräns som cirka 10 % klarar eller underskrider, P90 en långsammare som cirka 90 % klarar. **Begränsning:** små fält ger osäkra jämförelser och könsuppdelning kräver publicerade könsdata; måtten är beskrivande, inte en prognos.

**`help-time-to-place` – Vad räcker en sluttid till?**  
**Vad visas?** Retrospektivt var en inmatad sluttid hamnar bland tidigare publicerade fullföljare. **Källa/urval:** valt loppår/distanstyp och aktiva filter enligt synlig urvalsetikett. **Metod:** räkna antalet FINISHED med `finish_seconds <= mål`; beräkna andelen och ungefärlig placering genom den sorterade målresultatlistan. **Tolkning:** en vald framtida tid visar var den skulle ha hamnat i det historiska startfältet. **Begränsning:** detta är inte en officiell framtida placering, och banor/fält/väder kan skilja sig.

### 13.8 Block 9 – status, placering, delsträckor och DNF

**`help-time-vs-place` – Tid mot placering**  
**Vad visas?** Sambandet mellan offentlig sluttid och totalplacering för fullföljare. **Källa/urval:** FINISHED med både publicerad sluttid och officiell placering i aktuellt urval. **Metod:** varje punkt ligger på X = sluttid och Y = officiell rankning, med plats 1 högst; ingen ny rankning genereras efter filter. **Tolkning:** täta punkter kan betyda att små tidsskillnader gav många placeringssteg. **Begränsning:** detta är slutresultat, inte placering under loppet; vissa lagklasser kan sakna officiell tävlingsrankning.

**`help-status-breakdown` – Status och fullföljande**  
**Vad visas?** Fördelning av officiella resultatstatusar i valt urval. **Källa/urval:** arrangörens dokumenterade statusfält, normaliserat till FINISHED/DNF/DNS/DSQ/UNKNOWN. **Metod:** varje resultat räknas en gång i exakt en status; startande räknas separat och exkluderar DNS/UNKNOWN. **Tolkning:** DNS innebär inte start och DNF innebär bruten tävling efter start. **Begränsning:** `UNKNOWN` förblir okänt och får inte uppgraderas för att komplettera statistik.

**`help-dnf-flow` – Avhopp genom loppet**  
**Vad visas?** Antal DNF och, om verkliga DNF-passager är tillgängliga, den senaste **observerade** kontrollen för respektive DNF. **Källa/urval:** källstatus DNF samt publicerade passager. **Metod:** grupperas efter sista verifierade analytiska kontroll; okänd passagedata ger en separat okänd-grupp eller endast total DNF. **Tolkning:** sista observation visar var resultatet senast registrerades, inte exakt var löparen bröt. **Begränsning:** ofullständig splitdata kan inte användas för att påstå en avhoppsplats, och en okänd passage får aldrig skapas.

**`help-segment-character` – Delsträckornas karaktär**  
**Vad visas?** Typisk tidsåtgång/fart och spridning på verkliga segment. **Källa/urval:** fullföljande med godkända riktiga segmentpassager; visat `n` per segment eller stabilt komplett urval enligt grafens kohortetikett. **Metod:** segmenttid = passage differens; vid verifierad distans pace = segmenttid/delsträckans km; median och kvartilintervall enligt deklarerad kvantilmetod. **Tolkning:** långsammare pace kan sammanfalla med backar eller banans egenskaper, men bevisar inte orsaken. **Begränsning:** saknad fysisk km spärrar pace, få observationer spärrar kvantilband.

**`help-segment-lab` – Delsträckelabbet**  
**Vad visas?** Verkliga tider och prestationer mellan två valda analyspassager. **Källa/urval:** resultat som har officiell giltig tid vid båda valda ändpunkterna. **Metod:** räkna tidsdifferens; ranka på tidsåtgång, på verifierad pace eller på officiell placeringsförändring beroende på vald vy. **Tolkning:** `Snabbast` avser vald delsträcka, inte automatiskt loppets slutvinnare. **Begränsning:** delsträckor får inte uppstå genom att saknade mellantider uppskattas och banversionen måste vara tydlig.

**`help-placement-gains` – Största avancemang**  
**Vad visas?** Resultat med störst förbättring mellan två officiellt rankade passager. **Källa/urval:** publicerad totalplacering/klassplacering med samma betydelse vid båda valda punkter. **Metod:** `första placering − sista placering` (positivt = förbättrad). **Tolkning:** en förbättring från 80 till 50 är 30 placeringssteg. **Begränsning:** detta är inte antalet fysiska omkörningar och kan inte säga exakt var förändringen skedde.

**`help-strongest-finish` – Spurten mot mål**  
**Vad visas?** Snabbaste verkligt uppmätta segmenttid från den sista officiella analytiska kontrollen före mål till den officiella målgången. **Källa/urval:** FINISHED med giltig tid vid båda ändpunkter. **Metod:** `målpassage − sista officiella kontrollpassage`; ranka lägst positiv tid först inom valt kön/klass. **Tolkning:** vinnaren är snabbast just på avslutningssegmentet, inte nödvändigtvis loppvinnaren. **Begränsning:** jämförelse över olika banversioner är spärrad utan segmentjämförbarhet; ett speakerankare blir inte automatiskt analyskontroll.

### 13.9 Block 9 – kön, klass, ålder, klubb och spridning

**`help-gender-class` – Klasser och kön**  
**Vad visas?** Publicerat deltagande, fullföljande, medianmål och segmentmönster per kön eller klass. **Källa/urval:** resultatuppgifternas explicita köns- och klassfält. **Metod:** samma start-, finish- och medianregler som i övergripande KPI, men tillämpade på en angiven grupp med n-tröskel. **Tolkning:** jämförelser beskriver gruppernas resultat i denna upplaga. **Begränsning:** okänt kön redovisas som saknat; lagklass får inte härledas från lagmedlemmars kön.

**`help-age` – Ålder och åldersklasser**  
**Vad visas?** Deltagarfördelning och prestation per ålder eller källans åldersklass. **Källa/urval:** endast verklig publicerad exakt ålder respektive officiell klassbeteckning. **Metod:** kategorier räknas separat; 5-årsintervall används enbart när exakt ålder finns. **Tolkning:** siffror avser deltagare med känd uppgift och coverage ska anges. **Begränsning:** exakt ålder får inte gissas från `M45–49`, och okänd ålder får inte ersättas av klassens mittpunkt.

**`help-clubs` – Klubbar och orter**  
**Vad visas?** Hur publicerade klubbar/orter är representerade samt deras sluttider, fullföljande och eventuellt segmentfart. **Källa/urval:** källans klubb- och ortfält; verifierade alias kan slås ihop enligt dokumenterad mapping. **Metod:** resultat grupperas per canonical klubb/ort; startande, FINISHED, median och andelar räknas enligt samma regler som övriga grupper. **Tolkning:** jämförelsen visar representation och utfall, inte en rangordning av klubbars kvalitet. **Begränsning:** blandade namn, saknad klubb och olika stora grupper kan ge skev bild; redovisa `n` och täckning.

**`help-field-spread` – Fältets spridning genom loppet**  
**Vad visas?** Median och fördelningsband för fart eller segmenttider i banordning. **Källa/urval:** samma kompletta FINISHED-kohort över alla segment i serien, enligt vald edition/grupp. **Metod:** median vid `n>=5`, Q25–Q75 vid `n>=10`, Q10–Q90 vid `n>=20`. **Tolkning:** bredare band betyder större skillnad mellan typiska snabbare och långsammare resultat. **Begränsning:** banden är inte statistiska konfidensintervall eller orsaksmått, och endast verkliga segment ingår.

**`help-pacing-retention` – Fart relativt eget snitt**  
**Vad visas?** Hur varje grupps verifierade segmenthastighet utvecklas jämfört med dess egen hel-loppshastighet. **Källa/urval:** en komplett, stabil FINISHED-kohort per grupp genom hela banan. **Metod:** `100 × segmenthastighet / hel-loppshastighet`; **100 %** är referenslinje. **Tolkning:** värden över 100 % innebär snabbare segment än gruppens helsnitt. **Begränsning:** olika grupplängder och terräng påverkar tolkningen; inga gruppmedel bygger på uppskattad fysisk fart.

### 13.10 Block 9–10 – resultat som sticker ut och pallplatser

**`help-podium` – Pallplatserna**  
**Vad visas?** Publicerade pallresultat och snabbaste officiella sluttider inom tävlingsklass eller hela fältet. **Källa/urval:** verifierad officiell ranking samt FINISHED med giltig sluttid. **Metod:** använd publicerad rang i första hand; sortera inte unrankade klasser till en påhittad tävlingspall. **Tolkning:** pallplatser gäller angiven klass/år/distans. **Begränsning:** samma tid kan delas, separata klasser får egna pallar, och personer med önskad anonymitet exponeras inte.

**`help-standouts` – Prestationer som sticker ut**  
**Vad visas?** Dokumenterbara prestationer som flera fullföljda lopp, jämn fart, förbättring, segmentframgång eller slutspurt. **Källa/urval:** officiella resultat, verifierad personidentitet där flera år korsas och uttryckliga jämförbarhetsregler för prestationer. **Metod:** varje tabb anger separat metric, beräkningsregel och kohort; inget blandat ospecificerat "poängindex". **Tolkning:** placeringen i en sådan lista är en statistisk särskiljning, inte automatiskt arrangörens tävlingsranking. **Begränsning:** banändringar, saknade splits och osäker identitet kan förhindra ett delmått.

### 13.11 Block 10 – banan, historik och resultatlista

**`help-course` – Bana och höjdprofil**  
**Vad visas?** Loppets godkända geografiska rutt med kontroller och referenshöjd. **Källa/urval:** editionens versionerade banunderlag, med tydlig märkning om GPX kommer från arrangör, deltagare eller rekonstruktion. **Metod:** GPS-geometri ger distans och kontrollpositioner; höjddata normaliseras från angiven källa enligt samma metod inom jämförbara versioner. **Tolkning:** en markerad uppförsbacke kommer från den kartbaserade höjdprofilen, inte en deltagares barometriska mätning. **Begränsning:** höjd kan variera mellan datakällor; teknisk stigsvårighet får inte påstås från lutning ensam.

**`help-course-versions` – Banversioner mellan år**  
**Vad visas?** Kända och jämförbara banor för olika upplagor. **Källa/urval:** verifierat `CourseVersion`-register med proveniens och immutable fingerprint. **Metod:** separata årskartor visas där de skiljer sig; route/elevation/display kan ha olika konfidensnivå. **Tolkning:** år med delad verifierad bana kan kopplas när evidens finns. **Begränsning:** liknande karta eller marknadsförd distans bevisar inte absolut prestationsjämförbarhet och ett referensspår är inte officiell årsbana.

**`help-edition-history` – Loppets utveckling genom åren**  
**Vad visas?** Historiskt antal startande/fullföljande/DNF, gruppernas storlek och där tillåtet jämförbar sluttidsutveckling. **Källa/urval:** separat verifierade RaceEditions från genomförda år. **Metod:** volymer kan följas över banförändringar; fart- och sluttidsserier kräver uttryckligt jämförbara banversioner. **Tolkning:** ett år utan import är `saknar data`, inte noll; inställt år är `inställt`. **Begränsning:** ändrad sträckning, klassregler och statusdefinition påverkar historiska prestationsserier.

**`help-person-history` – En löpare genom åren**  
**Vad visas?** Flera officiella resultat som genom verifierad personkoppling tillhör samma person. **Källa/urval:** godkänd canonical personnyckel och resultatrader från olika editions. **Metod:** identity mapping separat från resultatkällan; prestationsförändring visas bara på jämförbara banor. **Tolkning:** fler starter och bästa prestationer kan visas även när sluttidstrender är spärrade. **Begränsning:** samma namn eller födelseår ensamt räcker inte för att slå samman olika personer och lagidentiteter.

**`help-results` – Resultatdatabas**  
**Vad visas?** Resultatrader som får publiceras för vald distans/år, med filter, sortering och möjlighet att öppna analys. **Källa/urval:** sanerad officiell export, inte rå dump. **Metod:** sortering använder källvärden och stabil result-ID, och tabellen kan filtreras utan att källans officiella placering räknas om. **Tolkning:** en rad avser ett deltagande i en viss upplaga. **Begränsning:** saknad klass/kön/klubb visas som saknad, och anonymiserade personer förblir anonymiserade i vy, dataattribut och delningslänkar.

### 13.12 Block 10 – data, källkvalitet och integritet

**`help-method` – Metod och datakällor**  
**Vad visas?** Vilka officiella resultat, importer och banfiler som analysen bygger på samt hur värden beräknas. **Källa/urval:** editionens source binding, routeversion och data coverage. **Metod:** originaldata lagras separat från en normaliserad analysmodell och publicerad sanerad export; härledda mått görs reproducerbart. **Tolkning:** en tydlig källkedja gör siffrorna granskbara. **Begränsning:** källsajter kan förändras och oklara publicerade uppgifter lämnas okända snarare än gissas.

**`help-coverage` – Datatäckning och osäkerhet**  
**Vad visas?** Hur många resultat som har giltiga sluttider, kön, ålder, klubb, officiella kontroller, tillåten rutt och replaystöd. **Källa/urval:** validerad kuraterad databas och course readiness för aktuell edition. **Metod:** `täckning = tillgängliga godkända värden / relevanta publicerade resultat`, med deklarerad nämnare för varje fält. **Tolkning:** en analys med 60 % könstäckning beskriver inte nödvändigtvis hela startfältets könsfördelning. **Begränsning:** godkänd GPS-geometri innebär inte automatiskt att allas passagetider eller banans höjder är kända.

**`help-privacy` – Integritet och anonymisering**  
**Vad visas?** Hur publicerad personinformation används och hur den kan rättas eller skyddas. **Källa/urval:** officiella resultat i en offentligt sanerad version; personkoppling och anonymisering hanteras i separat administrativt register. **Metod:** en beslutad anonymisering tillämpas före varje webbexport, sökindex, delning och flerårsvisning; CI ska stoppa läckande ursprungsnamn i publicerade data. **Tolkning:** analysvärden kan finnas kvar när en persons visningsnamn ersätts av anonym beteckning. **Begränsning:** offentlig originalkälla kan fortfarande redovisa uppgiften utanför Loppanalys; webbplatsens integritetstext och juridiska rutiner måste vara korrekta.

## 14. Återanvändbar teknisk arkitektur

### 14.1 Princip: bygg blockbibliotek, inte ett femte specialbygge
**M:** Implementera standardkomponenter som frikopplade moduler med identiska data- och tillståndskontrakt. Eventspecifik frontendkärna är förbjuden när den kan uttryckas som config/capability. Produktidentitet får ligga i tema, hero, kopior, musik och specialregler.

Föreslagen (inte redan befintlig) målkatalog för ett nytt template-repo:

```text
loppanalys-template/
  README.md                      # starta nästa lopp
  AGENTS.md                      # läs detta standardkontrakt först
  spec/LOPPANALYS_STANDARD_V1_0.md
  config/event.example.json      # eventidentitet, UI, år/distans
  config/schema/event.schema.json
  config/source-bindings.json    # provider, event scope och tillstånd
  config/course-versions.json    # låsta banversioner/proveniens
  config/capabilities.json       # byggd av verklig data readiness
  src/core/                     # Engine 1.0 + adapters + beräkningar
  src/components/               # gemensam UI-design, diagram, dialog
  src/blocks/                   # 01 header ... 10 methodology
  src/replay/                   # Comparison 2.0 och Kartduell
  src/help/sv.json              # samtliga (i)-texter
  src/theme/                    # tokener + eventtema
  src/routes/                   # URL state, Back/Forward
  scripts/import/               # rådata -> kuraterad databas
  scripts/validate/             # käll-, data- och evidensgrindar
  public/data/                  # endast SANERAT publikt underlag
  tests/unit/                   # matematik + kontrakt
  tests/e2e/                    # riktiga användarflöden, Playwright
  tests/visual/                 # 1536/1200/900/768/390/360
  reports/                      # audit, readiness, QA, releasebeslut
  .github/workflows/            # build, test, privacy-check, deploy
```

Detta är en önskad implementation, inte ett krav att de fyra befintliga repona flyttas eller får identiska DOM/CSS. Återanvänd i första hand stabil Engine 1.0 och Comparison 2.0-semantik. Regressionssäker portning av redan existerande kod är bättre än en omskrivning för kodstilens skull.

### 14.2 Identifierare, entiteter och källor
- `Event` = lopp/arrangemang; `RaceFamily` = distans/disciplin; `RaceEdition` = en genomförd/planerad/inställd specifik familj ett bestämt år; `Competition` = tävlingsform; `CourseVersion` = immutable bana/checkpointkontrakt.
- `participant.entity`: `person` eller `team`; får inte härledas ur namn, könsklass eller distans.
- `ResultAppearance`: ett **specifikt resultat** i en specifik RaceEdition. `resultId` stabilt, namespacat, inte samma sak som `personKey`.
- `personKey`: separat verifierad identitetskoppling. Källans externa identifierare måste vara scopesatta till `(provider, source_event, raw_id)`.
- `SourceBinding`: explicit länk mellan RaceEdition och källprovider/källevent. Provider-specialkod isoleras i adapter; ingen routing på år eller prefix.
- `CourseVersion`: låst ID + SHA/fingerprint av geometri, kontroller, segment och relevanta ankare. Ändras geometrin, skapa nytt versions-ID; skriv aldrig tyst över en gammal publicerad version.
- `wholeCourseComparableWith`, `segmentComparableWith` och `sharedDisplayGeometryWith` är tre skilda beslut; ena följer inte automatiskt av andra.

### 14.3 Obligatoriska kanoniska datamodeller

**`Event` / `RaceEdition`:**
```ts
type RaceEdition = {
  eventId: string; raceFamilyId: string; editionId: string;
  year: number; eventDate?: string;
  dataStatus: 'available'|'planned'|'cancelled'|'unavailable';
  participantEntity: 'person'|'team'; competitionFormat: 'individual'|'relay'|'other';
  sourceBindingId?: string; courseVersionId?: string;
  advertisedDistanceKm?: number; verifiedRouteDistanceKm?: number;
  capabilities: Record<string,boolean>;
  provenance: { source: string; evidenceStatus: string; updatedAt: string };
}
```

**`ResultAppearance`:**
```ts
type ResultAppearance = {
  id: string; editionId: string; participantEntity: 'person'|'team';
  displayName: string; bib?: string; club?: string; place?: number;
  officialClass?: string; sex?: 'F'|'M'|'OTHER'|'UNKNOWN';
  status: 'FINISHED'|'DNF'|'DNS'|'DSQ'|'UNKNOWN';
  finishSeconds?: number; verifiedPersonKey?: string;
  isAnonymized: boolean; publishedFields: string[];
}
```

**`Observation`:**
```ts
type Observation = {
  resultId: string; checkpointId: string;
  elapsedSeconds: number; officialOverallPlace?: number;
  officialClassPlace?: number; sourceRef: string;
  evidence: 'published'|'verified_import';
  observationRole: 'analysis_boundary'|'timing_only'|'replay_anchor';
}
```

**`RouteEvidence`:**
```ts
type RouteEvidence = {
  courseVersionId: string; geometryAssetId?: string;
  evidenceLevel: 'exact_source_year'|'verified_shared_course'|'reference_only'|'provisional'|'unavailable';
  sourceType: 'organizer'|'participant'|'third_party'|'reconstruction';
  sourceUrl?: string; sha256?: string; redistributionApproved: boolean;
  elevationMethod?: string; routeDistanceKm?: number;
  displayEligible: boolean; analyticalPaceEligible: boolean;
}
```

**Obligatorisk datavalidering:** unika (provider, event, source ID), icke-negativa giltiga tidsvärden; inga splits före start/efter relevant officiellt mål; monotona ackumulerade passager där ordningen är verifierad; rimliga checkpoint-ID:n; `FINISHED` kräver positiv målregistrering; `DNS` har inte genomfört start; `UNKNOWN` bevaras; dubblettschema och confidence-profil; publicerade namn passeras genom integritetsfiltret före export.

### 14.4 Capability-kontrakt
Varje edition måste leverera en `readiness`-post för varje modul, med:
- `enabled: boolean` (beslut baserat på data + metod)
- `reason_code`: t.ex. `no_official_splits`, `insufficient_group_n`, `unverified_route`, `cross_edition_not_comparable`, `no_verified_sex`, `privacy_suppressed`, `no_license`.
- `coverage: { eligible: number, total: number }` där relevant.
- `evidenceLevel`: `official`, `derived`, `reconstructed`, `not_available`.
- `fallback`: `hide`, `message`, `simple_result`, `distance_based_plan`.

**Startregler:**
| Modul | Krav för att kunna aktiveras |
|---|---|
| Faktarad (antal) | publicerade resultatrader + verifierad status; vissa tal kan saknas |
| Köns-/klasstider | exakt gruppfält + `n>=5` FINISHED per grupp |
| Individuell sluttidsprofil | giltigt resultat och status |
| Segmentprofil | verkliga passager för båda ändpunkter |
| Fysisk pace | segmenttid + godkänd fysisk banlängd |
| Replay | tillåten versionerad rutttillgång + tidsankare som tillåter positionering |
| Direktjämförelse | exakt 2 resultat; delanalyser har separata readiness-flaggor |
| Kartduell | 2–5 resultat med kompatibel visningssemantik; fallback vid luckor |
| Loppplan historiskt viktad | samma bana + minst 5 kompletta FINISHED-resultat |
| Sluttidsfördelning | giltiga FINISHED-tider |
| DNF-plats | DNF-status + faktisk sista observerade passage; annars avstängt |
| Flerårig prestationsserie | explicita whole-course-jämförbarhetsgrupper |
| Personhistorik | manuellt eller annars tillförlitligt verifierad `personKey` |

**Inga heuristiska genvägar:** `distance===43` eller `year>=2024` får aldrig ensamt aktivera en feature. Gating härleds per RaceEdition och resultatnivå.

### 14.5 Importkedja och minsta nya-lopp-underlag
1. Registrera event/distanser/upplagor och officiella tävlingsdatum.
2. Identifiera källa och licens/publiceringsvillkor. Definiera `SourceBinding` per edition.
3. Lagra råa original **privat** med SHA-256 + käll-URL/tidpunkt och kontrollsumma.
4. Importera originalfält oförändrade (inklusive `raw_json`) till privat kuraterad databas.
5. Normalisera status, klasstillhörighet, startnummer, klubbar, passager och result-ID med källa per fält.
6. Registrera course-versioner och eventuella icke-officiella referensspår med explicit provenance.
7. Bygg och validera egen readiness-matris för varje edition, inklusive etapp- och teamsemantik.
8. Generera **sanerad, chunkad webbdata** och en bootstrapkatalog; hämta aktiva edition först, sedan historik/rutt/höjd/replay på begäran.
9. Utför full QA inklusive privacy-scan, antal/status och edge-case, innan publicering.
10. Publicera nytt lopp och lägg till det i Loppanalys-katalogen i separat, avsiktligt steg.

### 14.6 Resultatidentitet och anonymisering
- En person ska kunna begära integritetsåtgärd i publicerade system. Anonymiseringsregistret ska administreras separat från råresultat och tillämpas i **alla** utgående publika datalager – både aktuellt lopp och framtida nya lopp när verifierad personkoppling medger det.
- Identifiering för anonymisering över olika datakällor kräver säkert matchningsunderlag eller administrativ bekräftelse; ingen maskinell anonymisering av oskyldig namne bara för att samma namn förekommer.
- Originalresultat kan bevaras privat enligt dokumenterad policy om det är rättsligt befogat; publikt ska visningsnamn vara `Löparen har valt att vara anonym` eller motsvarande konsistent neutral etikett. Inga originalsträngar i HTML/JSON/JS, aria/title-attribut, index, loggfiler som publiceras, URL, Open Graph eller förslag.
- Manuell personmerge ska kräva uttryckliga source-scopade resultat-ID:n, auditlogg och konfliktkontroll; resultatens tider/status ändras inte.

## 15. Navigation, delning, SEO och tillgänglighet

### 15.1 URL-state och delning
- Varje sida stöder direktlänk för event, edition, resultatprofil, tvåresultatsjämförelse, Kartduell, plan och relevant kontroll/segment/tid.
- URL-parametrar måste valideras mot datakatalogen, motstå trasiga/äldre länkar och undvika att läcka anonymiserade namn/personmetadata. Exempel på neutralt tillstånd: `?race=<family>&year=<yyyy>&runner=<resultId>` och `?compare=<id1>,<id2>&t=<seconds>&camera=follow_both` – exakt syntax spikas i runtimekontrakt och versioneras.
- `pushState` för användarens navigationssteg; `replaceState` för högfrekvent reglageuppdatering. Back/Forward återställer modal/tillstånd utan att skapa oändlig historyloop.
- Delning ska använda `navigator.share` om tillgängligt, annars kopiering; vid misslyckande visa faktiskt kopierbar URL. Åtgärder får inte ljuga om att kopiering lyckats.

### 15.2 Metadata och media
- Per event: H1, title, description, canonical, `og:title`, `og:description`, `og:image` **1200×630** (eller högkvalitativ motsvarande crop), `twitter:card=summary_large_image`, `twitter:image`, konsekvent absolut URL; alt-text.
- Social bild anpassad till loppet och godkänd för användning, skarp huvudperson och rätt tävlingsnamn (t.ex. `Sätila Trail`, inte felaktiga variantnamn).
- Musikfil måste vara lokalt tillgänglig och licensierad för publicering; saknas musik ska ljudknapp vara disabled med förklarad orsak, inte tyst falsk funktion.

### 15.3 Tillgänglighet och tangentbord
- WCAG 2.2 AA som mål: semantiska rubriker, `skip to content`, formulärlabels, synligt fokus, `role/aria` för modal, aktivt tab-val, meningsfulla alttexter, inga färgberoende slutsatser.
- Jämförelsemodal stängs med Escape (om säkert), fokus återgår till öppnarknapp, fokus stannar i öppen modal; innehållet måste kunna nås med tangentbord.
- Diagram som saknar skärmläsarsemantik ska ha parallell data-/texttabell och förklarad interaktion.
- `prefers-reduced-motion` ger manuellt navigerbar replay och stilla kamera. All ljudstart kräver handling.
- Uppdateringar (`Valda 2/2`, `Rensat urval`, `Plan klar`, `Det finns 8 träffar`) med `aria-live="polite"` utan onödig pratighet.

## 16. Prestanda, säkerhet, drift och versionsregler

### 16.1 Prestationsbudget vid första renderingen
- Ladda **bootstrap + en vald RaceEdition**, inte all historisk rådata. Historik, rutter, höjd, detaljer och replay laddas först när de behövs.
- Målbudget baserad på ÖST:s beprövade profil: `bootstrap gzip <= 10 KiB`, aktiv RaceEdition bundle `<= 75 KiB`, de båda tillsammans `<= 100 KiB`; exception får höja värde endast med dokumenterad före/efter-mätning.
- Initial critical JS gzip riktvärde `<= 256 KiB`, CSS `<= 75 KiB`, HTML `<= 32 KiB` där det är praktiskt; bilder/karttiles och lazy-data mäts separat. Dessa är projektmål, inte uppmätta värden för varje befintlig produkt.
- Stora listor virtuell/paginerad, grafer återanvänd DOM/SVG, kartanimation utan tile-lagerflimmer, klickrespons utan onödiga fullständiga omrenderingar.
- Testa 3G-liknande slow network med graceful loading; ingen blank sida om ett historik- eller map-request misslyckas.

### 16.2 Säkerhet, rättigheter, data
- Ingen API-nyckel, rå persondump, GPS-original med otillåten redistribution eller administrativt identitetsregister i publika filer.
- Använd kontextsäker HTML-escaping och kontrollera XSS i namn, klubb, ort och källtext; säkra URL-scheman.
- `rel="noopener noreferrer"` på externa länkar vid nytt fönster.
- Analysekvationer skall köras på sanerad kontraktsdata, aldrig eval av inkommande källfält.
- Statisk GitHub Pages deploy från godkänd `main` efter gröna exact-head kontroller; portalens repo separat.

### 16.3 Versionering och migrering
- Versionera standardpaketet med SemVer `MAJOR.MINOR.PATCH`; ny eventimplementation låser `template_version` och `comparison_contract_version`.
- Breaking ändring av data-/eventkontrakt kräver migration samt golden-master-test. Ändring av CourseVersion-geometri kräver nytt immutable ID.
- Migrera befintliga fyra verktyg **bara när särskilt uppdrag ges**. En framtida `v1.1` i mallen ska inte tyst ändra dem.

## 17. Testplan – körbara acceptanskriterier

### 17.1 Enhetstester (matematik och kontrakt)
| Test-ID | GIVEN | WHEN | THEN (måste kunna automatiseras) |
|---|---|---|---|
| `KPI-001` | 100 FINISHED, 10 DNF, 15 DNS, 2 UNKNOWN, 1 DSQ | bygg översikt | startande=111, fullföljde=100, DNF=10; procentsatser 100/111 och 10/111; DNS/UNKNOWN inte startande |
| `KPI-002` | Kvinnors giltiga tider [4h,5h,8h,9h,9h], män [3h,4h,5h,6h,7h] | visa tider | båda grupper i **SAMMA kort**; median 8h/5h och medel 7h/5h, explicit separata etiketter |
| `KPI-003` | Endast fyra kvinnliga FINISHED | beräkna gruppmått | `Otillräckligt underlag`; ingen förment statistiskt säker medel/median |
| `KPI-004` | Okänd könsdata för tre FINISHED | beräkna totaler och kön | alla tre med i fullföljde, ej tillskrivna M/F |
| `KPI-005` | Saknad/verifierbart oklar anmälningsstatus | visa `Startande` | visa `Ej fastställt` i stället för antagande; extra `Anmälda` skapas inte |
| `STAT-001` | Sorterade tider [1,2,3,4,5] och [1,2,3,4] | median | 3 respektive 2,5 |
| `STAT-002` | Kvantiler enligt §12 | P10/P50/P90 | exakt samma interpolation i alla moduler |
| `STAT-003` | 9 kompletta profiler | segmentstatistik | median tillåten, Q25–Q75 dolt, Q10–Q90 dolt |
| `STAT-004` | 10/20 kompletta profiler | segmentstatistik | Q25–Q75 från 10, Q10–Q90 först från 20 |
| `STAT-005` | Saknad officiell placering | placeringsserie | ingen ny rankingpunkt, brott i serien |
| `STAT-006` | Slutresultat med officiellt DNF utan split | DNF-flöde | antal visas, ingen fiktiv avhoppskontroll |
| `PLAN-001` | Kompletta segmentandelar + måltid 5h | planera | alla segment >=0 och summa **exakt** 5h, sista ackumulerade = 5h |
| `PLAN-002` | Bara fyra kompletta segmentresultat | planera | ingen påstådd historisk profil; endast explicit fallback |
| `PLAN-003` | Ingen fysisk segmentdistans | beräkna pace | pace spärrad, verklig segmenttid kan visas |
| `H2H-001` | A=1:00 och B=1:03 vid gemensam kontroll | gap | +3:00 och klartext `A före med 3:00` |
| `H2H-002` | A/B delar inte officiell segmentgräns | segmentjämförelse | ingen falsk segmentskillnad; modul märkt otillgänglig |
| `H2H-003` | Samma distans men ej jämförbara banversioner | jämför olika år | inga absoluta helbaneluckor; tillåten respektive års fältkontext kan fortfarande visas |
| `IDENT-001` | två olika personer med samma namn | import | får två skilda resultat-/personidentiteter; inga automatiska merges |
| `PRIV-001` | anonymiseringsregel | publicera | ursprungsnamnet saknas i HTML, JSON, JS, index, metadata och länktext |

### 17.2 End-to-end-funktionstester
| Test-ID | Klick/handling | Förväntat resultat |
|---|---|---|
| `E2E-001` | Ladda vald distans/år | hero → **5 KPI i en rad** → sök → individer → jämförelser → plan → fält → generell statistik |
| `E2E-002` | Byt distans/år | faktakort, tabeller, rubriker, eventuell rutt och data aktualiseras utan dubbletter |
| `E2E-003` | Sök löpare med svenska tecken | korrekt träff, pil/Enter/Escape, öppna profil |
| `E2E-004` | Klick `Lägg till jämförelse` | chip `Namn (år)` tillkommer, knapp byter till `Ta bort`, räknare ändras |
| `E2E-005` | Välj två | Direktjämförelse öppnas, gemensamma officiella mått visas, karta/replay gated |
| `E2E-006` | Försök välj tredje till Direktjämförelse | tydlig gräns och förslag Kartduell; ingen tyst truncering |
| `E2E-007` | Välj fem till Kartduell | fem markörer när var och en har godkänd replay, inga borttappade urval |
| `E2E-008` | Byt år från 2025 till 2026 i `Alla år` | tidigare valda resultat/år är kvar, visas som namn+år |
| `E2E-009` | Öppna profil och klick `Planera måltempo` | loppplanssektionen nås med giltig målstart eller median fallback |
| `E2E-010` | Klicka segment i profil | karta, höjd och segmentdiagram visar **samma** segment och tid |
| `E2E-011` | Spela replay i 120s, byt kamera, seek, paus | markörer och playhead synkroniserade; standard `Följ båda`; inga tile-blinkningar |
| `E2E-012` | Aktivera musik | eventmusik spelar vid användarhandling, default 30 %, mute fungerar och ingen autoplay vid öppning |
| `E2E-013` | Dela profil/jämförelse | URL öppnar samma resultat, år, läge, kamera/tid där tillåtet |
| `E2E-014` | Webbläsarens Back/Forward | tillstånd återställs, ingen modal-loop eller rensat jämförelseval |
| `E2E-015` | Öppna `(i)` i **varje** standardmodul | rätt rubrik, syfte, källa, metod, tolkning, begränsning samt tangentbordsstängning |
| `E2E-016` | Rensa favoriter/valda | respektive lista uppdateras separat, inga andra val raderas |
| `E2E-017` | Öppna resultatlista och klick datapunkt | korrekt individprofil, återvänd till ursprungsposition |
| `E2E-018` | Använd kort upplaga helt utan splits | finish/percentiler fungerar, segment och replay visar evidensbaserat reservläge |
| `E2E-019` | Öppna stafett/team | lagresultat visas utan uppfunnen medlem-etappkoppling |
| `E2E-020` | Läs anonymiserad person | ingen originalidentitet i sökning/profil/delning/tabell |

### 17.3 Visuell testmatris
- **Viewport:** `1536×1024`, `1440×900`, `1200×900`, `1024×768`, `900×900`, `768×1024`, `390×844`, `360×800`. Ta skärmbilder på varje större sektion, profilmodal, H2H-modal och Kartduell.
- **Desktopkriterium:** fem lika höga KPI-boxar bredvid varandra efter hero; medel och median för båda kön inom **samma fjärde box**. Ingen två-raders KPI på >=900px.
- Kontrollera att informationstext, axeltitlar och tick labels inte kapas; ingen horisontell overflow. Två löpare syns i karta/höjd utan att markörer täcker varandra.
- Kontrollera att tidsreglage, kameraval, uppspelningstid och musik ligger på linje där bredden tillåter. Kartan blinkar inte vid uppspelning eller byte av korta tidssteg.
- `prefers-reduced-motion`, 200 % zoom, keyboard-only, touch/mobile landscape och hög kontrast ingår i acceptans.

### 17.4 Kvalitetsgrindar innan release
1. Raw→curated antal och status reproducerbara, avstämda mot officiell källa.
2. Inga okända observationer/banjämförbarheter rekonstruerade som sanning.
3. Alla tillgängliga block följer mallens ordning och samtliga aktiva kontroller fungerar.
4. Samtliga standardiserade `(i)`-poster finns och refereras av UI; automatiskt test stoppar hjälplösa komponenter.
5. Privacy-scan av **publicerat paket**, inte bara appens skärm.
6. E2E, data-, schema- och responstester gröna på samma **exakta commit SHA** som leverans.
7. Publik social preview testad: rätt namn, rätt bild, uppdaterad absolute URL.
8. Endast godkända publika assets, inklusive GPL/OSM-tillstånd/attribuering där relevant.
9. Rapport `reports/RELEASE_READINESS.md` med PASS/FAIL per block, capability-matris och kvarvarande blockerare.
10. Publicering/merge görs **bara efter den instruktion projektägaren gav för uppdraget**, inte enbart för att tester är gröna.

## 18. Startpaket och uppdrag till Codex – obligatorisk arbetsordning

### 18.1 Minsta indata från projektägaren
Denna mall definierar **hur** produkten fungerar. Följande loppunika fakta måste komma från verifierade källor och går inte att avgöra i en generell specifikation:

| Fält | Källa/verifiering | Om saknas |
|---|---|---|
| Officiellt eventnamn, familjer/distanser, år/datum | arrangör/loppkatalog | fråga/registrera som obeslutat |
| Officiella tävlingsresultat och tillgängliga statusar | timingprovider/organisatör | stoppa importen, bygg inte på gissningar |
| Officiella mellantider och checkpointordning | timingprovider | visa endast finish/översikt |
| GPX/rutt och rätt att publicera | arrangör eller verifierad godkänd källa | disable kartläge eller märk referens |
| Banversioner och historisk jämförbarhet | banrevision och proveniens | disable prestationsjämförelse över år |
| Säker lag-/etappsemantik | officiellt format | teamprofil utan person-etapp |
| Klass-/könskategorier | officiella resultat | visa neutrala saknade data |
| Herobild, logotyp, social bild, musik/licens | projektägare/organisatör | tillåt neutral standardhero, ljud av |
| Standarddistans/varumärkesfärg och eventbeskrivning | projektägare | välj explicit innan release |
| Publiceringsadress och godkännande | projektägare | förbered Draft PR, publicera inte |

**Policy:** saknas något går arbetet vidare för de moduler som kan byggas korrekt. Fråga endast om blockerande fakta där en källsäker default inte kan sättas. Inget av ovanstående får tyst gissas.

### 18.2 Arbetsfaser för nytt analysverktyg
**Fas A – Inventering:** GitHub-repo, `AGENTS.md`, gamla referensmoduler, officiell källa, år/distans, rättigheter, coverage och QA-budget; skriv `reports/NEW_EVENT_DATA_AUDIT.md`.

**Fas B – Kontrakt:** skapa `event.json`, `source-bindings.json`, `course-versions.json`, `capabilities.json`, `help/sv.json`. Validera mot schema och generera färdig readiness-matris.

**Fas C – Engine och import:** raw archive separat/privat, kuraterad db med originalfält, datamodell, anonymisering och exporter. Jämför antals- och statusmatris officiellt.

**Fas D – Frontend:** bygg sektioner exakt i ordning 1–10c från återanvändbara komponenter. Kör modultester under arbetets gång; inga placeholderknappar.

**Fas E – Interaktion:** sökning/favoriter, profil/replay, exakt två i H2H, 2–5 Kartduell, årbyte, loppplan, axlar, synk, delning och Back/Forward.

**Fas F – Granskning:** varje analyspanel med `(i)`, accessibility, 8 viewport, käll- och privacy-kontroller, bortfall/replay/flerårs edge cases; dokumentera avsteg.

**Fas G – Publiceringskandidat:** Draft PR med genomgång, screenshots, exact-head QA-rapport, checklist, ändrade filer och länk till staging. Publicera först enligt uppdragets uttryckliga godkännande.

### 18.3 Copy/paste-instruktion till Codex för nya lopp

> Läs `spec/LOPPANALYS_STANDARD_V1_0.md` i sin helhet och behandla alla MÅSTE-krav, beräkningar, hjälptester och evidensspärrar som acceptanskriterier. Bygg ett nytt Loppanalys-verktyg för **[OFFICIELLT LOPPNAMN]** med distanser/år/resultatkälla enligt `[EVENT CONFIG + KÄLLUNDERLAG]`. Återanvänd beprövade moduler från de fyra referensrepona via ett gemensamt blockbibliotek eller kontraktskompatibla adaptrar; bygg inte om de befintliga publika verktygen. Följ exakt sektionernas ordning: hero → fem faktakort på EN desktoprad, där kvinnor/män och medel/median ingår i samma kort → löparsökning → individuell analys → Direktjämförelse 2.0 → Kartduell → personlig loppplan → fältstatistik → fördjupning → bana/historik → resultatdatabas → metod. Implementera samtliga knappar och informationsknappar på riktigt. Värdera varje RaceEditions faktiska dataförmåga och fabricera aldrig mellantider, identiteter, GPS, DNF-platser eller jämförbarhet. Skapa explicit eventkonfiguration, käll-/banproveniens, delade hjälptexter, enhetstester, Playwright-testflöden och skärmbilder i angivna viewporter. Leverera en Draft PR och en ärlig `RELEASE_READINESS` med PASS/FAIL och blockerare; publicera inte utan separat uttryckligt godkännande.

## 19. Beslutsregister och avvikelsehantering

**Låsta beslut i version 1.0:** toppordning, de fem faktakorten i en desktoprad, kvinnor+män i ett kort, både medel+median tydligt etiketterat, de personliga verktygens placering, Comparison 2.0-kontrakt, 2–5 Kartduell, DNF-/statuslogik, könspalett, 100%-linje i relativ fart, hel-loppets mediantid som loppplansdefault, källbaserad gating, metodhjälp i varje standardbox, anonymisering och no-fabrication-principen.

**Eventberoende fakta, INTE generella obesvarade designfrågor:** banors faktiska jämförbarhet, resultatschemans semantik, antal distanser, tillgängliga år, bild/musik och publiceringsrättigheter. Dessa bestäms i fas A/B och redovisas explicit.

**Avvikelsepolicy:** om källformat eller tävlingsregler motiverar annat än standard ska en PR föreslå: standardkrav → föreslagen avvikelse → källbevis → konsekvens för UI/metodik → tillhörande regressionstest. Ingen avvikelse får bakas in som oannonserad specialkod. Modulens interna design kan förbättras, men kontrakt och användarhandlingar ska bestå.

## 20. Definition av ”färdig ny mall”

Det räcker inte att en ny sida *ser ut* som infografiken. Mallen är komplett först när:
1. det finns **riktiga återanvändbara komponenter** för alla standardmoduler och de har en dokumenterad API/dataform;
2. den maskinläsbara `event.json` kan bytas till ett annat verifierat lopp utan handändring i generell frontend;
3. varje knapp är aktiv enligt kontrakt och varje `(i)` har full hjälp;
4. samtliga funktions- och tillståndstester är gröna;
5. ett kort lopp **utan splits** och ett långt lopp **med splits/GPX** båda passerar acceptans, med rätt reservläge;
6. ett individuellt lopp och ett team/stafettlopp har korrekt datamodel och begränsningar;
7. sidordning, femkortsrad och personliga analyser över generell statistik är verifierade i screenshots;
8. historik, jämförelser, fart och bana aldrig använder data som inte stöds av källor;
9. anonymisering tillämpas i exportkedjan och valideras automatiskt;
10. nästa lopp bara kräver verifierat datainnehåll, eventuell ny provideradapter, innehållskonfiguration och dokumenterade små anpassningar – inte nytt copy/paste-specialbygge.

---

**Slut på kravspecifikation v1.0.0.** Den visuella skissen är en kompletterande översikt; denna text och datakontrakten styr utveckling och QA.
