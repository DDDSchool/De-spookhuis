using UnityEngine;
using UnityEngine.XR.Interaction.Toolkit.Inputs.Haptics;

// Alle trillingen van de game lopen via dit ene script (GAME_DESIGN.md 4.7).
// Het stuurt de Haptic Impulse Player op de linker of rechter controller aan.
// Een tikje bij aanraken en pakken doet de Simple Haptic Feedback van het pathway al (les 2.1).
public class HapticsManager : MonoBehaviour
{
    public enum Hand { Left, Right, Both }

    [SerializeField] GameSettings settings;
    [SerializeField] HapticImpulsePlayer leftController;
    [SerializeField] HapticImpulsePlayer rightController;

    float nearbyStrength; // het sterkste "spook dichtbij"-verzoek sinds de vorige puls
    float nextNearbyPulse;

    // Eenmalige tril-puls. strength van 0 tot 1, duration in seconden.
    public void Pulse(Hand hand, float strength, float duration)
    {
        if (hand != Hand.Right) leftController.SendHapticImpulse(strength, duration);
        if (hand != Hand.Left) rightController.SendHapticImpulse(strength, duration);
    }

    // Elk spook in de buurt vraagt hier om te trillen. We onthouden alleen het sterkste verzoek,
    // zodat de linker controller altijd het dichtstbijzijnde spook voelt en niet het laatste.
    public void RequestNearby(float strength)
    {
        nearbyStrength = Mathf.Max(nearbyStrength, strength);
    }

    void Update()
    {
        if (Time.time < nextNearbyPulse) return;
        nextNearbyPulse = Time.time + settings.nearbyPulseInterval;

        if (nearbyStrength > 0f) Pulse(Hand.Left, nearbyStrength, settings.nearbyPulseInterval);
        nearbyStrength = 0f;
    }
}
