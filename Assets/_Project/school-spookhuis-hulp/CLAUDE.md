# CLAUDE.md – Kamer vol spoken

VR-game voor de Meta Quest 3 (standalone), gemaakt in Unity 6.3 door een schoolgroep (IDD, Groep 4). Alle documenten hieronder staan in `Assets/school-spookhuis-hulp/`. Lees eerst:

1. `GAME_DESIGN.md` – wat we bouwen (kernloop, spoken, systemen, startwaarden, klassen).
2. `HOW_IT_WORKS.md` – waar alles in het project staat en hoe je iets verandert (houd dit bestand bij als de structuur verandert).
3. `PROJECT_PLAN.md` – in welke volgorde en wanneer (prototype wo 25 nov, vertical slice wo 16 dec, polished build wo 13 jan, Play Expo vr 15 jan).
4. `TEST_SCENES.md` – kleine testscenes (T00–T13) per VR-techniek uit het pathway, met uitleg en hoe het in de game terugkomt. Prioriteit Should: eerst de echte game, dan de testscene eromheen. Gebruik in testscenes dezelfde scripts als de game.
5. `TRELLO.md` – kopie van het Trello-bord met kaart-ID's (A, U, V, S, T, D). Verwijs er na elke taak naar in het Trello-blok.

Trello (taken): https://trello.com/b/AK7eTg6w/spookhuis-p2 – de lijst **Scripts** is jouw werk.

## Regels

- Prestaties: mik op 72 fps op de Quest 3 met marge, zodat dezelfde build ook goed draait op de Quest 3S. Zet kwaliteitsinstellingen (bijvoorbeeld renderschaal) waar nodig in `GameSettings`.
- Leerpad: de studenten volgen het Unity VR Development pathway (zie `PROJECT_PLAN.md`). Gebruik dezelfde XR Interaction Toolkit-componenten als in het pathway (Grab Interactable, Socket Interactor, activation events, Near-Far en Ray Interactor). Verplicht zijn missie 1 t/m 3 (quizzen tellen niet, missie 4 is optioneel). De challenges en labs van het pathway zijn leerwerk van de studenten: maak ze niet voor hen, maar leg uit hoe iets werkt.
- Werk aan één kleine taak tegelijk, op een eigen branch. Test op de Quest 3 voordat iets klaar is.
- Eerst alle Musts, dan Shoulds, dan Coulds. Speelbaar gaat voor mooi. Gebruik placeholders voor art en geluid.
- Houd je aan `GAME_DESIGN.md`. Wijkt iets af of is iets onduidelijk, vraag het en pas het bestand aan voordat je verder bouwt.
- **Niet bouwen:** `LightSwitch`, `GiechelPuzzle` en het gedrag van Giechel (Daniël doet dat zelf; maak alleen een leeg bestand met TODO's en leg op verzoek uit hoe `Puzzle` werkt). Raak de VFX-assets niet aan (Viktor doet VFX, backend en bugfixes als allrounder).
- Waarden in `GameSettings` (ScriptableObject), geen magische getallen. Geen `Find`/`GetComponent` in `Update`, geen allocaties per frame.
- **Na elke taak: Trello-overzicht.** Sluit af met een blok `Trello`:
  - **Kan afgetekend worden:** kaarten uit `TRELLO.md` (met ID en naam, bijvoorbeeld `S08 [M] GhostTrap`) waarvan het klaar-criterium uit `PROJECT_PLAN.md` nu klopt, met per kaart één zin: wat je gemaakt hebt en hoe je het test.
  - **Nog niet af:** kaarten waar je aan gewerkt hebt maar waar iets aan ontbreekt, met wat er mist.
  - **Nieuwe kaarten:** dingen die je tegenkwam en die nog geen kaart hebben (voorstel met Must, Should of Could).
  Je kunt Trello zelf niet aanpassen: een teamlid controleert het (liefst op de Quest) en zet de kaart op Klaar. Tel een kaart pas als klaar als het getest is, niet als de code alleen bestaat.
- Schrijf scripts die studenten kunnen lezen: klein, met korte uitleg waarom. Leg na elke taak in 3 tot 5 zinnen in het Nederlands uit wat je gebouwd hebt en hoe je het test.
- Comfort is geen bijzaak: geen jumpscares, geen gedwongen camerabeweging, volumeplafond, teleport als standaard.
