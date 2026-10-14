# Loppanalys.se – GDPR-arbetsläge 2026-10-14

**Status:** Teknisk integritetsspärr är driftsatt i de fyra publika analysverktygen. Hela GDPR-arbetet är **inte avslutat**. Gotaledens publikt spårade källor är en verifierad exponering och har högsta prioritet. GAX100 är fortsatt en ej publicerad integrationskandidat.

Detta dokument är en levande lägesuppdatering och ersätter **inte** historiska revisionsprotokoll från 2026-10-12. Dokumentet innehåller inga registrerade personers identiteter eller privata registeruppgifter.

## Överenskommen teknisk målsättning

Utvecklingsarbetet fortsätter med utgångspunkt att Loppanalys behandlar **officiella, redan offentliga idrottsresultat för statistik och analys**, med ett dokumenterat berättigat intresse som avsedd rättslig grund. Den bedömningen är en arbetsinriktning och inte ett generellt påstående att all personuppgiftsbehandling automatiskt är laglig.

Den prioriterade tekniska acceptansen är: (1) verifierat minderåriga ska vara borttagna ur individexporten, (2) godkända vuxna opt-out-begäranden ska gälla i alla berörda lopp och vid återimport, (3) inga känsliga identiteter eller originalkällor återpubliceras av rutinjobb, och (4) nya lopp ärver samma exportgrindar. Separat incidentrapport har inte beställts inom utvecklingsarbetet; eventuella självständiga rättsliga skyldigheter avgörs inte av denna projektavgränsning.

## Utfört i denna arbetsomgång

- Ny `.github/workflows/guard-public-raw-sources.yml` finns på `main` i **samtliga fem** analysrepon och dess första körning är PASS. Den stoppar ändrade skyddade rådatavägar, inklusive offentliga deletion-diffar, utan att skriva deltagarrader i loggar. Spärren raderar inte historik och omfattar utpekade källvägar, inte samtliga tänkbara filer.
- Sätilas äldre `import-eqtiming.yml` är stoppad; GitHub Actions verifierade att importjobbet hoppades över.
- Gotaledens och Österlens privata source-restore använder nu `if: always()` för att städa den privata checkouten också efter misslyckande; Ultravasan och GAX100 hade redan detta.
- Normen `standards/LOPPANALYS_STANDARD_V1_0.md` kräver nu borttagning av spärrad individs offentliga resultatrader/länkade detaljer som förstahandslösning, minderårighetsskydd, fail-closed-register och CI-spärr mot offentliga råkälländringar.
- Ultravasans [PR #84](https://github.com/Stayinhealthyrunning/ultravasan-analys/pull/84) **mergades efter grön full Tests, GDPR-grind, källkontroll och raw-source-guard** till `84555dc3f20107fdc381aa98983230818e6cc4a3`. PR:n ändrade endast tre filhashar i U2-referensen efter skyddad webbutmatning; inga deltagarposter eller analysregler.
- Österlens ena Pages-deploy kolliderade med en samtidig föregående deployment; **omkörningen PASS** för senaste huvudbranchens commit `a54207726524a70d68102d79e8a0cb62d64438ed`. Funktionstesterna passerade.

## Säkrare avslut och beroenden

- **Gotaleden:** senaste CI, Pages och råkällsgrind är PASS efter ändringarna på `5c4af4ad7460e0ae4d2e1b04b42f59432dc78ab7`. Inga 16 publikt spårade original avlägsnas genom denna kodfix; separat säker ref-/historikrutin kvarstår. **Full branch-head-granskning:** 57 av 58 listade Git-grenar innehåller minst en av de ursprungliga källvägarna. Endast den särskilda migrationsarbetsgrenen saknar dem i sitt aktuella träd; även den har historiska objekt. Alla 58 branch-heads, historik och dolda PR-referenser måste hanteras i en godkänd sanering. Se [privat beslutsärende #6](https://github.com/Stayinhealthyrunning/loppanalys-private-data/issues/6).
- **Ultravasan:** PR #84 mergad till `84555dc3f20107fdc381aa98983230818e6cc4a3`; även **postmerge** Tests, Pages och råkällsgrind PASS.
- **Österlen:** frontend/QA och omkörd Pages-deployment PASS efter källstädningen, på `a54207726524a70d68102d79e8a0cb62d64438ed`.
- **Sätila:** public raw-source guard PASS och rå EQ Timing-workflow avsiktligt SKIPPED. Befintliga offentliga deltagar-GPX och 43-km-ZIP kvarstår som granskningsobjekt.
- **GAX100:** public raw-source guard PASS i `main`, senaste käll- och GDPR-integration QA PASS men PR #6 fortsätter vara Draft och ej publicerad.
- **Oberoende backup:** det privata arkivet innehåller nu [Windows-guiden utan GitHub CLI](https://github.com/Stayinhealthyrunning/loppanalys-private-data/blob/main/docs/BACKUP_WINDOWS_NO_GH_CLI.md), kontrollskript och en föreslagen Windows Actions-testkörning. Ingen fristående krypterad kopia eller lyckad provåterläsning är ännu dokumenterad. Verktyget måste köras/verifieras innan vi godkänner historiesanering.

## Fortsatt arbete 14 oktober – bekräftad inriktning och Sätila GPX

- **Gotaleden:** Det verifierade privata GitHub-arkivet med 16/16 original är **tillräckligt för nuvarande återbyggbarhet**. En separat krypterad backup är starkt rekommenderad mot förlust av GitHub-konto/repo men inget automatiskt särskilt GDPR-krav. **Publika original i 57/58 grentoppar och äldre historik kvarstår** och måste hanteras separat; det privata arkivet ensamt tar inte bort den offentliga exponeringen.
- **Sätila:** 2021–2022 års neutraliserade referensbana och 2023–2025 års medoid-konsensus är redan deterministiskt skapade, utan deltagarnamn/tidstämplar. Tidigare låg 2024 års publicerade karta kvar som en enskild inspelningsbaserad bana. [PR #59](https://github.com/Stayinhealthyrunning/satila-splits/pull/59), **merge `7db361f3b8ba2d0aeca7110728c044ce38a41333`**, bytte den till den neutrala rutten (822 punkter, 41,873734 km), med bibehållen visuellt utjämnad höjd och oförändrade officiella tider; full PR-QA och postmerge Pages PASS. 2025 behåller arrangörsbanan.
- **Privata Sätila-original:** exakt fem deltagar-GPX 2021–2025 har kopierats byteidentiskt till `loppanalys-private-data/satila/participant-gpx-original/`; Git-blob-identitet verifierad mot respektive offentligt original och SHA-256-manifest registrerat i privat repo. De fem offentligt spårade originalen och ett tidigare 43-km-käll-ZIP ska avvecklas via säker sanering, inte via en publik borttagningsdiff som återger personuppgifter.
- **Återläsning KLAR:** GitHub App-hemligheterna är nu konfigurerade i Sätilas Actions. [Sätila PR #60](https://github.com/Stayinhealthyrunning/satila-splits/pull/60) fick PASS i samtliga fem kontroller efter omkörning (inkl. privat exakt GPX-restore, källhashar, kart-/browser-QA, GDPR och raw-source-guard) och **mergades** till `575e245686555f1ba47a99d1f3959daee9a7def7`. Tidigare offentliga ZIP-importflöden är avstängda och den framtida originalåterläsningen kräver privata källor. Ingen råfil/historik har raderats av denna PR.
- **Minderåriga:** den redan införda policyn står fast. Endast verifierat minderåriga tas automatiskt bort ur individexporten; okänd ålder får inte gissas eller beskrivas som verifierad vuxen. GAX100:s 945 källresultat har fortfarande okänd ålder och systemet är inte produktionspublicerat.

## Verifierad GitHub-status

| Projekt | Publiceringsskydd / källa | Kvar |
| --- | --- | --- |
| Gotaleden | GDPR-register PR #52 mergad; privat källrestore PR #57 mergad till `a4d007dd9e12678863ca028483fdca516a7b722b`, postmerge Tests och Pages PASS. 16/16 källfiler finns i privat arkiv. | **BLOCKERAR:** 16 ursprungliga källfiler, cirka 29,87 MB, är fortfarande spårade på publika `main` (SQLite, EQ Timing, GPX); verifierade registerträffar i delar av källorna. PR #56 stängd utan merge eftersom även deletion-diff visade personuppgiftsrader. Säker historiesanering/Support återstår. [Publikt ärende #53](https://github.com/Stayinhealthyrunning/gotaleden-splits/issues/53); [privat beslutspaket #6](https://github.com/Stayinhealthyrunning/loppanalys-private-data/issues/6). |
| Ultravasan | GDPR- och säkrade källändringar, inklusive PR #83, mergade; Tests och publicering PASS. 17/17 privata källor verifierade. | Historik/cache, framtida importflöden och juridiska beslut måste slutgranskas. |
| Österlen Spring Trail | GDPR-register och källkarantän PR #75 mergade; relevanta `main`-flöden PASS. | Historik/cache, kvarvarande källspår, rättigheter och juridiska beslut måste slutgranskas. |
| Sätila Trail | GDPR-register PR #56 och stor råarkivborttagning PR #57 mergade. | Git-historik, självständig krypterad backup före artefaktens utgång **2026-10-31**, samt integritets-/rättighetsbedömning av fem fortfarande publika deltagar-GPX och separat 43-km-käll-ZIP. [Ärende #6](https://github.com/Stayinhealthyrunning/satila-splits/issues/6) och [#58](https://github.com/Stayinhealthyrunning/satila-splits/issues/58). |
| GAX100 | Integrations-Draft #5 och privatkälle-Draft #6; senaste GAX100 QA och Snapshot UX QA PASS på `90ae82c7daef3a36fe02cc8bc32943ba933d46d5`. 17/17 privata filer verifierade; 14 upplagor, 945 källresultat, 1 838 mellantidsobservationer. | **Ej publikationsklar:** behåll Draft; godkänn rättslig grund och käll-/GPX-rättigheter, oberoende backup, filtrerad publicering, historik och manuell releasegranskning. |

För samtliga fyra aktiva analyser har HTML `noindex, nofollow` verifierats i aktuell `docs/index.html`. Detta är **inte** åtkomstkontroll för Git, PDF, JSON eller GPX. Privat `LOPPANALYS_PRIVACY_REGISTRY_B64` används som fail-closed-gate; hemlighetsvärdet får aldrig skrivas i repository, issue eller loggar. För GAX100 är motsvarande skydd ännu endast i granskningsgrenarna.

**Ny skyddsåtgärd 2026-10-14:** Sätilas äldre importjobb som laddade upp ofiltrerade EQ Timing-källor som Actions-artefakter har spärrats på `main` (`c90bc04f62e62b1f5d0ac01ace5ed62207606222`). GitHub Actions bekräftar att efterföljande körning **skipped**. Tidigare artefakter försvinner inte av denna spärr.

## Blockeringsordning – avsluta innan ny funktionsutveckling

1. **Omedelbar riskhantering – Gotaleden:** Bevara privat verifierat original (gjort); gör separat krypterad och återläst backup på annat konto/medium (ej verifierat); inventera samtliga branches/tags/PR-referenser, Actions, Pages, forks, kloner och exponering; besluta om incident och riskbegränsande åtgärder. Detta kräver inte att personnamn publiceras.
2. **Säker sanering:** Efter separat dokumenterat ägargodkännande och verifierad oberoende backup, följ GitHubs officiella `git-filter-repo --sensitive-data-removal`-procedur i isolerad miljö, granska påverkade refs *före* force-push, kontrollera full build/Pages efteråt och begär GitHub Support-rensning av PR-referenser och cachar. Vanlig GitHub PR-borttagning är **inte** acceptabel för Gotaledens textoriginal eftersom borttagningsdiffarna exponerar personuppgifter.
3. **Övriga original / återimport:** Bedöm publicerade källarkiv, deltagar-GPX, historiska artefakter och automatiska importer i samtliga analysrepon. Sanera bekräftad exponering med samma riskstyrda princip; ingen råfil får automatiskt återföras till publik `main`.
4. **GDPR-releasegrind:** Verifiera senast publicerade HTML/JS/JSON, borttagna resultatrader och relationer, klubb-/lagmedlemmar, delbara URL:er och kommande importer. Kontrollera även att ålder är okänd i delar av materialet – det är **inte** verifierat att alla minderåriga kan identifieras (se `GRANSKNING_MINDERARIGA_2026-10-12.md`).
5. **Personuppgiftsansvarigs beslut:** Dokumentera incidentbedömning artiklarna 33–34 (inklusive eventuell anmälan inom 72 timmar från vetskap om anmälningspliktig incident), artikel 14-information vid indirekt insamling, artikel 6.1 f-intresseavvägning, leverantörsroller/tredjelandsöverföringar, gallringsfrister, källrättigheter och kontroll av rättighetsbegäranden. Beslut/privata detaljer ska lagras utanför öppna GitHub-repon.
6. **GAX100:** Genomför motsvarande slutgrind för Draft #6, kontrollera källfullständighet, lås licensierad geometri och publicera först efter uttryckligt releasegodkännande. Fortsätt därefter med UX-paritet, GPS/replay och resterande standardblock.

## Källor för saneringsmetoden

- [GitHub: Removing sensitive data from a repository](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository).
- [IMY: Hantering av personuppgiftsincidenter](https://www.imy.se/verksamhet/dataskydd/det-har-galler-enligt-gdpr/personuppgiftsincidenter/hantering-av-personuppgiftsincidenter/).
- [GDPR behandlingsstyrning](GDPR_BEHANDLINGSSTYRNING_2026-10-12.md), [åtgärdsplan](GDPR_ATGARDSPLAN.md), [minderårighetsgranskning](GRANSKNING_MINDERARIGA_2026-10-12.md).

**Definition av klart:** Allt exponerat källmaterial och relevanta historik-/cacheobjekt har antingen åtgärdats och verifierats, eller fått dokumenterat och rättsligt godtagbart riskbeslut; ompubliceringsskyddet fungerar för alla aktiva och framtida importer; nödvändiga ägarbeslut och incidentåtgärder är dokumenterade. Enbart grönt CI uppfyller inte detta.
