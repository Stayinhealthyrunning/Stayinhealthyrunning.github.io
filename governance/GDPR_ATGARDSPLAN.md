# GDPR – åtgärdsplan och beslutsunderlag för Loppanalys.se

**Senaste kontrollerade status (2026-10-14):** Se [GDPR_STATUS_2026-10-14.md](GDPR_STATUS_2026-10-14.md). Nedanstående tabell är en historisk bedömning från 12 oktober och ska inte tolkas som aktuell driftstatus. De fyra publicerade verktygens privata registerskydd är nu integrerade, men Gotaledens offentliga originalkällor och kvarvarande historik/cache samt organisatoriska beslut blockerar GDPR-slutgodkännande. GAX100 förblir Draft.

**Senast reviderad:** 2026-10-12  
**Ägare / ansvarig för beslut:** personuppgiftsansvarig för Loppanalys.se  
**Utgångspunkt:** [GDPR-intresseavvägningen](GDPR_INTRESSEAVVAGNING_2026-10-12.md).  
**Viktigt:** Publicerad integritetstext och det faktum att analyserna använder offentliga resultat räcker inte för att verifiera full GDPR-efterlevnad.

| Prioritet | Åtgärd | Status 2026-10-12 | Klart när |
|---|---|---|---|
| **P0** | Implementera automatisk global identitetsspärr vid export för **samtliga** löpverktyg, inklusive GAX100 och framtida importer. | **Tekniskt genomförd, ej produktionsaktiverad.** Privat schema, administratörsverktyg, fail-closed-adaptrar och preflight finns på säkerhetsbrancherna samt GAX100:s befintliga Draft-branch. | GitHub-hemligheten har verifierats i varje repo, QA är grön och godkända brancher är publicerade. |
| **P0** | Verifiera att begärd identitetsbegränsning är effektiv även via klubb/startnummer, fritextsökning, kartpopup, delad URL, dataexport och cachade byggartefakter. | **Aktuell browserexport granskad:** 247 filer, inga skyddade identitetssträngar eller pseudonymiserade resultatrader. Git-historik, gamla Actions-artefakter och externa cachekopior återstår. | Historik/artefakter/cache har riskbedömts och åtgärdats eller fått ett dokumenterat beslut. |
| **P0** | Dokumentera artikel 14-informationsskyldigheten vid indirekt insamling; besluta om information till deltagare via arrangören eller individuellt och om eventuella undantag verkligen kan användas. | **Underlag dokumenterat; ägarbeslut öppet.** | Personuppgiftsansvarig har fattat och genomfört ett skriftligt informationsbeslut per behandlingskategori. |
| **P1** | Granska behandlingsregister, leverantörskedjan, personuppgiftsbiträden och möjliga tredjelandsöverföringar (GitHub Pages, Cloudflare, externa kart-/trackingtjänster). | **Teknisk inventering dokumenterad; avtals- och rollbeslut öppet.** | Ägaren har verifierat kontoavtal, regioner, överföringsmekanismer och retention i ett faktiskt behandlingsregister. |
| **P1** | Konkreta bevarandetider, årlig behovs-/gallringsprövning och rutiner för säker råarkivering/suppressionsregister. | **Rutin och kontrollpunkter dokumenterade; kalenderfrister kräver ägarbeslut.** | Beslutade frister och första genomförda gallringsprotokoll finns. |
| **P1** | Formalisera rättighetsprocess: tillgång, rättelse, invändning, radering, begränsning; svar inom tidsfrister. | Delvis: publik kontaktväg och policy finns. | Privat logg över inkomna begäranden, datum, åtgärd, beslutsmotiv och kontroll av efterföljande exporter. |
| **P1** | Separat rättslig bedömning av personkopplad GPS-historik, minderåriga och automatiserad historisk personmatchning. | Öppen | Dokumenterat beslutad behandlingsnivå och skyddsåtgärder före utökad publicering. |
| **P1** | Verifiera faktiskt publicerad persondata, även i JSON/databaser, källfiler, cache, GitHub Actions-artefakter och tredjepartsembeds. | **Aktuella webbpaket verifierade.** Källfiler, Git-historik, äldre Actions-artefakter och externa cachekopior är separat kvarstående risk. | Separat, ägargodkänd historik-/artefaktrensning är genomförd utan att bryta beviskedjan. |
| **P2** | Separat käll-/upphovs-/databasrättslig kontroll för resultatkällor och GPX. | Öppen | Licens-/åtkomst-/användningsbeslut dokumenterade per datakälla. |
| **P2** | Utbildande anonymiserings- och återpubliceringsrutiner i projektets utvecklingsstandard (AGENTS.md, releasechecklista). | Öppen | Nytt lopp kan inte passera release-QA utan suppressions- och publiceringskontroller. |

## Teknisk uppdatering 2026-10-12

- `noindex, nofollow` är infört direkt i HTML på Ultravasan, Gotaleden, ÖST, Sätila och GAX100 samt deras separata kartvyer där de finns. Loppanalys.se:s startsida och katalog behålls indexerbara.
- **Detta är en frivillig exponeringsbegränsning**, inte ett självständigt GDPR-skydd. Sökmotorer måste kunna hämta HTML för att läsa noindex; data-JSON måste skyddas separat.
- GAX100:s export på Draft-branchen `codex/gax100-etapp2` tar bort spärrade resultatrader och stoppar vid icke manuellt godkända namnträffar.
- Publika repositorykonfigurationer innehåller inga personfingeravtryck. Det verkliga registret finns utanför repositoryn och överförs till CI som en GitHub Actions-hemlighet.
- **Produktionsaktivering är spärrad** tills hemligheten har verifierats och samtliga QA-flöden är godkända.

## Redan utfört 2026-10-12

- Publicerad [integritetspolicy](https://www.loppanalys.se/integritet/) har fått tydligare förklaring av berättigat intresse, artikel 14, rättigheter, integritetsrisker och kontaktväg.
- Textlänkar till centrala policyn har lagts i publicerade analysgränssnitt (Ultravasan, Gotaleden, ÖST, Sätila och GAX100:s arbetsbranch).
- Skriftlig, preliminär intresseavvägning är dokumenterad i huvudrepot.

## Beslutsmall att fylla i efter kontrollåtgärder

- **Genomgång gjord av:** _anges av personuppgiftsansvarig_
- **Datum:** _fylls i_
- **Godkända behandlingskategorier:** _specificeras_
- **Eventuella förbud/begränsningar:** _specificeras_
- **Artikel 14-strategi och motivering:** _specificeras_
- **Leverantörs-/retentionsgenomgång:** _status och källor_
- **Resultat av global suppressions-QA:** _länk till tester_
- **Nästa granskning:** _datum_
- **Slutligt beslut:** _ej fattat_

För juridiskt slutgodkännande eller särskilt svåra avvägningar kan en dataskyddsjurist behöva granska underlaget. Dokumenten utgör inte ett tillståndsbeslut från IMY.
