# GDPR – åtgärdsplan och beslutsunderlag för Loppanalys.se

**Senast reviderad:** 2026-10-12  
**Ägare / ansvarig för beslut:** personuppgiftsansvarig för Loppanalys.se  
**Utgångspunkt:** [GDPR-intresseavvägningen](GDPR_INTRESSEAVVAGNING_2026-10-12.md).  
**Viktigt:** Publicerad integritetstext och det faktum att analyserna använder offentliga resultat räcker inte för att verifiera full GDPR-efterlevnad.

| Prioritet | Åtgärd | Status 2026-10-12 | Klart när |
|---|---|---|---|
| **P0** | Implementera automatisk global identitetsspärr vid export för **samtliga** löpverktyg, inklusive GAX100 och framtida importer. | **Delvis.** Fyra system har sedan tidigare suppressionskonfiguration och GAX100 har fått samma spärr vid publik JSON-export på Draft-branchen. Central administrering och full återpublicerings-QA återstår. | Regressionstester för befintligt + nytillagt lopp visar att skyddade identiteter inte återpubliceras. |
| **P0** | Verifiera att begärd identitetsbegränsning är effektiv även via klubb/startnummer, fritextsökning, kartpopup, delad URL, dataexport och cachade byggartefakter. | **Delvis.** GAX100:s export rensar namnet och klubben, maskerar publikt result-ID och testar även observationsreferenser. Gamla publicerade artefakter och övriga lopp är ännu inte totalgranskade. | Samtliga publicerade distributionsvägar är granskade, och korrigerad export har distribuerats. |
| **P0** | Dokumentera artikel 14-informationsskyldigheten vid indirekt insamling; besluta om information till deltagare via arrangören eller individuellt och om eventuella undantag verkligen kan användas. | Öppen | Skriftlig bedömning per behandlingskategori av sätt, tidpunkt och rättsligt stöd; verifierade informationsåtgärder. |
| **P1** | Granska behandlingsregister, leverantörskedjan, personuppgiftsbiträden och möjliga tredjelandsöverföringar (GitHub Pages, Cloudflare, externa kart-/trackingtjänster). | Öppen | Leverantörernas roller, avtal/tillämpliga rättsliga grunder, geografiska flöden och retention har dokumenterats. |
| **P1** | Konkreta bevarandetider, årlig behovs-/gallringsprövning och rutiner för säker råarkivering/suppressionsregister. | Öppen | Dokumenterad rutin med ansvarig, beslutade kriterier, datum och exempelfall. |
| **P1** | Formalisera rättighetsprocess: tillgång, rättelse, invändning, radering, begränsning; svar inom tidsfrister. | Delvis: publik kontaktväg och policy finns. | Privat logg över inkomna begäranden, datum, åtgärd, beslutsmotiv och kontroll av efterföljande exporter. |
| **P1** | Separat rättslig bedömning av personkopplad GPS-historik, minderåriga och automatiserad historisk personmatchning. | Öppen | Dokumenterat beslutad behandlingsnivå och skyddsåtgärder före utökad publicering. |
| **P1** | Verifiera faktiskt publicerad persondata, även i JSON/databaser, källfiler, cache, GitHub Actions-artefakter och tredjepartsembeds. | Öppen | Revisionsrapport/testfall, minimalt publicerade fält och datakällor. |
| **P2** | Separat käll-/upphovs-/databasrättslig kontroll för resultatkällor och GPX. | Öppen | Licens-/åtkomst-/användningsbeslut dokumenterade per datakälla. |
| **P2** | Utbildande anonymiserings- och återpubliceringsrutiner i projektets utvecklingsstandard (AGENTS.md, releasechecklista). | Öppen | Nytt lopp kan inte passera release-QA utan suppressions- och publiceringskontroller. |

## Teknisk uppdatering 2026-10-12

- `noindex, nofollow` är infört direkt i HTML på Ultravasan, Gotaleden, ÖST, Sätila och GAX100 samt deras separata kartvyer där de finns. Loppanalys.se:s startsida och katalog behålls indexerbara.
- **Detta är en frivillig exponeringsbegränsning**, inte ett självständigt GDPR-skydd. Sökmotorer måste kunna hämta HTML för att läsa noindex; data-JSON måste skyddas separat.
- GAX100:s export på Draft-branchen `codex/gax100-etapp2` använder delade identitetsspärrar före publik JSON. Full GDPR-radering kräver bedömning även av kvarstående prestationer som kan återidentifieras.
- De delade personnamnsfingeravtrycken finns ännu i publika repositorykonfigurationer; på längre sikt behöver de förvaltas åtkomstskyddat med korrekt spärrhantering.
- **Pågående QA** i GitHub Actions måste vara godkänd innan ändringar markeras som fullt verifierade.

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
