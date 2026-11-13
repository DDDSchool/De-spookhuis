using UnityEngine;

// Laat de linker controller trillen als de speler dichtbij dit object is:
// zachtjes aan de rand, harder naarmate je dichterbij komt. In de game zit dit op elk spook (GAME_DESIGN.md 4.7).
// Afstand en sterkte staan in GameSettings. De HapticsManager kiest het sterkste verzoek (het dichtste spook).
public class NearbyHaptics : MonoBehaviour
{
    [SerializeField] GameSettings settings;
    [SerializeField] HapticsManager haptics;
    [Tooltip("De Main Camera van de speler (het hoofd).")]
    [SerializeField] Transform playerHead;

    void Update()
    {
        float distance = Vector3.Distance(playerHead.position, transform.position);
        if (distance > settings.nearbyRadius) return;

        float closeness = 1f - distance / settings.nearbyRadius; // 0 aan de rand, 1 er vlak naast
        haptics.RequestNearby(closeness * settings.nearbyMaxStrength);
    }
}
