using UnityEngine;

// Alle instelbare getallen van de game staan op één plek: Data/GameSettings.asset.
// Ontwerpers passen ze daar aan zonder code (zie GAME_DESIGN.md 4.8).
// Elk systeem krijgt hier zijn eigen kopje. Scripts lezen hun waarde hier, nooit een los getal in de code.
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
}
