using UnityEngine;
using UnityEngine.XR.Interaction.Toolkit.Locomotion.Teleportation;

public class Player : MonoBehaviour
{
    TeleportationProvider teleport;

    void Awake()
    {
        GameManager.player = this; //to get plr easier
        teleport = GetComponentInChildren<TeleportationProvider>(true);
    }

    // Zet de speler op een spawnpunt, kijkend in de richting van dat punt.
    // Via de TeleportationProvider klopt het ook als je niet in het midden van je speelruimte staat
    // (alleen transform.position zetten verschuift je met je eigen plek in de speelruimte).
    public void TeleportTo(Transform spot)
    {
        if (teleport)
        {
            teleport.QueueTeleportRequest(new TeleportRequest
            {
                destinationPosition = spot.position,
                destinationRotation = spot.rotation,
                matchOrientation = MatchOrientation.TargetUpAndForward,
                requestTime = Time.time,
            });
            return;
        }

        transform.position = spot.position;
    }
}
