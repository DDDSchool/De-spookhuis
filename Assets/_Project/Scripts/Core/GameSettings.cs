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

    [Header("Trillen (haptiek)")]
    [Tooltip("Binnen deze afstand in meter trilt de linker controller als er een spook dichtbij is. Voorlopig.")]
    [Range(0.5f, 10f)] public float nearbyRadius = 3f;

    [Tooltip("Hoe sterk de controller trilt als het spook er vlak naast is (0 tot 1). Voorlopig.")]
    [Range(0f, 1f)] public float nearbyMaxStrength = 0.5f;

    [Tooltip("Om de hoeveel seconden een nieuwe tril-puls komt.")]
    [Range(0.05f, 1f)] public float nearbyPulseInterval = 0.25f;
}
