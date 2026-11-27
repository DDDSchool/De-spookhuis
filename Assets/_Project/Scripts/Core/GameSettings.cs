using UnityEngine;

// Alle instelbare getallen van de game staan op één plek: Data/GameSettings.asset.
// Ontwerpers passen ze daar aan zonder code (zie GAME_DESIGN.md 4.8).
// Elk systeem krijgt hier zijn eigen kopje. Scripts lezen hun waarde hier, nooit een los getal in de code.
// "Voorlopig" = nog niet afgesproken met het team; stel bij na playtests (kaart D04).
[CreateAssetMenu(fileName = "GameSettings", menuName = "Spookhuis/Game Settings")]
public class GameSettings : ScriptableObject
{
    [Header("Beweging en comfort")]
    [Tooltip("Uit = teleport (de standaard, want dat voorkomt misselijkheid). Aan = vloeiend lopen met de linker stick.")]
    public bool smoothMoveAtStart = false;

    [Tooltip("Vignet bij vloeiend lopen: de randen van het beeld worden donker zolang je loopt.")]
    public bool vignetteAtStart = true;

    [Tooltip("Loopsnelheid bij vloeiend lopen, in meter per seconde. Startwaarde = standaard van de XR Interaction Toolkit.")]
    [Range(0.5f, 4f)] public float moveSpeed = 2.5f;

    [Tooltip("Hoeveel graden je draait per snap turn. Startwaarde = standaard van de XR Interaction Toolkit.")]
    [Range(15f, 90f)] public float snapTurnDegrees = 45f;

    [Tooltip("Zittend spelen: hoeveel meter de camera hoger komt, zodat je even hoog kijkt als staand. Voorlopig.")]
    [Range(0f, 0.8f)] public float seatedExtraHeight = 0.4f;

    [Header("Geluid")]
    [Tooltip("Volumeplafond (0 tot 1): het volume komt nooit hoger, ook niet als de speler de schuif helemaal opendraait. Voorlopig.")]
    [Range(0.1f, 1f)] public float volumeCap = 0.8f;

    [Tooltip("Volume bij de start (0 tot 1). Wordt nooit hoger dan het plafond.")]
    [Range(0f, 1f)] public float startVolume = 0.7f;

    [Header("Voorwerpen")]
    [Tooltip("Na hoeveel seconden een losgelaten voorwerp terug op zijn plek ligt (GAME_DESIGN 4.8: 'enkele seconden'). Voorlopig.")]
    [Range(1f, 15f)] public float returnDelay = 5f;

    [Tooltip("Vanaf hoeveel meter van zijn plek een voorwerp als 'weg' telt en de terug-timer begint. Voorlopig.")]
    [Range(0.01f, 0.5f)] public float returnMovedDistance = 0.1f;

    [Header("Zaklamp")]
    [Tooltip("Breedte van de lichtbundel in graden (GAME_DESIGN 4.8).")]
    [Range(5f, 60f)] public float beamAngle = 25f;

    [Tooltip("Hoe ver de lichtbundel reikt, in meter. Voorlopig.")]
    [Range(1f, 20f)] public float beamRange = 6f;

    [Header("Spook zichtbaar maken (UV-zaklamp)")]
    [Tooltip("Hoeveel seconden je met de UV-zaklamp op een spook moet schijnen tot het helemaal zichtbaar is. Voorlopig.")]
    [Range(0.2f, 10f)] public float ghostRevealSeconds = 2f;

    [Tooltip("Hoeveel seconden een spook nodig heeft om weer te verdwijnen als er geen UV-licht meer op valt. Voorlopig.")]
    [Range(0.2f, 20f)] public float ghostFadeSeconds = 4f;

    [Tooltip("Hoe zichtbaar een spook is zonder UV-licht (0 = onzichtbaar, 1 = helemaal). Iets boven 0 geeft een vage glinstering als hint.")]
    [Range(0f, 1f)] public float ghostHiddenAlpha = 0f;

    [Header("Angstmeter")]
    [Tooltip("Bij deze waarde is de meter vol: game-over.")]
    [Range(10f, 500f)] public float fearMax = 100f;

    [Tooltip("Hoeveel de angst per seconde stijgt zolang er in je kamer nog een spook los is. Bij 2 en max 100 heb je 50 seconden. Voorlopig.")]
    [Range(0f, 20f)] public float fearPerSecond = 2f;

    [Tooltip("Hoeveel de angst zakt als je een spook vangt. Voorlopig.")]
    [Range(0f, 100f)] public float fearPerCatch = 15f;

    [Header("Einde (gewonnen of game-over)")]
    [Tooltip("Hoeveel seconden na de laatste vangst het 'Gevangen!'-paneel verschijnt, zodat je het spook nog ziet wegvliegen.")]
    [Range(0f, 6f)] public float winPanelDelay = 2f;

    [Tooltip("Hoe ver het eindpaneel voor je hoofd verschijnt, in meter.")]
    [Range(0.8f, 3f)] public float endPanelDistance = 1.5f;

    [Tooltip("Staat er een muur dichterbij, dan komt het paneel zoveel meter vóór die muur.")]
    [Range(0.02f, 0.5f)] public float endPanelWallGap = 0.1f;

    [Tooltip("Dichterbij dan dit komt het paneel nooit, ook niet als je met je neus tegen een muur staat.")]
    [Range(0.3f, 1f)] public float endPanelMinDistance = 0.5f;

    [Header("Trillen (haptiek)")]
    [Tooltip("Binnen deze afstand in meter trilt de linker controller als er een spook dichtbij is. Voorlopig.")]
    [Range(0.5f, 10f)] public float nearbyRadius = 3f;

    [Tooltip("Hoe sterk de controller trilt als het spook er vlak naast is (0 tot 1). Voorlopig.")]
    [Range(0f, 1f)] public float nearbyMaxStrength = 0.5f;

    [Tooltip("Om de hoeveel seconden een nieuwe tril-puls komt.")]
    [Range(0.05f, 1f)] public float nearbyPulseInterval = 0.25f;

    [Header("Testscene: trektouw (station 2.1)")]
    [Tooltip("Hoe ver je het handvat omlaag kunt trekken, in meter.")]
    [Range(0.1f, 1.5f)] public float pullMaxDistance = 0.6f;

    [Tooltip("Hoe sterk de controller trilt als het touw helemaal uitgetrokken is (0 tot 1).")]
    [Range(0f, 1f)] public float pullMaxStrength = 1f;

    [Tooltip("Om de hoeveel seconden een nieuwe tril-puls komt terwijl je trekt.")]
    [Range(0.05f, 0.5f)] public float pullPulseInterval = 0.1f;

    [Tooltip("Hoe snel het handvat terugveert als je loslaat, in meter per seconde.")]
    [Range(0.2f, 5f)] public float pullReturnSpeed = 1.5f;
}
