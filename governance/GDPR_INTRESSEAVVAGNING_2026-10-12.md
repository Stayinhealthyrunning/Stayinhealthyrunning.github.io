# Loppanalys.se – intresseavvägning enligt GDPR artikel 6.1 f

**Version:** 2026-10-12 · **Status:** Dokumenterad preliminär bedömning; kräver verksamhetsansvarigs granskning och genomförda kontrollåtgärder.  
**Personuppgiftsansvarig enligt publicerad integritetstext:** Stefan Bengtsson, via Loppanalys.se.  
**Kontakt:** stefan.stebe3@gmail.com  
**Omfattning:** Loppanalys.se, Ultravasan Analys, Gotaleden Stafett och Ultra, Österlen Spring Trail Analys, Sätila Trail Analys samt GAX100:s publicerade testversion.

> Detta är en dokumentation för att understödja ansvarsskyldigheten enligt artikel 5.2 GDPR, inte ett beslut från IMY eller en garanti för att alla publicerade uppgifter får behandlas. Separata åtgärder anges nedan innan bedömningen kan betraktas som slutligt godkänd.

## 1. Identifierade behandlingsaktiviteter

| Behandling | Exempel på uppgifter | Avsikt och räckvidd |
|---|---|---|
| Tävlingsresultat per upplaga | Namn, klubb, klass, kön/åldersklass, placering, sluttid, status, mellantider, startnummer när relevant | Söka tävlingsresultat och analysera loppets genomförande |
| Individuell loppanalys | Ovanstående samt härledd segmentfart, relativa placeringar och diagram | Visa hur ett uppmätt lopp utvecklades |
| Jämförelse och historik | Resultatrader från olika upplagor, eventuella identitetskopplingar | Jämföra deltagarresultat; automatiska personkopplingar kräver särskild kvalitets- och integritetsgranskning |
| Bana/kartfunktioner | Bana, höjdprofil, verifierade kontrollpunkter och i vissa system uppskattad rörelse mellan tidpunkter | Geografisk analys med tydlig uppdelning på faktisk observation, banunderlag och rekonstruktion |
| Webbdrift och besöksstatistik | Tekniska förbindelseuppgifter som kan behandlas av webbhotell, nätoperatörer och trafikstatistikleverantör | Leverera webbplatsen och övergripande teknisk statistik |
| Hantering av invändningar | Kontaktinformation, meddelande, verifierade resultatreferenser, suppressionsnycklar | Pröva registrerades rättigheter och motverka återpublicering |

Uppgifterna hämtas normalt från arrangörer och tidtagningsföretag, inte från deltagarna själva (artikel 14). Publika deltagaruppgifter är fortfarande personuppgifter. Uppgift om kön/åldersklass i tävlingsresultat behandlas med dataminimering; inget kön får härledas från namn. GPX med **verklig persons positionshistoria**, hälsouppgifter, kontaktuppgifter eller detaljerade externa deltagarprofiler ryms inte automatiskt i denna bedömning. Särskilda kategorier av personuppgifter enligt artikel 9 behandlas inte som en del av standardändamålet och skulle kräva en separat rättslig analys.

## 2. Steg 1 – berättigat intresse

Det konkreta intresset är att möjliggöra historisk idrottsstatistik, verifierbara jämförelser, återanvändbar metodik och individuell förståelse av ett genomfört löplopp. Besökare och deltagare kan ha ett intresse av att hitta sin prestation och jämföra den mot fältets faktiska tider. Verksamhetens kommersiella eller ideella karaktär är inte ensam avgörande för om intresset är berättigat.

**Preliminär bedömning:** Intresset kan vara lagenligt, faktiskt och tillräckligt specificerat, förutsatt att varje databehandling begränsas till dessa ändamål.

## 3. Steg 2 – nödvändighet och mindre ingripande alternativ

* För aggregerade mått (antal, medel, fördelningar, percentiler) är identifierbara namn **inte nödvändiga**; aggregering bör användas där möjligt.
* För namnsökning, en historisk resultatrad eller användarvald individuell analys kan offentliggjort deltagarnamn behövas för att hitta rätt prestation. Startnummer/klubb visas bara där det fyller en faktisk funktion.
* Jämförelser mellan olika personer eller år får inte kräva omfattande dold identifiering. Automatisk sammanlänkning över år ska vara begränsad, verifierad och särskilt prövad.
* Rekonstruktion från mellantider ska märkas som uppskattad och inte användas som om GPS-positionen observerats.
* Det finns inget generellt behov av personnummer, adress, personliga kontaktuppgifter, hälsouppgifter eller detaljerade rörelseloggar från trackerplattformar.
* Historiska originalresultat kan ligga kvar hos arrangören även när Loppanalys begränsar sin egen publicering. Det är inte ett skäl att behålla fler identifierare än nödvändigt.

**Preliminär bedömning:** Nödvändighet kan motiveras för ett begränsat urval av offentliga tävlingsfält i sökbar resultatpresentation. Den kan inte schablonmässigt motivera samtliga möjliga profil-, tracking- och publiceringsfunktioner.

## 4. Steg 3 – avvägning mot deltagarnas rättigheter

**Faktorer som kan tala för behandlingen:**
- Ursprungliga resultat har publicerats inom ramen för tävling och är av idrottslig karaktär.
- Den publika analysen avser prestationer, inte privata kontakter, levnadsvanor, sjukdom eller reklamprofilering.
- Användaren kan ha rimlig anledning att vänta sig offentlig redovisning av tävlingsresultat.
- Rättelse, invändning och begränsning kan göras praktiskt tillgängliga.

**Faktorer som ökar integritetsintrånget:**
- En fristående webbplats med andra sök- och jämförelsefunktioner än arrangörens ursprungliga lista kan överraska deltagare.
- Historiska, omfattande personprofiler och sammanlänkning över år kan få större effekt än en enskild resultatlista.
- En ensam löpares exakta tid, placering och mellantider kan avslöja identitet efter att namn tagits bort.
- Tävlingsdata kan omfatta minderåriga eller känsliga omständigheter i enskilda fall.
- Lång offentlig exponering, sökmotorindexering, kopiering och skärmdelning kan öka skadan.
- Uppgifter från GPS-tracking kan visa rörelsemönster på individnivå och kräver en separat prövning.

**Skyddsåtgärder – verifierad/återstående status 2026-10-12:**
- [x] En central integritetssida och kontaktväg finns.
- [x] Namnbaserad publiceringsspärr finns i konfiguration för Ultravasan, Gotaleden, ÖST och Sätila; full täckning av varje byggväg behöver kontrolleras.
- [x] Källproveniens och markering av rekonstruktion/osäkerhet finns i analyssystemen.
- [ ] Säkerställ en **gemensam suppressionsspärr före varje publik export**, även GAX100 och framtida lopp. GAX100 saknar ännu verifierad integrering.
- [ ] Verifiera att namn, klubb, startnummer, delningsadresser, sökindex och exporter inte återidentifierar suppressionsfall.
- [ ] Dokumentera hantering av artikel 14-information vid indirekt inhämtning; publicerad webbpolicy är inte automatiskt tillräcklig för individuella informationskrav. Undantag i artikel 14.5 kräver separat motivering och lämpliga skyddsåtgärder.
- [ ] Inventera leverantörer/biträden, eventuella tredjelandsöverföringar, loggar och faktiska lagringstider (bland annat GitHub Pages, Cloudflare och inbäddade karttjänster).
- [ ] Bedöm särskilt minderårigas uppgifter, historisk profilering över många år och eventuella riktiga individuella GPS-spår innan nya funktioner publiceras.
- [ ] Fastställ en faktisk periodisk gallringsprövning och incident-/begärandeprocess.

**Samlad preliminär avvägning:** Begränsad offentlig redovisning och analys av vanliga tävlingsresultat **kan** stödjas av artikel 6.1 f efter uppgiftsminimering, informationsåtgärder och effektiv hantering av registrerades rättigheter. Bedömningen **kan inte** utan vidare utsträckas till personkopplad trackerhistorik, särskilda personkategorier, minderårigas data eller alla framtida funktioner. Kvarvarande punkter betyder att ingen generell GDPR-compliance ska utlovas.

## 5. Rättigheter, lagring och ansvar

Den registrerade ska erbjudas tillgång, rättelse, radering där villkoren gäller, begränsning, och särskilt **invändning enligt artikel 21**. Om behandlingen stödjs på berättigat intresse måste den personuppgiftsansvarige efter en giltig invändning kunna visa avgörande berättigade skäl för att få fortsätta, eller annan tillämplig rättslig grund enligt artikeln. Beslut får inte automatiseras till avslag.

Begäranden hanteras normalt senast inom en månad med möjlighet till motiverad förlängning enligt artikel 12.3; verifiera identitet med **minsta nödvändiga uppgifter**. Vid begärd identitetsspärr gäller den även vid senare importer; prestationsdata som fortfarande kan länkas till personen kan fortfarande utgöra personuppgifter.

Historik får endast sparas så länge syftet motiverar det. Definiera och dokumentera en återkommande gallrings- och behovsgranskning; skyddade suppressionsnycklar kan behöva behållas begränsat för att motverka återpublicering. Specificerade lagringstider och driftleverantörernas retention återstår att verifiera.

## 6. Artikel 14, teknikleverantörer och källrättigheter

Publicering av en integritetspolicy ersätter **inte automatiskt** informationsskyldigheten när data kommer från tredje man. Bedöm tidpunkt, sätt för information, om kompletterande individuell information behövs och om ett särskilt undantag enligt artikel 14.5 är rättsligt tillämpligt. Dokumentera motiven per behandlingskategori.

Webbplatsen använder enligt källkoden GitHub Pages och på huvuddomänen Cloudflare Web Analytics. Kart- och mediainbäddningar från externa leverantörer kan innebära utlämnande av teknisk besöksinformation. Dessa leverantörer, deras roller och möjliga överföringar behöver dokumenteras på korrekt leverantörsnivå.

En tillåten GDPR-behandling medför inte automatiskt att externa GPX, bilder eller resultatdatabaser får återpubliceras enligt upphovs- och databasrätt. Gör separat kontroll.

## 7. Beslut och uppföljning

**Bedömning upprättad 2026-10-12:** preliminärt stöd för snävt avgränsad tävlingsresultat- och statistikbehandling. **Inte slutgiltigt godkänd.**

Före slutligt fastställande: verifiera ovanstående öppna kontrollpunkter, bedöm artikel 14-frågan, verifiera identifieringsspärr i nya lopp, gör en granskning av den publika dataexporten och dokumentera verksamhetsansvarigs ställningstagande/datum. Uppdatera bedömningen vid nytt lopp, nya datatyper, extern GPS-spårning eller väsentligt utökad flerårsprofilering.

## Rättsliga källor

- [GDPR, särskilt artiklarna 5, 6.1 f, 12–14, 17–18, 21, 30 och 32 (EUR-Lex)](https://eur-lex.europa.eu/legal-content/SV/TXT/?uri=CELEX%3A32016R0679)
- [IMY – Intresseavvägning som rättslig grund](https://www.imy.se/verksamhet/dataskydd/det-har-galler-enligt-gdpr/rattslig-grund/intresseavvagning/)
- [IMY – De registrerades rättigheter](https://www.imy.se/verksamhet/dataskydd/det-har-galler-enligt-gdpr/de-registrerades-rattigheter/)
- [EDPB – Guidelines 1/2024, processing based on Article 6.1 f (samrådsversion)](https://www.edpb.europa.eu/public-consultations/guidelines-12024-on-processing-of-personal-data-based-on-article-61f-gdpr_en)
