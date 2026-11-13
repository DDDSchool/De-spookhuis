# Kamer vol spoken – Projectplan (fases)

Volgorde van het werk. Het ontwerp staat in `GAME_DESIGN.md`; hier staat wanneer wat af moet zijn. Team (Groep 4): Raji Bozdag en Daan Pilage (ontwerpers), Daniël Eijkelenkamp en Viktor Eshuis (technici). Trello: https://trello.com/b/AK7eTg6w/spookhuis-p2 · Code: https://github.com/DDDSchool/De-spookhuis (Unity 6.3).

## Tijdlijn

| Wanneer | Wat |
| --- | --- |
| wo 11 nov | Design Document / Projectdocument inleveren |
| **vr 13 nov** | **Unity VR pathway: missie 1 en 2 af** (VR Basics, Events and Interactions) |
| 12 t/m 25 nov | **Fase 1 – Prototype** (inleveren wo 25 nov); pathway missie 1 en 2 vóór vr 13 nov |
| 26 nov t/m 16 dec | **Fase 2 – MVP / Vertical Slice** (inleveren wo 16 dec); pathway missie 3 (voorstel) |
| 17 dec t/m 13 jan | **Fase 3 – Polish** (Polished Build wo 13 jan; feature freeze wo 6 jan, voorstel) |
| vr 15 jan | Play Expo |

## Fase 1 – Prototype (t/m wo 25 nov)

**Pathway in deze fase:** missie 1 en 2 moeten vr 13 nov af zijn (lessen, challenges, labs; quizzen tellen niet). Wat je daarin leert (locomotion, grabbables, sockets, audio en haptics, activation events, ray en near-far, UI) bouw je meteen in dit prototype.

Doel: de hele loop is speelbaar op de Quest 3 in een kamer van grijze blokken. Alles is placeholder (kubussen, capsule-spook, tijdelijke geluiden); het gaat om werken en aanvoelen.

| Week | Focus | Klaar als |
| --- | --- | --- |
| t/m wo 11 nov | projectopzet | Unity-project (Quest 3, OpenXR) draait een lege scene op de bril; git en Trello staan |
| 12 t/m 18 nov | speler, riem, zaklamp, spookval, spook Boe | zaklamp en val van de riem pakken en een rondlopend spook vangen |
| 19 t/m 25 nov | puzzel, deur, tweede ruimte, horloge, build | hele loop speelbaar en getest op de Quest |

Bevat (alleen Must): teleport, snap turn, vignette, handen; riem met zaklamp en spookval; spook Boe met alle toestanden en ruimtelijk geluid; eerste puzzel (speelgoedbeer uit de lade) met gedachtebel en hint na 60 s; moed-meter en horloge met trilling; pikzwarte deur die na de vangst opent en de tweede ruimte laadt.

Klaar-criteria: iedereen heeft pathway missie 1 en 2 af (vr 13 nov); een ronde duurt < 3 minuten en kan niet vastlopen; 72 fps op de Quest 3 (met marge, zodat het ook op de Quest 3S kan); twee mensen buiten het team snappen wat ze moeten doen.

## Fase 2 – MVP / Vertical Slice (t/m wo 16 dec)

Doel: de woonkamer is af op eindkwaliteit, met Boe en Giechel en alle systemen.

**Pathway in deze fase:** missie 3 (comfort, optimalisatie, lighting, bouwen en delen) past bij het polijsten en de eerste echte build. Voorstel: af vóór de vertical slice (wo 16 dec); vraag de docent naar de echte deadline.

| Periode | Artist/ontwerper | Technicus |
| --- | --- | --- |
| 26 nov t/m 2 dec | woonkamer-set, props, palet, materialen | placeholders vervangen door echte modellen, puzzel Giechel (**Daniël zelf**) |
| 3 t/m 9 dec | spoken Boe en Giechel met animaties, zaklamp, spookval, riem, horloge | gedachtebel, geefzone, vang-feedback, trilling afstellen |
| 10 t/m 16 dec | UI echt, zuig-effect, zwarte deur | gang en ruimtes laden, balans startwaarden, build en playtest |

Klaar-criteria: iedereen heeft pathway missie 3 af (voorstel); alle Must-kaarten voor woonkamer, Boe, Giechel, spookval, riem en zwarte deur staan op Klaar; drie mensen buiten het team spelen de woonkamer uit zonder hulp; niets grijs of placeholder meer in de woonkamer; 72 fps. Daarna geen nieuwe features.

## Fase 3 – Polish (t/m wo 13 jan)

Doel: woonkamer, gang en slaapkamer met vier spoken, alles afgewerkt.

**Pathway in deze fase:** geen verplichte missie meer (missie 4 is optioneel). Wie wil, kan missie 4 doen voor het deurslot en de puzzels; de game heeft het niet nodig.

| Periode | Focus |
| --- | --- |
| 17 dec t/m 6 jan | slaapkamer met Laken en Fluisteraar, gang als hub, eindscherm, comfort-instellingen (kerstperiode: alleen losse taken) |
| 7 t/m 13 jan | alleen polish: VFX en SFX, balans, bugs, laadtijden, playtests, definitieve build |
| 14 jan | test op een schone Quest en backup van het project |

Could (alleen na alle Musts en Shoulds, vóór de freeze): zolder, Rommelaar, De Bewoner, zaklamp-reacties, moeilijkheidsgraden.

Klaar-criteria: alle Musts klaar en de gang met beide kamers speelt van begin tot eind; vier mensen buiten het team spelen het uit zonder hulp; 72 fps en geen crash in 20 minuten; de game start direct na het opstarten van de bril.

## Leerpad: Unity VR Development pathway (Unity 6.3)

School vraagt dat we het [VR Development pathway van Unity Learn](https://learn.unity.com/pathway/vr-development) doen (versie 6.3, beginnersniveau, ca. 6 weken). We gebruiken **Kamer vol spoken als persoonlijk project** voor de labs, zodat het leren en het bouwen één werk is. Missies: [1 VR Basics](https://learn.unity.com/pathway/vr-development/unit/vr-basics), [2 Events and Interactions](https://learn.unity.com/pathway/vr-development/unit/events-and-interactions), [3 Ergonomics and Optimization](https://learn.unity.com/pathway/vr-development/unit/ergonomics-and-optimization), [4 Custom VR Development](https://learn.unity.com/pathway/vr-development/unit/mission-4-custom-vr-development).

| Missie en lessen | Sprint | Wordt in onze game |
| --- | --- | --- |
| **1 VR Basics:** 1.1 projectopzet, 1.2 locomotion, 1.3 grabbables, 1.4 sockets | **af vr 13 nov** (Prototype) | Projectopzet voor de Quest; teleport en snap turn; voorwerpen pakken, houden en gooien (5+ soorten); **sockets** voor de riem (zaklamp, spookval) en de geefzone |
| **2 Events and Interactions:** 2.1 audio en haptics, 2.2 activation events, 2.3 near-far en ray interactors, 2.4 user interface | **af vr 13 nov** (Prototype) | Spatial audio en `HapticsManager`; **activation events** voor de zaklamp (trekker = aan, lichtbundel); ray en near-far voor deuren, lades en klikken op de zwarte deur; menu's en horloge als world-space UI |
| **3 Ergonomics and Optimization:** 3.1 comfort en toegankelijkheid, 3.2 optimalisatie, 3.3 lighting, 3.4 building en sharing | MVP (26 nov t/m 16 dec) | Vignet, zittend/staand, comfort-instellingen; 72 fps met marge (ook Quest 3S); **baked licht** in de woonkamer; APK bouwen en laten testen |
| **4 Custom VR Development:** eigen interactables scripten (scanner, ballonpomp), escape room (number pad, keycard reader, sliding door), project 3 "clone with a twist" | MVP en Polish (26 nov t/m 13 jan) | Eigen scripts zoals `LightSwitch` en `GiechelPuzzle` (Daniël), het **deurslot** (de keycard reader laat zien hoe een slot opengaat zodra aan een voorwaarde is voldaan) en de puzzels (escape-room-aanpak) |

**Deadlines:** missie 1 en 2 vr 13 nov (van school). Voor missie 3 is nog geen datum bekend; missie 4 is optioneel; het voorstel staat in de fases hierboven.

Afspraken:
- **Iedereen** doet missie 1 tot en met 3 helemaal (lessen, challenges, labs). **Quizzen tellen niet mee. Missie 4 mag weg**; wie zin heeft (vooral de technici) kan het later doen voor het deurslot, de puzzels en eigen scripts.
- De **challenges, labs en quizzen** zijn leerwerk van de studenten zelf. Claude Code maakt ze niet voor jullie, maar legt wel uit hoe iets werkt.
- Bouwt Claude Code iets dat in een les voorkomt, dan gebruikt het **dezelfde Unity-componenten** (XR Grab Interactable, Socket Interactor, Near-Far en Ray Interactor, activation events, XR UI), zodat jullie het kunnen terugzien in de les.
- Het pathway noemt de versie van het project: Unity 6.3. Controleer dat de repository dezelfde Unity-versie gebruikt.
- Past onze game niet in een opdracht van school (bijvoorbeeld project 3), vraag dan aan de docent wat telt.

### Alle onderdelen van het pathway, en wat ze in onze game worden (versie 6.3)

Pathway: https://learn.unity.com/pathway/vr-development?version=6.3. De docent zegt \"neem alles door\", maar **quizzen tellen niet mee en missie 4 mag weg**. Verplicht (`[x]`) zijn dus alle lessen, challenges en labs van missie 1 tot en met 3; missie 4 en de quizzen staan op `[ ]`. Kolom **Af** vink je per persoon af. Staat er op de site iets extra's of anders, dan geldt de site.

**Missie 1 – VR Basics** (sprint Prototype)

| Les | Verplicht | Af | Past bij onze game? | Waar in de game |
| --- | --- | --- | --- | --- |
| Welcome to the VR Pathway | [x] | [ ] | achtergrond | – |
| VR Software Setup | [x] | [ ] | ja | installatie voor het project (Unity, Quest) |
| 1.1 VR Project Setup | [x] | [ ] | ja | projectopzet voor de Quest 3 |
| 1.2 VR Locomotion | [x] | [ ] | ja | teleport en snap turn |
| 1.3 Grabbable GameObjects | [x] | [ ] | ja | voorwerpen pakken en gooien (5+ soorten), puzzelprops |
| 1.4 Sockets | [x] | [ ] | ja | riem (zaklamp, spookval) en geefzone |
| Challenge 1 – Architecture Review | [x] | [ ] | nee, losse oefening | – |
| The VR software landscape | [x] | [ ] | achtergrond | – |
| Lab 1 – VR Personal Project Basics | [x] | [ ] | ja | ons project; Design Document is hier al grotendeels klaar |
| Mission 1 Quiz | [ ] | [ ] | – | – |

**Missie 2 – Events and Interactions** (sprint Prototype)

| Les | Verplicht | Af | Past bij onze game? | Waar in de game |
| --- | --- | --- | --- | --- |
| 2.1 Audio and Haptics | [x] | [ ] | ja | spatial audio, `HapticsManager`, horloge dat trilt |
| 2.2 Activation events (Remote, Lightsource) | [x] | [ ] | ja | zaklamp aan/uit en lichtbundel (de zaklamp staat in de extensies; de Lightsource in de les is een lampje op de afstandsbediening); remote bijvoorbeeld voor de radio of een schakelaar |
| 2.3 Near-Far and Ray Interactors | [x] | [ ] | ja | klikken op de zwarte deur, menu's, op afstand pakken (kastdeuren staan in een extensie; lades voegen we zelf toe) |
| 2.4 User Interface | [x] | [ ] | ja | startmenu, pauzemenu, gedachtebel (het horloge aan de pols voegen we zelf toe) |
| Challenge 2 – 3D Painting | [x] | [ ] | nee, losse oefening | – |
| The XR hardware landscape | [x] | [ ] | achtergrond | Quest 3 en 3S |
| Lab 2 – Personal Project Events & Interactions | [x] | [ ] | ja | de kerninteractie: zaklamp, spookval, puzzel |
| Mission 2 Quiz | [ ] | [ ] | – | – |

**Missie 3 – Ergonomics and Optimization** (sprint MVP)

| Les | Verplicht | Af | Past bij onze game? | Waar in de game |
| --- | --- | --- | --- | --- |
| 3.1 Comfort and Accessibility | [x] | [ ] | ja | comfort-instellingen (de les: fade en een instellingenpaneel); vignet, zittend/staand en volumeplafond voegen we zelf toe; geen jumpscares |
| 3.2 Optimization | [x] | [ ] | ja | 72 fps op Quest 3 (en 3S) |
| 3.3 Lighting | [x] | [ ] | ja | baked licht in de woonkamer, maanlicht |
| 3.4 Building and Sharing | [x] | [ ] | ja | build profile, naam en versie; daarna laten testen door een ander team (de Quest-build zelf, Build and Run, staat al in les 1.1) |
| Challenge 3 – Training Simulation | [x] | [ ] | nee, losse oefening | – |
| Keeping up with XR technology | [x] | [ ] | achtergrond | – |
| Lab 3 – Personal Project Ergonomics & Optimization | [x] | [ ] | ja | ons project |
| Mission 3 Quiz | [ ] | [ ] | – | – |

**Missie 4 – Custom VR Development** (**optioneel, niet verplicht**; scriptkennis nodig, vooral technici)

Let op: de les "Explore the sample scene" noemt XR Interaction Toolkit 3.5.x, ons project gebruikt 3.3.2. Neem je code uit missie 4 over, controleer dan of alles in onze versie bestaat.

| Les | Verplicht | Af | Past bij onze game? | Waar in de game |
| --- | --- | --- | --- | --- |
| What is in this mission? | [ ] | [ ] | achtergrond | – |
| Explore the sample scene | [ ] | [ ] | deels | zo werkt een eigen interactable |
| Set up the scanner | [ ] | [ ] | deels | oefening voor de spookval (een apparaat met een eigen werking) |
| Code the scanning functionality | [ ] | [ ] | deels | idem: eigen script voor de spookval |
| Balloon Inflator | [ ] | [ ] | deels | oefening voor een eigen interactable (zaklamp, LightSwitch) |
| Escape Room project overview | [ ] | [ ] | ja | puzzels in de stijl van een escape room |
| Number pad | [ ] | [ ] | nee | hebben wij niet nodig |
| Keycard reader | [ ] | [ ] | ja | deurslot: de deur gaat open zodra aan een voorwaarde is voldaan |
| Sliding Door | [ ] | [ ] | deels | voorbeeld van een eigen interactable (een deur die je met de hand schuift); onze zwarte deur werkt anders (doorlopen, teleporteren of klikken) |
| Mission 4 Quiz | [ ] | [ ] | – | – |
| Project 3: Clone with a twist! | [ ] | [ ] | vraag de docent | levert het pathway-badge op; vraag of onze game kan tellen |

## Werkafspraken

- Elke kaart is klein en afgebakend, met het klaar-criterium uit dit plan.
- AI mag scripten en hulptaken doen; elk script wordt gelezen en op de Quest getest voordat het klaar is.
- Eén branch per taak; wat in de hoofdversie komt is eerst door een ander teamlid bekeken.
- Elke week een build op de Quest 3.
- Eerst alle Musts, dan Shoulds, dan Coulds. Speelbaar gaat voor mooi.
- **Trello afvinken:** na elke taak zegt Claude Code welke kaarten klaar zijn en afgetekend kunnen worden (zie `CLAUDE.md`). Een mens controleert het en zet de kaart op Klaar.

## Eigen scriptstuk voor Daniël

Daniël bouwt zelf het spook Giechel en zijn puzzel (het licht aandoen) om te oefenen met VR-interactie in Unity. Claude Code laat dit stuk liggen. Zodra het prototype staat en uiterlijk in de week van 26 nov:

1. **LightSwitch:** schakelaar met XR Simple Interactable; Select Entered roept `Toggle()` aan die de lichten aan/uit zet.
2. **GiechelPuzzle:** kind van `Puzzle`; luistert naar de LightSwitch en meldt "opgelost" als het licht aan is.
3. **Giechel:** in het donker verstopt en gesmoord geluid; bij licht aan komt hij tevoorschijn en lacht hij.
4. **Test op de Quest;** Giechel blijft vangbaar als het licht weer uitgaat.

Startscript voor de schakelaar:

```csharp
using UnityEngine;
using UnityEngine.Events;

public class LightSwitch : MonoBehaviour
{
    [SerializeField] Light[] lights;
    [SerializeField] bool isOn;
    public UnityEvent<bool> onChanged; // true = licht aan

    void Start() => Apply();

    public void Toggle()
    {
        isOn = !isOn;
        Apply();
    }

    void Apply()
    {
        foreach (var l in lights) l.enabled = isOn;
        onChanged?.Invoke(isOn);
    }
}
```

## Risico's

| Risico | Wat we doen |
| --- | --- |
| te weinig fps op de Quest 3 (en 3S) | low poly, gebakken licht, weinig echte lichten; elke week meten, en testen op de Quest 3S als die er is |
| AI-script werkt niet op de bril | elke kaart eerst op de Quest testen |
| puzzels te moeilijk | gedachtebel en hint na 60 s; max 2 stappen; kan niet mislukken |
| ruimtelijk geluid lokt niet goed | vroeg testen met de bril op; afstand en volume bijstellen |
| te weinig tijd voor art | eerst woonkamer af; slaapkamer hergebruikt props |
| iemand valt uit of het schuift | Must-lijst klein houden; Could vervalt eerst; geen nieuwe features na wo 6 jan |
