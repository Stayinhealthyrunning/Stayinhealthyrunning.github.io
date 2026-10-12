# Loppanalys.se – granskning av minderårigas tävlingsresultat

**Datum:** 2026-10-12  
**Status:** Skydd av *direkt identifierande fält* är infört där minderårighet kan verifieras, men **fullständig anonymisering eller identifiering av samtliga minderåriga kan ännu inte garanteras**.

## Principer

- Ålder avser deltagarens ålder vid tävlingen, inte nuvarande ålder.
- Tillförlitlig källålder under 18, eller ett födelseår som gör minderårighet säker, motiverar skydd. Vid födelseår kan ett årtal ensamt vara otillräckligt för att skilja en 17-åring från en 18-åring; osäkra fall ska dokumenteras och granskas.
- En känd, avgränsad åldersklass som endast omfattar personer under 18 kan användas. En öppen blandklass som börjar vid 17 år kan omfatta vuxna; en sådan klass ska inte felaktigt beskrivas som en lista över verifierade minderåriga.
- Namn och personidentitet får inte härledas från namn, klubb, tid, kön eller startnummer för att **gissa ålder**.
- Skydd måste ske *före offentlig export* och omfatta JSON, delningslänkar och sökfunktioner – inte bara texten i webbläsaren.
- Maskering av namn och andra direkta fält är **pseudonymisering**, inte fullständig anonymisering enligt GDPR om en unik tid/placering kan återkopplas till originalresultatet.
- En begäran om full radering kräver separat prövning och kan motivera borttagning av fler individkopplade fält eller hela den publika resultatraden. Bevara statistik på tillräckligt aggregerad nivå.

## Status per analyssystem

| System | Tillgänglig åldersinformation | Infört skydd | Verifiering och kvarvarande osäkerhet |
|---|---|---|---|
| **Ultravasan** | Främst åldersklasser. En klass som börjar vid 17 år kan innehålla både 17-åringar och vuxna. | Försiktig identitetsspärr på **104 resultatrader i berörda 17+-blandklasser**, inte 104 fastställda minderåriga. Publik kanonisk och modulär data har byggts om. Skydd tillämpas även i ordinarie export. | Skyddsombyggnad och kontroll lyckades i GitHub Actions [38221201391](https://github.com/Stayinhealthyrunning/ultravasan-analys/actions/runs/38221201391); [Pages-publicering 38221255326](https://github.com/Stayinhealthyrunning/ultravasan-analys/actions/runs/38221255326) lyckades. Bred Chromium-smoke har fortsatt ett separat fel och ska inte beskrivas som helt grön. |
| **Gotaleden Stafett och Ultra** | Numerisk ålder och i vissa källor födelseår. | Minderåriga identifieras med konservativa åldersregler och skyddas vid dataexport. En särskild arbetsprocess maskerar även befintliga publicerade JSON-filer, resultatreferenser och relevanta lagtävlande. | [Tester](https://github.com/Stayinhealthyrunning/gotaleden-splits/actions/runs/38219710431), [spärrjobb](https://github.com/Stayinhealthyrunning/gotaleden-splits/actions/runs/38219710495) och [Pages-publicering](https://github.com/Stayinhealthyrunning/gotaleden-splits/actions/runs/38219710263) godkända. Detta bevisar inte att varje resultat har säker källålder. |
| **Österlen Spring Trail** | Numerisk ålder och ibland explicit avgränsade åldersklasser; lagdata finns separat. | Ålderssäker maskering utförs vid frontendexporten; referenser i mellantider och lagmedlemmar uppdateras. En särskild kontroll stoppar oskyddade minderåriga före deploy. | [Frontend-QA](https://github.com/Stayinhealthyrunning/osterlen-spring-trail-analys/actions/runs/38219068189) och [spärrjobb](https://github.com/Stayinhealthyrunning/osterlen-spring-trail-analys/actions/runs/38219062006) godkända. Saknad ålder kan inte klassificeras med säkerhet. |
| **Sätila Trail** | Numerisk ålder för många individuella resultat; i andra fall saknas uppgiften. | Deltagare med verifierad ålder under 18 maskeras vid byggandet: namn, klubb, startnummer, ålder, tävlingsklass och ursprungliga identitetsreferenser rensas. Referens till delsträckor behålls med ersatt id. | [Pages-releasekontroll](https://github.com/Stayinhealthyrunning/satila-splits/actions/runs/38221366666) godkänd med särskilt test för minderåriga. Saknad ålder kvarstår som täckningslucka. |
| **GAX100** | Nuvarande normaliserade resultat saknar verifierat numeriskt åldersfält eller födelseår. | Nya skyddsregler i Draft PR #2 döljer identifierare **om** framtida källuppgifter visar ålder under 18 eller tillräckligt tydlig ungdomsklass. | [QA](https://github.com/Stayinhealthyrunning/gax100-analys/actions/runs/38221513750) och [förhandsvisningens publicering](https://github.com/Stayinhealthyrunning/gax100-analys/actions/runs/38221625137) är godkända. **Det går ännu inte att garantera att alla minderåriga i GAX100 är identifierade** med nuvarande data. Draft PR #2 är öppen och inte mergad. |

## Viktiga kvarstående kontroller

1. **Ålderstäckning:** Sammanställ för varje lopp, distans och år antalet resultat med säker ålder, åldersklass med oklar nedre gräns och helt okänd ålder. Publicera endast aggregerade granskningsresultat, inte namn på misstänkta minderåriga.
2. **Säkrare ålderskälla:** Fråga arrangören eller tidtagningsleverantören om pålitlig ålders-/födelseårsmarkering där den saknas. Begär minimalt med data, undvik fullständiga födelsedatum om födelseår eller en flagga för under 18 räcker.
3. **Indirekt identifiering:** Bedöm om namnmaskering räcker för minderåriga som är lätta att hitta via unik sluttid, klubbtillhörighet eller officiell resultatlista. Vid hög risk, överväg att inte publicera individens resultat alls utan endast aggregerade tal.
4. **Hantering av tidigare exponering:** Granska GitHub-historik, gamla publika artefakter, cache, sökmotorer och sparade länkar där det är möjligt. En ny publicering garanterar inte att äldre kopior har försvunnit.
5. **Nya importer:** Kör minderårigspärr vid *varje* export och blockera release om verifierat underåriga exponeras.
6. **Rättslig bedömning:** För in det valda skyddet för minderåriga i LIA och artikel 14-strategin. En slutlig GDPR-bedömning kan behöva juridisk granskning.

## Slutsats

Teknisk maskering har införts i alla fem system där tillräckliga åldersuppgifter finns. **Påståendet ”samtliga deltagare under 18 år är anonymiserade” går däremot inte att verifiera ännu.** Framför allt behöver datatäckning och indirekt identifiering hanteras innan detta kan sägas vara helt färdigt.
