# Loppanalys.se – rutin för rättighetsbegäranden och publiceringsspärrar

**Version:** 2026-10-12. **Ägare:** personuppgiftsansvarig för Loppanalys.se.  
**Status:** Operativ checklista. Kontrollerna ska genomföras för varje begäran, inte enbart dokumenteras.

## 1. Ta emot, registrera och prioritera

1. Ta emot begäran via kontaktadressen på [integritetssidan](https://www.loppanalys.se/integritet/). Skicka en kort mottagningsbekräftelse.
2. Registrera mottagningsdatum, berörda lopp/resultat, önskad åtgärd (rättelse, invändning, radering, tillgång eller begränsning), beslut och datum för verkställighet i ett **åtkomstskyddat** ärenderegister. Publicera inte ärenderegister eller personnamn i GitHub.
3. Begär endast så mycket kompletterande information som krävs för att knyta personen till rätt resultatrad. Kräv inte personnummer eller legitimation rutinmässigt.
4. Svara utan onödigt dröjsmål, normalt **senast inom en månad**. Om lagstadgad förlängning behövs informera inom den första månaden med skäl och ny tidsfrist.

## 2. Utred beslut innan persondata ändras

- **Rättelse:** kontrollera arrangörens uppgifter och dokumentera eventuell rättelse eller avvikande källinformation.
- **Invändning enligt art. 21:** bedöm om behandlingen får fortsätta trots invändningen. Ett avslag kräver prövning av avgörande berättigade skäl eller rättsliga anspråk, inte en automatisk standardsvarsmall.
- **Radering enligt art. 17:** pröva om publiceringen och eventuell fortsatt lagring behöver upphöra. Enbart namnmärkningen “Anonym löpare” räcker inte för full radering om kombinationen av prestationer fortfarande identifierar den registrerade.
- **Tillfällig begränsning:** om identitet, korrekthet eller tillåtlighet behöver utredas, pröva om fortsatt publik behandling ska begränsas under handläggningen.

## 3. Verkställ i samtliga lopp

1. Sök efter relevanta resultat i Ultravasan, Gotaleden, ÖST, Sätila och GAX100 samt framtida importer, utan att anta att alla personer med samma namn är samma individ.
2. För ett beviljat **publikt identitetsskydd**, tillämpa den gemensamma spärren före export och rensa direkta identifierare, klubb/startnummer och identifierande URL-parametrar eller metadata.
3. För **full radering**, ta bort den berörda personens identifierbara resultat från den publika exporten i den utsträckning beslutet kräver; bevara inte automatiskt detaljerad loppstatistik som kan länkas tillbaka till personen.
4. Titta även på startsidans kort, sökförslag, publika JSON, jämförelseval, diagram, kartpopup, delningslänkar, arkiverade byggen och cache. Kontrollera att offentliga datakopior där du råder över dem rättas eller tas bort.
5. Bygg om berörda publika exportfiler och låt CI/QA blockera distribution om skyddad identitet hittas. Kontrollera aktuell publicerad version manuellt.
6. Registrera en minimal framtidsspärr så att nästa års import inte återinför data av misstag. Den centrala spärrlistan bör vara åtkomstskyddad; **publika hashlistor är inte oåterkalleligt anonyma**.

## 4. Kontroll och återkoppling

- Kontrollera resultaten både i den synliga webbappen och den nedladdningsbara browserdatan.
- Bekräfta för personen vilka åtgärder som genomförts och ange tydligt eventuella begränsningar och skäl.
- Bedöm även behovet av att underrätta mottagare och sökmotorer om publicerad data som tagits bort, enligt tillämpliga bestämmelser.
- Om klagomål till IMY framförs, dokumentera ärendet sakligt och visa beslutsprocessen. **Att ett LIA-dokument existerar garanterar inte att behandlingen är laglig.**

## 5. Teknikstatus vid upprättandet

- De fristående analysverktygens HTML-sidor har fått `noindex, nofollow`; detta blockerar inte direkt åtkomst eller öppet JSON.
- De fyra tidigare loppsystemen har en gemensam grund för publiceringsspärrar.
- GAX100:s Draft-branch har fått samma fingerprint-spärr och ett test av publik export; full täckning och global administration återstår att verifiera.
- En gemensam, säker operatörsfunktion för alla framtida lopp återstår. Tills dess behövs explicit kontroll per repo och publicerad artefakt.

Referenser: [GDPR](https://eur-lex.europa.eu/legal-content/SV/TXT/?uri=CELEX%3A32016R0679) artiklarna 12, 14, 16–18, 19 och 21 samt [IMY:s översikt av den registrerades rättigheter](https://www.imy.se/verksamhet/dataskydd/det-har-galler-enligt-gdpr/de-registrerades-rattigheter/).
