# Behandlingsstyrning, artikel 14, leverantörer och bevarande

**Datum:** 2026-10-12
**Status:** tekniskt och organisatoriskt beslutsunderlag. Personuppgiftsansvarig måste fatta och dokumentera de markerade besluten; dokumentet är inte ett besked om full GDPR-efterlevnad.

## Grundprinciper och rättslig grund

- Ändamålet är analys av offentliga tävlingsresultat. Dataminimering, riktighet, lagringsminimering och säkerhet ska kontrolleras per export enligt artikel 5.
- Den avsedda grunden för begränsad publicering är berättigat intresse enligt artikel 6.1 f. Intresseavvägningen måste hållas aktuell och kan inte ersättas av att källan redan är offentlig.
- Minderårigas identifierbara resultatrader publiceras inte av Loppanalys. Automatisk klassificering görs endast från exakt ålder, säkert födelseår eller en entydigt avgränsad åldersklass. Okänd ålder gissas aldrig.
- Personkopplad GPS, automatiserad identitetsmatchning mellan år och andra utökningar får inte aktiveras utan en ny nödvändighets-, proportionalitets- och riskbedömning.

## Information enligt artiklarna 12–14

Uppgifter hämtas normalt indirekt från resultatleverantörer. Integritetssidan anger personuppgiftsansvarig kontaktväg, ändamål, avsedd rättslig grund, kategorier, rättigheter, bevarandeprincip och klagomålsväg. Ägaren måste därutöver besluta och protokollföra:

1. när artikel 14-information ska lämnas individuellt, via arrangör/leverantör eller med en dokumenterad undantagsbedömning;
2. hur berörda deltagare faktiskt kan nå informationen inom tillämplig tid;
3. vilka mottagarkategorier och internationella överföringar som ska anges;
4. hur väsentliga ändringar meddelas.

Ett undantag enligt artikel 14.5 får inte antas generellt bara för att antalet resultat är stort. Skälen och lämpliga skyddsåtgärder måste dokumenteras för den konkreta behandlingen.

## Rättigheter och privacy by design

Rättighetsrutinen täcker tillgång, rättelse, radering, begränsning och invändning enligt artiklarna 15–19 och 21. Det privata spärrregistret, full borttagning av länkade resultatrader, manuell kontroll av namnlika träffar, fail-closed-publicering och browserexportrevision är skydd enligt artiklarna 25 och 32. En spärr är inte bevis för att varje kvarvarande behandling är tillåten.

## Leverantörskedja

| Tjänst | Faktisk användning | Kontroll före slutligt beslut |
|---|---|---|
| GitHub repositories, Actions och Pages | Källkod, CI-artefakter och statisk publicering | Verifiera konto-/organisationsavtal, roller, behörigheter, loggning, artefaktretention, underbiträden och tillämplig överföringsmekanism mot GitHubs aktuella integritets- och underbiträdesdokument. |
| Cloudflare/DNS | Domän-, DNS- eller proxyfunktion beroende på aktiv konfiguration | Verifiera om trafik faktiskt proxas, rätt roll och DPA, logg-/cachelagring, region och raderingsmöjlighet. |
| OpenStreetMap-kartor | Browsern kan hämta kartplattor när användaren öppnar en karta | Dokumentera mottagare, IP-/loggflöde, nödvändighet, information och om en lokal eller samtyckesstyrd lösning behövs. |
| Resultat- och tidtagningsleverantörer | Indirekt källa för resultat | Dokumentera källa, villkor, ansvarsfördelning, riktighetsrutin och kontaktväg för rättelse. |

Aktuella primärkällor att kontrollera vid ägarbeslut: [GitHub Subprocessors](https://docs.github.com/en/site-policy/privacy-policies/github-subprocessors), [GitHub General Privacy Statement](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement) och [Cloudflare Customer DPA](https://www.cloudflare.com/cloudflare-customer-dpa/).

## Bevarande och gallring

- Publika identifierbara resultat: omprövas minst årligen och vid invändning, källrättelse eller ändrat ändamål. Ägaren ska besluta en konkret längsta tid per datakategori.
- CI-artefakter och loggar: sätt kortast praktiska retention i GitHub och kontrollera att hemligheter/persondata inte loggas.
- Råarkiv: åtkomstbegränsa, kryptera backup, dokumentera behov och gallra när källbevis eller återuppbyggnad inte längre kräver dem.
- Rättighetsärenden: behåll endast vad som behövs för handläggning och ansvarsskyldighet enligt en beslutad ärenderetention.
- Spärrregister: behåll en minimal spärr så länge det behövs för att förhindra återpublicering; pröva tillfälliga spärrar vid sitt slutdatum och hela registret minst årligen.

## Säkerhets- och incidentkontroller

Minsta åtgärder är minsta behörighet, separata GitHub-hemligheter, branch protection, beroende-/workflowgranskning, fail-closed-export, inga klartextidentiteter i loggar, årlig återläsning av backup samt incidentbedömning enligt artiklarna 33–34. Ett produktionsflöde får inte aktiveras om den privata registerhemligheten saknas eller inte kan valideras.
