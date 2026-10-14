# Loppanalys.se – GDPR-arbetsläge 2026-10-14

**Status:** Teknisk integritetsspärr är driftsatt i de fyra publika analysverktygen. Hela GDPR-arbetet är **inte avslutat**. Gotaledens publikt spårade källor är en verifierad exponering och har högsta prioritet. GAX100 är fortsatt en ej publicerad integrationskandidat.

Detta dokument är en levande lägesuppdatering och ersätter **inte** historiska revisionsprotokoll från 2026-10-12. Dokumentet innehåller inga registrerade personers identiteter eller privata registeruppgifter.

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
