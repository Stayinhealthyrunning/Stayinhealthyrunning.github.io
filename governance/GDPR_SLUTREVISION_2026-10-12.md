# GDPR-slutrevision 2026-10-12

**Omfattning:** Loppanalys.se, Ultravasan Analys, Gotaleden Splits, Österlen Spring Trail Analys, Sätila Splits och GAX100 Draft PR #2.
**Bedömning:** väsentliga tekniska skydd är implementerade och verifierade lokalt, men produktionsaktivering av det privata spärrregistret är blockerad eftersom GitHub Actions-hemligheten saknas. Revisionen gör därför inte anspråk på full rättslig efterlevnad.

## Genomförda skydd

- Två kända rättighetsärenden finns i ett åtkomstskyddat schema-2-register utanför publika repositoryn. Det innehåller inga klartextnamn, kontaktuppgifter eller födelsedatum.
- Varje namnträff kräver manuellt godkänt lopp och källresultat-ID. En ny namnlika träff stoppar export i stället för att automatiskt koppla ihop personer.
- Åtgärderna `restrict_identifiers`, `remove_result` och `temporary_restriction` stöds. Nuvarande högriskbeslut använder full borttagning av publik resultatrad och länkade detaljer.
- Publika konfigurationer innehåller inga personfingeravtryck. Registret laddas endast från lokal skyddad fil eller `LOPPANALYS_PRIVACY_REGISTRY_B64`.
- Fail-closed är aktiverat i produktionsworkflow-förslagen. Saknat eller ogiltigt register stoppar export.
- Verifierade minderårigas resultatrader tas bort före export. Metoden gissar inte ålder.
- Analysverktygen är `noindex, nofollow`; portalsidan är fortsatt indexerbar. Detta är endast exponeringsminskning, inte åtkomstkontroll.

## Verifiering

| Kontroll | Resultat |
|---|---|
| Ultravasan Python | 156 godkända, 4 skip, 29 subtests |
| Ultravasan JavaScript | samtliga `tests/test_*.js` godkända |
| Gotaleden | 300 godkända |
| Österlen | 47 frontend + 32 Python godkända med privat register |
| Sätila | 104 godkända, 1 dokumenterat skip |
| GAX100 | sekretesskontrakt och Node-syntax godkända lokalt; full databas/browser-QA är CI-beroende |
| Browserdata | 247 filer granskade, 0 träffar |
| Publika personfingeravtryck | 0 träffar i samtliga sex repositoryn |

Minderårighetsrevisionen visar 220 verifierade minderåriga i Österlen och 14 i Sätila. Ultravasans 104 blandklassposter är osäkra och fortsatt konservativt undanhållna. GAX100:s 945 resultat har okänd ålder. Se `minors-audit-2026-10-12.json`.

## GitHub och publiceringsstatus

Akuta borttagningar är redan publicerade på `main` i Sätila (`e9d24fd1`), Gotaleden (`e94bcea3`), Österlen (`15bf339`) och Ultravasan (`c1e25f2`). De nya register-/återpubliceringsskydden finns i Draft-PR:er:

- Ultravasan PR #78, commit `f0ece9f`
- Gotaleden PR #52, commit `e2bf8ae`
- Österlen PR #72, commit `9822324`
- Sätila PR #56, commit `cff79a2`
- GAX100: befintlig Draft PR #2, commit `7fbf3e3`

Preflight kördes i samtliga fem repositoryn. Varje run visade tom `LOPPANALYS_PRIVACY_REGISTRY_B64` och stannade vid registerladdningen. Detta bekräftar att hemligheten **inte är konfigurerad**; Draft-PR:erna får inte mergeas och produktionsflödena får inte aktiveras innan hemligheten har lagts till och omkörningen är grön.

## Styrning och rättigheter

Integritetssidan och styrdokumenten täcker ändamål/rättslig grund, transparens, rättigheter, privacy by design, säkerhet, leverantörskedja, bevarande och incidentkontroll med utgångspunkt i artiklarna 5, 6, 12–19, 21, 25 och 32. Separata ägarbeslut återstår för artikel 14-strategin, faktiska leverantörsroller/avtal, överföringar och kalenderbaserade bevarandetider.

## Kvarstående innan produktionsaktivering

1. Lägg den redan genererade registerhemligheten som Actions secret `LOPPANALYS_PRIVACY_REGISTRY_B64` i de fem berörda repositoryn eller på organisationsnivå med uttrycklig åtkomst till dem.
2. Kör om GDPR publication gate och ordinarie QA på exakt PR-head. Alla måste vara gröna.
3. Granska Draft-PR:erna och mergea endast godkända säkerhetsändringar; GAX100 PR #2 ska förbli Draft tills hela etappens egen granskning är klar.
4. Utför separat, återställningsbar riskanalys för Git-historik, gamla Actions-artefakter, Pages-cache och sökmotorcache. Ingen historikomskrivning har gjorts i denna revision.
5. Personuppgiftsansvarig fattar och protokollför artikel 14-, leverantörs-, överförings- och retentionsbesluten. Juridisk specialistgranskning bör övervägas.

## Slutbedömning

Det tekniska systemet är nu utformat för att ta bort verifierade minderåriga och godkända skyddsresultat, stoppa osäkra namnträffar och förhindra release utan privat register. Eftersom den nödvändiga GitHub-hemligheten saknas har systemet korrekt inte publicerats. Full GDPR-efterlevnad kan inte fastställas enbart genom denna kod- och dokumentrevision.
