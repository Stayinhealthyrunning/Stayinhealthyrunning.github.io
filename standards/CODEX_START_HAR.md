# Starta ett nytt Loppanalys-verktyg i Codex

**Läs först:** `LOPPANALYS_STANDARD_V1_0.md` (normerande komplett produkt- och acceptanskrav).

Därefter:

1. `STANDARD_DEFAULTS_V1_0.json` – maskinläsbara **låsta standardinställningar**.
2. `HELP_CONTENT_SV_V1_0.json` – författad svensk hjälptext för standardboxarna. Alla poster ska bindas till fungerande `(i)`-kontroller.
3. `NYTT_LOPP_INMATNING.json` – **ej ifylld** eventkonfiguration; fyll med verifierade loppfakta, aldrig med gissningar.
4. Se rapportens **§18.3** för kopierbar Codex-instruktion och **§17** för den testbara leveranschecklistan.

**Viktigt:** Någon färdig central mallkod har inte skapats bara genom dessa dokument. Första uppdraget är att bygga det återanvändbara blockbiblioteket/verktygsskelettet utifrån specifikationen, med dataadaptrar och valideringsgrindar. Rör inte befintliga fyra publicerade system om det inte uttryckligen beställs.

## Detaljer som låsts efter granskningen

- Hero och val av lopp/distans/år först.
- **Fem översiktskort sida vid sida på desktop i EN rad**: Startande, Fullföljde, DNF, Tider kvinnor/män, Snabbaste tid. Både medel/median och män/kvinnor i **samma fjärde kort**.
- Personliga funktioner därefter: Hitta din löpare → Individuell analys → Direktjämförelse 2.0 → Kartduell → Personlig loppplan.
- Allmän fält- och gruppstatistik längre ned, resultatdatabas och metodik nära slutet.
- Alla knappar inkl. `Lägg till jämförelse` ska fungera, liksom URL-delning, Back/Forward, klick och tangentbord.
- Alla analyser med en `(i)`-hjälp från katalogen.
- Ingen fabricerad officiell tids-/GPS-/identitetsdata.

## Särskild anvisning om begrepp

Projektägaren har efterfrågat både **median** och **medeltid** vid olika tillfällen. Standarden gör därför tolkningen entydig: kortet `Tider kvinnor/män` innehåller **både median och aritmetiskt medel separat etiketterat för respektive grupp**, i ett enda kort. Eventuellt beslut om att reducera innehållet måste göras explicit i ett senare revisionsbeslut.

## Referensrepon

- `Stayinhealthyrunning/ultravasan-analys`
- `Stayinhealthyrunning/gotaleden-splits`
- `Stayinhealthyrunning/osterlen-spring-trail-analys`
- `Stayinhealthyrunning/satila-splits`
