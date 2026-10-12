# Drift av privat GDPR-spärrregister

**Version:** 2026-10-12
**Klassning:** administrativ säkerhetsrutin. Det verkliga registret och rättighetsärendena ska ligga utanför publika Git-repositoryn.

## Register och minimering

- Registret använder schema 2 och innehåller endast intern ärendereferens, SHA-256 av ett NFKC-normaliserat namn, åtgärd, giltighetstid och manuellt godkända lopp-/resultat-ID:n.
- Klartextnamn, e-postadress, födelsedatum och ärendebevis får inte lagras i registret. De hör hemma i ett separat åtkomstskyddat ärendesystem med egen gallring.
- Ett namn är bara en söknyckel. Varje ny träff måste knytas till ett specifikt källresultat efter manuell kontroll. Systemet stoppar export vid en icke godkänd träff.

## Operatörsflöde

1. Registrera och verifiera begäran enligt `GDPR_RATTIGHETSRUTIN.md`.
2. Kör `tools/gdpr_registry_admin.py register` med ärende och register på en plats utanför repositoryt. Ange åtgärd: `restrict_identifiers`, `remove_result` eller `temporary_restriction`.
3. Lägg till endast verifierade `scope` och tekniska käll-ID:n under `approved_matches`. Godkänn inte alla framtida namnlika träffar.
4. Kör `tools/gdpr_registry_admin.py verify`.
5. Kör `encode-secret` till en fil utanför repositoryt. Kopiera filens innehåll till GitHub Actions-hemligheten `LOPPANALYS_PRIVACY_REGISTRY_B64`; lägg aldrig värdet i shellhistorik, logg eller Git.
6. Kör workflow `Privacy registry preflight` i varje berört repo. Det ska både läsa hemligheten och köra kontraktstesterna.
7. Aktivera eller mergea produktionsflöden först när preflight och ordinarie QA är gröna. Vid saknad eller ogiltig hemlighet ska publicering förbli stoppad.
8. Efter export, kör browserdatarevisionen och kontrollera den publicerade sajten. Logga verkställighetsdatum utan att lägga personen i publika artefakter.

## Rotation, backup och incident

- Begränsa GitHub-hemligheten och registerbackupen till de personer som behöver dem. Rotera hemligheten när behörighet ändras eller exponering misstänks.
- Förvara krypterad backup separat och prova återläsning minst årligen.
- Om ett skyddat resultat återpubliceras: stoppa deployment, avpublicera eller ersätt artefakten, kontrollera Actions-artefakter och cache, dokumentera incidenten och bedöm underrättelse enligt artiklarna 33–34.
- Revidera godkända matchningar och tillfälliga spärrars slutdatum minst årligen; behåll en permanent återpubliceringsspärr endast så länge den behövs för att uppfylla beslutet.
