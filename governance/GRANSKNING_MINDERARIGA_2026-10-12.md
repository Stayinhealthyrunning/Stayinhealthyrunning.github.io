# Loppanalys.se – granskning av minderårigas tävlingsresultat

**Datum:** 2026-10-12  
**Status:** verifierade minderårigas individuella resultatrader tas bort före publik export. Full identifiering av samtliga minderåriga kan inte garanteras när källan saknar säker ålder.

## Principer

- Ålder avser deltagarens ålder vid tävlingen, inte nuvarande ålder.
- Tillförlitlig källålder under 18, eller ett födelseår som gör minderårighet säker, motiverar skydd. Vid födelseår kan ett årtal ensamt vara otillräckligt för att skilja en 17-åring från en 18-åring; osäkra fall ska dokumenteras och granskas.
- En känd, avgränsad åldersklass som endast omfattar personer under 18 kan användas. En öppen blandklass som börjar vid 17 år kan omfatta vuxna; en sådan klass ska inte felaktigt beskrivas som en lista över verifierade minderåriga.
- Namn och personidentitet får inte härledas från namn, klubb, tid, kön eller startnummer för att **gissa ålder**.
- Skydd måste ske *före offentlig export* och omfatta JSON, delningslänkar, sökfunktioner och länkade splits.
- En verifierad minderårigs hela publika resultatrad och länkade identifierare tas bort. Maskering som ”Anonym löpare” används inte för fortsatt detaljerad, återidentifierbar prestation.
- Statistik får bevaras endast på en tillräckligt aggregerad nivå.

## Status per analyssystem

| System | Granskade poster | Verifierade minderåriga | Verifierade vuxna | Osäkra | Okänd ålder |
|---|---:|---:|---:|---:|---:|
| Ultravasan | 24 422 | 0 | 24 295 | 104 | 23 (0,09 %) |
| Gotaleden | 1 467 | 0 | 607 | 0 | 860 (58,62 %) |
| Österlen Spring Trail | 10 470 | 220 | 5 643 | 0 | 4 607 (44,00 %) |
| Sätila Trail | 3 272 | 14 | 3 258 | 0 | 0 |
| GAX100 | 945 | 0 | 0 | 0 | 945 (100 %) |

Den fullständiga maskinläsbara redovisningen finns i `minors-audit-2026-10-12.json` och innehåller inga namn eller deltagar-ID:n. Ultravasans 104 blandklassposter är fortsatt konservativt undanhållna men redovisas inte som bevisade minderåriga.

## Viktiga kvarstående kontroller

1. **Ålderstäckning:** Aggregeringen är genomförd. De redovisade okända och osäkra posterna får inte omklassificeras utan bättre källstöd.
2. **Säkrare ålderskälla:** Fråga arrangören eller tidtagningsleverantören om pålitlig ålders-/födelseårsmarkering där den saknas. Begär minimalt med data, undvik fullständiga födelsedatum om födelseår eller en flagga för under 18 räcker.
3. **Indirekt identifiering:** Full resultatrad och länkade splits tas nu bort för verifierade minderåriga; kontrollera att enbart säkra aggregat återstår.
4. **Hantering av tidigare exponering:** Granska GitHub-historik, gamla publika artefakter, cache, sökmotorer och sparade länkar där det är möjligt. En ny publicering garanterar inte att äldre kopior har försvunnit.
5. **Nya importer:** Kör minderårigspärr vid *varje* export och blockera release om verifierat underåriga exponeras.
6. **Rättslig bedömning:** För in det valda skyddet för minderåriga i LIA och artikel 14-strategin. En slutlig GDPR-bedömning kan behöva juridisk granskning.

## Slutsats

Alla minderåriga som faktiskt kan verifieras i de granskade källorna tas bort från de nya publika exporterna. **Påståendet ”alla deltagare under 18 har identifierats” vore däremot felaktigt** på grund av den redovisade åldersbristen.
