# Testscenes: elke VR-techniek apart uitgelegd

Voor het hele team. Elke techniek uit het Unity VR-pathway krijgt een **kleine testscene**: één techniek, een paar objecten, een paneel met uitleg en een regel over hoe het in de echte game terugkomt. Zo kun je eerst zien en voelen hoe iets werkt, zonder de hele game ernaast.

**Dit vervangt de lessen niet.** De lessen, challenges en labs van het pathway (quizzen tellen niet, missie 4 is optioneel) blijven werk van de studenten zelf (zie `PROJECT_PLAN.md`). De testscenes zijn onze eigen voorbeelden in ons project, om mee te oefenen en bij terug te kijken. Vraag aan de docent of dat zo mag.

## Regels voor alle testscenes

- Map: `Assets/_Project/Scenes/Test/`. Naam: `T01_Locomotion`, `T02_Grabbables` enzovoort, plus een scene `T00_Testhub`.
- **Zelfde scripts als de game.** Een testscene gebruikt `Flashlight`, `GhostTrap`, `Door`, enzovoort uit `Scripts/`, geen kopieën. Verandert een script, dan veranderen de testscenes mee en blijven ze kloppen.
- Alleen kubussen, capsules en eenvoudige materialen. Geen echte art nodig.
- Elke scene heeft een **InfoPanel** (world-space prefab, aan de muur): titel, pathway-les, 3 tot 5 korte regels uitleg, en een regel "In de game: ...". Tekst in het Nederlands, simpel.
- Elke scene heeft een **Terug naar hub**-knop (ray-klik of een deur), zodat je zonder bril af te zetten door de tests kunt.
- Testscenes staan **niet** in de Build Settings van de releasebuild (APK). Maak een apart build profile "Test" waarin ze wel zitten.
- Elke scene moet draaien op de Quest 3 op 72 fps.

## T00 – Testhub

Een kleine ruimte met een paneel per testscene (titel, pathway-les, korte omschrijving) en een knop of deur ernaartoe. Laat ook zien welke scenes af zijn.
**In de game:** hetzelfde patroon als de gang met deuren naar de kamers.

## Missie 1 – VR Basics

### T01 – Locomotion (les 1.2)
- **Staat erin:** een vloer met een paar blokken als referentie, teleport-gebieden en een gekleurde muur.
- **Probeer:** teleporteren, snap turn, en (als optie) vloeiend lopen met en zonder vignet.
- **Uitleg:** teleport is de standaard omdat het misselijkheid voorkomt; snap turn draait in stappen; het vignet verkleint het beeld tijdens bewegen. (Vloeiend lopen en het vignet zitten niet in les 1.2: het vignet is de Tunneling Vignette uit de XRI Starter Assets.)
- **In de game:** `Player` met teleport als standaard; instellingen in het startmenu (comfort-instellingen).
- **Klaar als:** alle drie de bewegingen werken en een schakelaar zet vloeiend lopen aan of uit.

### T02 – Voorwerpen pakken en gooien (les 1.3)
- **Staat erin:** een tafel met minstens 5 soorten voorwerpen (boek, vaas, kopje, fles, speelgoedbeer) met physics.
- **Probeer:** pakken, vasthouden, loslaten, gooien, tegen elkaar laten botsen.
- **Uitleg:** een voorwerp is pakbaar met de XR Grab Interactable; de physics bepaalt hoe het valt; een voorwerp dat van de kaart valt moet terugkomen.
- **In de game:** puzzelprops (speelgoedbeer, vaas, laken); een weggegooid voorwerp komt terug op zijn plek.
- **Klaar als:** 5+ soorten werken en een vallend voorwerp keert terug naar zijn beginplek.

### T03 – Sockets (les 1.4)
- **Staat erin:** een riem-poppetje (of tafel) met twee holsters en een ronde zone op de grond.
- **Probeer:** een voorwerp in een holster steken en eruit pakken; een voorwerp in de zone laten vallen.
- **Uitleg:** een Socket Interactor houdt een voorwerp vast op een vaste plek; een ander voorwerp past er niet in.
- **In de game:** de riem (zaklamp en spookval) en de geefzone bij een spook.
- **Klaar als:** zaklamp-blok en val-blok passen alleen in hun eigen holster; de zone herkent een voorwerp.

## Missie 2 – Events and Interactions

### T04 – Geluid en haptiek (les 2.1)
- **Staat erin:** drie geluidsbronnen op verschillende plekken, een voorwerp dat trilt als je het pakt, een zone die trilt naarmate je dichterbij komt.
- **Probeer:** je ogen dicht en de bron zoeken; voel de trilling sterker worden.
- **Uitleg:** spatial audio geeft richting en afstand; haptiek geeft feedback in je hand; alle trillingen lopen via één `HapticsManager`.
- **In de game:** spoken die geluid maken; horloge (linker controller) dat trilt als een spook dichtbij is; trilling bij vangen.
- **Klaar als:** de bron is te lokaliseren en de trilling hangt af van de afstand.

### T05 – Activation events (les 2.2)
- **Staat erin:** een zaklamp-blok en een lichtbundel-kegel; een voorwerp dat je op afstand aan/uit zet.
- **Probeer:** de zaklamp pakken en de trekker in- en loslaten; een voorwerp op afstand activeren.
- **Uitleg:** een activation event is een knopdruk terwijl je iets vasthoudt (lamp aan, zuigen); het kan ook op afstand.
- **In de game:** zaklamp aan/uit en bundel; de spookval opent of sluit; radio of schakelaar aan/uit.
- **Klaar als:** de bundel gaat aan en uit met de trekker en een voorwerp reageert op een activatie.

### T06 – Near-Far en Ray interactors (les 2.3)
- **Staat erin:** een deur, een lade en een knop op verschillende afstanden.
- **Probeer:** dichtbij met de hand, op afstand met de ray; wisselen tussen de twee.
- **Uitleg:** Near-Far pakt wat dichtbij is met je hand en wat ver weg is met een straal; Ray wijst en klikt.
- **In de game:** lades en deuren openen, klikken op de zwarte deur, menu's bedienen.
- **Klaar als:** de lade opent met de hand en de deur reageert op een ray-klik.

### T07 – Gebruikersinterface in de wereld (les 2.4)
- **Staat erin:** een paneel met drie knoppen, een horloge-prefab aan de linkerpols en een gedachtebel boven een blok.
- **Probeer:** knoppen bedienen met de ray; het horloge lezen; het plaatje in de bel zien.
- **Uitleg:** UI hangt als paneel in de wereld en beweegt niet mee met je hoofd; plaatjes zijn beter dan tekst.
- **In de game:** startmenu, pauzemenu, horloge, gedachtebel, "Gevangen!".
- **Klaar als:** knoppen werken en de bel toont een plaatje.

## Missie 3 – Ergonomics and Optimization

### T08 – Comfort (les 3.1)
- **Staat erin:** een kamer die je zittend en staand kunt gebruiken, schakelaars voor vignet en bewegingstype, een volumebalk.
- **Probeer:** zittend/staand wisselen, vignet aan/uit, een harde geluidspiek testen (hoort er niet te zijn).
- **Uitleg:** comfort is een eis, geen bijzaak: geen gedwongen camerabeweging, een volumeplafond, instelbare beweging. (Les 3.1 doet de fade en een instellingenpaneel; zittend/staand, het vignet en de volumebalk voegen we zelf toe.)
- **In de game:** comfort-instellingen, geen jumpscares, zittend en staand speelbaar.
- **Klaar als:** alle schakelaars werken en het volume blijft onder het plafond.

### T09 – Prestaties en licht (lessen 3.2 en 3.3)
- **Staat erin:** een kamer met veel props, één versie met realtime lichten en één met baked licht, en een fps-teller.
- **Probeer:** wisselen tussen de twee en de fps zien veranderen; ook testen op de Quest 3S als die er is.
- **Uitleg:** weinig realtime lichten en gebakken licht houden de Quest op 72 fps; een lage fps maakt mensen misselijk.
- **In de game:** de woonkamer met baked licht en maanlicht; de zaklamp als enige echte lichtbron.
- **Klaar als:** het verschil zichtbaar is in de fps-teller.

### T10 – Bouwen en delen (lessen 1.1 en 3.4)
- **Staat erin:** een scene met een kleine checklist op een paneel: build profile, APK, testen op de Quest, versie.
- **Probeer:** een APK bouwen en op de bril zetten.
- **Uitleg:** zo komt de game op een Quest en zo laat je hem testen door een ander team. De Quest-build zelf (Build and Run) staat in les 1.1; build profiles, naam en versie in les 3.4.
- **In de game:** de definitieve build voor de Play Expo.
- **Klaar als:** een APK uit deze scene start op de Quest.

## Missie 4 – Custom VR Development (optioneel: eigen game-onderdelen)

### T11 – Eigen interactable: de spookval (lessen scanner en Balloon Inflator)
- **Staat erin:** een spookval-blok en een bol die als "spook" dient.
- **Probeer:** de val openen, de bundel op de bol houden en na 2 seconden wordt hij gezogen.
- **Uitleg:** een eigen interactable is een script dat reageert op pakken, activeren en loslaten; de timer reset als de bundel wegvalt.
- **In de game:** `GhostTrap` met vangtijd uit `GameSettings`.
- **Klaar als:** de bol wordt na 2 seconden gezogen en de timer reset bij verlies van de bundel.

### T12 – Deur met slot (les Keycard reader)
- **Staat erin:** een pikzwarte deur, een knop die een voorwaarde simuleert ("alle spoken gevangen") en een tweede ruimte.
- **Probeer:** de deur proberen te openen terwijl hij op slot zit; de voorwaarde aanzetten; doorlopen, teleporteren of klikken.
- **Uitleg:** de deur vraagt aan de kamer of alles gevangen is; pas dan laadt hij de volgende ruimte.
- **In de game:** `Door` en `Room`.
- **Klaar als:** de deur op slot blijft tot de voorwaarde klopt en dan de tweede ruimte laadt.

### T13 – Mini-puzzel in escape-room-stijl (les Escape Room project overview)
- **Staat erin:** één spook met een van de drie puzzeltypes en een gedachtebel; een kleine variant voor elk type.
- **Probeer:** de puzzel oplossen (voorwerp brengen, lade openen, radio uitzetten) en zien dat het spook tevoorschijn komt.
- **Uitleg:** drie puzzeltypes, max twee stappen, een plaatje als hint, een puzzel kan niet mislukken.
- **In de game:** `Puzzle` met `BringPuzzle`, `OpenRemovePuzzle`, `TogglePuzzle`. **Giechel en `LightSwitch` bouwt Daniël zelf** in deze scene of in de woonkamer.
- **Klaar als:** alle drie de typen werken en een weggegooid voorwerp komt terug.

## Volgorde en planning

| Sprint | Scenes |
| --- | --- |
| Prototype (12 t/m 25 nov) | T00, T01 t/m T07 (de basis van de loop) |
| MVP (26 nov t/m 16 dec) | T08 t/m T11, T13 |
| Polish (17 dec t/m 13 jan) | T12 en bijwerken van alle scenes naar de laatste scripts |

Prioriteit: **Should**. De hoofdgame gaat voor; een testscene die de hele game blokkeert, wordt overgeslagen. Voor Claude Code geldt: eerst de systemen in de echte game, dan de testscene eromheen.

## Trello-kaarten (kopieer, één kaart per regel)

```
[S] T00 Testhub (paneel per scene, knop naar elke test)
[S] T01 Testscene Locomotion (teleport, snap turn, vignet)
[S] T02 Testscene Voorwerpen pakken en gooien (5+ soorten)
[S] T03 Testscene Sockets (riem-holsters, geefzone)
[S] T04 Testscene Geluid en haptiek
[S] T05 Testscene Activation events (zaklamp, spookval)
[S] T06 Testscene Near-Far en Ray (deur, lade, knop)
[S] T07 Testscene UI in de wereld (menu, horloge, gedachtebel)
[S] T08 Testscene Comfort
[S] T09 Testscene Prestaties en licht (fps-teller)
[S] T10 Testscene Bouwen en delen (APK)
[S] T11 Testscene Spookval als eigen interactable
[S] T12 Testscene Deur met slot
[S] T13 Testscene Mini-puzzel (3 puzzeltypes)
[S] InfoPanel prefab (titel, pathway-les, uitleg, "In de game")
```
