# Loppanalys Standard 1.0 – obligatorisk referens för nya lopp

**Normerande kravspecifikation:** [LOPPANALYS_STANDARD_V1_0.md](LOPPANALYS_STANDARD_V1_0.md) · version 1.0.0 · 2026-10-08.

Detta är standarden vi hänvisar till varje gång ett nytt loppanalysverktyg ska utvecklas för Loppanalys.se. Den gäller nya system och återanvändbara block, **inte** som krav på att bygga om Ultravasan, Gotaleden, Österlen Spring Trail eller Sätila Trail.

## Codex – läsordning

1. [CODEX_START_HAR.md](CODEX_START_HAR.md) – startinstruktion och principer.
2. **[LOPPANALYS_STANDARD_V1_0.md](LOPPANALYS_STANDARD_V1_0.md)** – fullständiga bindande UI-, analys-, metod- och acceptanskrav. Texten styr vid konflikt med en tidigare bild.
3. [STANDARD_DEFAULTS_V1_0.json](STANDARD_DEFAULTS_V1_0.json) – standardvärden och standardbeteende.
4. [HELP_CONTENT_SV_V1_0.json](HELP_CONTENT_SV_V1_0.json) – svensk metodhjälp för statistikrutor och (i)-knappar.
5. [NYTT_LOPP_INMATNING.json](NYTT_LOPP_INMATNING.json) och [EVENT_CONFIG_SCHEMA_V1_0.json](EVENT_CONFIG_SCHEMA_V1_0.json) – tom inmatningsmall och schema.

## Fast sidordning

1. Herobild, lopp, distans och år.
2. **Fem faktakort i EN desktoprad**: Startande, Fullföljde, DNF, Tider kvinnor/män (både median och medel i samma kort), Snabbaste tid.
3. Hitta din löpare.
4. Individuell analys.
5. Direktjämförelse 2.0.
6. Kartduell och flerårsjämförelse där data medger det.
7. Personlig loppplan.
8. Sluttidsfördelning och percentiler.
9. Fördjupade analyser, klubbar, klasser, kön, delsträckor och historik.
10. Bana, resultatdatabas, källor och metodik.

Knappar som **Lägg till jämförelse**, välj/ta bort, replay, delning och interaktiva diagram måste fungera. Saknade källvärden får aldrig hittas på. Specifikationen är en **kravbaslinje**, inte ännu en färdig gemensam kodbas.

Standarden uppdateras genom en granskad pull request med dokumenterad ändring och versionshantering.
