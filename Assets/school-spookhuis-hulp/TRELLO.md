# TRELLO.md – kopie van het Trello-bord

Momentopname van https://trello.com/b/AK7eTg6w/spookhuis-p2 (stand 13 nov 2026). Het bord zelf blijft leidend; verandert het, pas dit bestand dan aan (of laat een teamlid het aanpassen).

**Voor Claude Code:** Claude Code kan Trello niet lezen of aanpassen. Gebruik dit bestand als lijst van kaarten. Verwijs na elke taak naar de kaart-ID en de kaartnaam (bijvoorbeeld `S08 [M] GhostTrap`) in het blok `Trello` uit `CLAUDE.md`. Een teamlid zet de kaart daarna op Klaar.

**Tags:** [M] Must, [S] Should, [C] Could. **Vinkje:** `[ ]` open, `[x]` klaar (alleen door een teamlid na testen op de Quest). De kaart-ID's (A, U, V, S, T, D) zijn alleen voor dit bestand; ze staan niet op Trello.

**Klaar-criterium voor elke kaart:** de fase-criteria in `PROJECT_PLAN.md`, getest op de Quest 3, geen placeholder meer als het de laatste fase is. Zie ook de regels in `CLAUDE.md`.

**Niet door Claude Code te bouwen:** Giechel is voor Daniël: kaart `S14 Puzzle Giechel`, met de scripts `LightSwitch` en `GiechelPuzzle`. VFX-kaarten zijn voor Viktor; Claude Code raakt de VFX-assets niet aan. Art- en geluidskaarten zijn voor de artists; Claude Code gebruikt placeholders.


## Assets (artist)

- [ ] **A01** [M] Moodboard (PureRef) afmaken en exporteren
- [ ] **A02** [M] Kleurenpalet per kamer + gedeeld palet vastleggen
- [ ] **A03** [M] Materiaalset: flat colour + lichte normal maps
- [ ] **A04** [M] Woonkamer: modulaire set (muren, vloer, plafond, kozijn)
- [ ] **A05** [M] Woonkamer: bank
- [ ] **A06** [M] Woonkamer: fauteuil
- [ ] **A07** [M] Woonkamer: salontafel
- [ ] **A08** [M] Woonkamer: tv-kast
- [ ] **A09** [M] Woonkamer: boekenkast
- [ ] **A10** [M] Woonkamer: staande lamp (lichtknop-interactie voor Giechel)
- [ ] **A12** [M] Woonkamer: kast met lade (Boe-puzzel)
- [ ] **A13** [M] Woonkamer: speelgoedbeer (Boe-puzzel)
- [ ] **A14** [M] Woonkamer: gordijnen + raam
- [ ] **A15** [S] Woonkamer: kleine decor-props (kussens, boeken, plant)
- [ ] **A16** [M] Slaapkamer: modulaire set (muren, vloer, plafond, kozijn)
- [ ] **A17** [M] Slaapkamer: bed met laken (Laken-puzzel)
- [ ] **A18** [M] Slaapkamer: nachtkastje + lampje
- [ ] **A19** [M] Slaapkamer: kledingkast
- [ ] **A11** [M] Slaapkamer: radio (Fluisteraar-puzzel)
- [ ] **A20** [S] Slaapkamer: kleine decor-props
- [ ] **A21** [M] Gang: kleine hub-set met 3 deurkozijnen (US-32)
- [ ] **A22** [M] Pikzwarte deur (model + kozijn, US-16)
- [ ] **A23** [M] Spook Boe: model + textures
- [ ] **A24** [M] Spook Giechel: model + textures
- [ ] **A25** [M] Spook Laken: model + textures
- [ ] **A26** [M] Spook Fluisteraar: model + textures
- [ ] **A27** [M] Spook-animaties (idle, lokken, vluchten, gezogen worden)
- [ ] **A28** [M] Zaklamp: model + textures
- [ ] **A29** [M] Spookval (lantaarn/pot): model + textures + open/dicht-animatie (US-31)
- [ ] **A30** [M] Riem met houders voor zaklamp en spookval (US-30)
- [ ] **A31** [M] Horloge (linkerpols): model + textures
- [ ] **A32** [C] Zolder: modulaire set
- [ ] **A33** [C] Zolder: props (koffer, oude spiegel, kist)
- [ ] **A34** [C] Spook Rommelaar: model + textures + animaties
- [ ] **A35** [C] Spook De Bewoner: model + textures + animaties
- [ ] **A36** [C] Rommelaar-puzzel: vaas
- [ ] **A37** [C] De Bewoner-puzzel: familiefoto + kaars
- [ ] **A38** [M] SFX: fluisteren, giechelen, ritselen, radio-ruis (ruimtelijk)
- [ ] **A39** [M] SFX: Gevangen!-geluid + zuig-geluid
- [ ] **A40** [M] SFX: deur ontgrendelen + deur-opening
- [ ] **A41** [S] SFX: voetstappen, kraken, ambient per kamer
- [ ] **A42** [S] Muziek: rustige spannende ambient-loop
- [ ] **A43** [M] Fonts instellen (Cinzel koppen, Nunito tekst)

## UI (artist maakt de art, technicus bouwt het in)

- [ ] **U01** [UI] [M] Startmenu (Start, Instellingen, Stoppen)
- [ ] **U02** [UI] [M] Pauzemenu
- [ ] **U03** [UI] [M] Comfort-instellingen (teleport/smooth, snap turn, vignette)
- [ ] **U04** [UI] [M] Eindscherm (4/4 en 2/4 gevangen)
- [ ] **U05** [UI] [M] Horloge-UI: spook-iconen, "x / y gevangen", "Kamer x van y"
- [ ] **U06** [UI] [M] Moed-meter op de zaklamp
- [ ] **U07** [UI] [M] Gedachtebel (hint met het object van de puzzel)
- [ ] **U08** [UI] [M] "Gevangen!"-bericht
- [ ] **U09** [UI] [S] Slot-icoon / lichtje op pikzwarte deur (op slot / open)
- [ ] **U10** [UI] [M] Spook-iconen (4 stuks, gevangen/niet gevangen)
- [ ] **U11** [UI] [S] Knop- en paneelstijl (donker, rustig, joke-horror)
- [ ] **U12** [UI] [S] Laadscherm tussen ruimtes
- [ ] **U13** [UI] [C] Tutorial-hints bij de eerste keer pakken van zaklamp en val

## VFX (Viktor)

- [ ] **V01** [VFX] [M] Zaklamp-bundel (kegel, 25°)
- [ ] **V02** [VFX] [M] Zuig-effect: spook wordt in de spookval getrokken
- [ ] **V03** [VFX] [M] Gevangen!-flits/sparkle
- [ ] **V04** [VFX] [M] Spook verschijnen/verdwijnen
- [ ] **V05** [VFX] [M] Pikzwarte deur (shader die alles opslokt)
- [ ] **V06** [VFX] [M] Deur ontgrendelen (glow/pulse)
- [ ] **V07** [VFX] [S] Moed-meter pulse als hij bijna leeg is
- [ ] **V08** [VFX] [S] Stofdeeltjes in de zaklampbundel
- [ ] **V09** [VFX] [S] Flikkerlicht in de kamers
- [ ] **V10** [VFX] [S] Giechel: lamp-aan-effect
- [ ] **V11** [VFX] [C] Spook-reactie op zaklamp (schrikken/kleuren)
- [ ] **V12** [VFX] [C] Extra sfeer-VFX (mist, bewegende schaduwen)
- [ ] **V13** [VFX] [C] Zolder: stof en spinnenwebben

## Scripts (technici)

- [ ] **S01** [M] GameManager (gameloop: Luister, Zoek, Lok, Vang)
- [ ] **S02** [M] Ruimtelijk geluid (spook-geluidsbron, afstand/richting)
- [ ] **S03** [M] FearMeter (moed-meter, ca. 50 sec, +15% per vangst)
- [ ] **S04** [M] Flashlight (bundel, raycast/cone-detectie op spook)
- [ ] **S05** [M] Ghost (basis + state machine: Verstopt, Gelokt, In bundel, Gevangen, Vluchten)
- [ ] **S06** [M] Ghost AI: vluchten (2,5 m/s), terugkeren naar HidingSpot
- [ ] **S07** [M] HidingSpot (spook verstopt en verschijnt)
- [ ] **S08** [M] GhostTrap (spookval: open, 2 sec bundel + val, zuigen, teller +1) (US-31)
- [ ] **S09** [M] Gevangen!-bericht + teller in horloge
- [ ] **S10** [M] Belt (riem: zaklamp en val vastpakken, terugsteken, terug naar riem bij droppen) (US-30)
- [ ] **S11** [M] Interactable / grab-systeem voor props
- [ ] **S12** [M] Puzzle (basisklasse, max 2 stappen, zelfde kamer)
- [ ] **S13** [M] Puzzle Boe (speelgoedbeer uit lade)
- [ ] **S14** [M] Puzzle Giechel (licht aan)
- [ ] **S15** [M] Puzzle Laken (laken afhalen)
- [ ] **S16** [M] Puzzle Fluisteraar (radio uitzetten)
- [ ] **S17** [M] Geefzone (object aan spook geven)
- [ ] **S18** [M] Hint: spook roept harder na 60 sec (US-21)
- [ ] **S19** [M] Gedachtebel-controller
- [ ] **S20** [M] Door (slot/ontgrendelen als alle spoken in de kamer gevangen zijn, laden bij doorlopen/teleporteren/klikken) (US-16)
- [ ] **S21** [M] Room / RoomManager (kamer-voortgang, spoken tellen)
- [ ] **S22** [M] Ruimte laden/ontladen (woonkamer, slaapkamer, gang)
- [ ] **S23** [S] Gang als hub (US-32)
- [ ] **S24** [M] HapticsManager (horloge links, trilt bij nabijheid; vang-feedback beide controllers)
- [ ] **S25** [M] Player-locomotion: teleport, snap turn, vignette
- [ ] **S26** [M] Comfort-instellingen opslaan en toepassen
- [ ] **S27** [M] Menu's koppelen (start, pauze, einde)
- [ ] **S28** [M] Eindscherm-logica (2/4 of 4/4)
- [ ] **S29** [M] Quest 3-build + performance-test (72 fps)
- [ ] **S30** [C] Moeilijkheids-instellingen (US-15)
- [ ] **S31** [C] Puzzle Rommelaar (vaas terugzetten)
- [ ] **S32** [C] Puzzle De Bewoner (foto + kaars)
- [ ] **S33** [C] Zolder-kamer logica + zolderdeur
- [ ] **S34** [C] Zaklamp-reacties per spooktype

## Testscenes (nieuw, prioriteit Should; zie `TEST_SCENES.md`)

- [ ] **T00** [S] Testhub (paneel per scene, knop naar elke test)
- [ ] **T01** [S] Testscene Locomotion (teleport, snap turn, vignet)
- [ ] **T02** [S] Testscene Voorwerpen pakken en gooien (5+ soorten)
- [ ] **T03** [S] Testscene Sockets (riem-holsters, geefzone)
- [ ] **T04** [S] Testscene Geluid en haptiek
- [ ] **T05** [S] Testscene Activation events (zaklamp, spookval)
- [ ] **T06** [S] Testscene Near-Far en Ray (deur, lade, knop)
- [ ] **T07** [S] Testscene UI in de wereld (menu, horloge, gedachtebel)
- [ ] **T08** [S] Testscene Comfort
- [ ] **T09** [S] Testscene Prestaties en licht (fps-teller)
- [ ] **T10** [S] Testscene Bouwen en delen (APK)
- [ ] **T11** [S] Testscene Spookval als eigen interactable
- [ ] **T12** [S] Testscene Deur met slot
- [ ] **T13** [S] Testscene Mini-puzzel (3 puzzeltypes)
- [ ] **T99** [S] InfoPanel prefab (titel, pathway-les, uitleg, "In de game")

## Ontwerp (ontwerpers en team, niet voor Claude Code)

Voorstel; staat misschien nog niet (helemaal) op Trello. Maak er een lijst `Ontwerp` van als jullie dat willen. Claude Code bouwt hier niets van.

- [ ] **D01** [M] Puzzels per spook uitwerken (Boe, Giechel, Laken, Fluisteraar): stappen, voorwerp, plek, plaatje voor de gedachtebel
- [ ] **D02** [M] Plattegrond woonkamer, slaapkamer en gang (plek van spoken, verstopplekken en props)
- [ ] **D03** [M] Soundscape per kamer uitwerken: roep per spook, ambient, SFX-lijst (basis voor de audiokaarten)
- [ ] **D04** [M] Startwaarden in `GameSettings` met het team afstemmen en na playtests bijstellen (meter, vangtijd, hint)
- [ ] **D05** [M] Playtest-plan schrijven (wie, wanneer, welke vragen, formulier)
- [ ] **D06** [M] Prototype-playtest met 2 mensen buiten het team + verbeterpunten verzamelen
- [ ] **D07** [M] Vertical-slice-playtest met 3 mensen buiten het team + verbeterpunten verzamelen
- [ ] **D08** [M] Eind-playtest met 4 mensen buiten het team + verbeterpunten verzamelen
- [ ] **D09** [M] Pathway missie 1 en 2 afronden (vr 13 nov) en missie 3 (voorstel vóór wo 16 dec)
- [ ] **D10** [M] Flows en moodboard als afbeelding op de schoolsite zetten; rollen en leerdoelen invullen; Projectdocument vaststellen
- [ ] **D11** [S] Tutorial-flow: wat leert de speler in welke volgorde
- [ ] **D12** [S] Eindscherm en beloning (tekst en spook-iconen) uitwerken

## Opmerkingen

- **Aangepast in dit bestand (zet het ook op Trello):** A11 (radio) hoort bij de slaapkamer, want daar woont Fluisteraar; S30 (moeilijkheidsgraden, US-15) en V11 (spook-reacties) zijn Could, zoals in `GAME_DESIGN.md`; de twee Ontwerp-lijsten zijn samengevoegd tot D01–D12.
- De lijst Ontwerp is nieuw voorgesteld en staat misschien nog niet op Trello; pas de kaarten naar wens aan.
- De US-nummers in de kaartnamen komen van de oude nummering. Het Projectdocument op de schoolsite (US-01 t/m US-43) geldt; zie de notitie op Trello.
