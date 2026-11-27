using UnityEngine;
using UnityEngine.XR.Interaction.Toolkit.Interactables;

public class PuzzleBoe: BasicGhostPuzzleKit
{
    [SerializeField] private GameObject teddybearPrehabs;
    private Transform teddybear;
    private XRGrabInteractable teddybearGrab;

    public override void OnCreate(RoomManager room)
    {
        print("creating");
        base.OnCreate(room);

        Transform spot = GameManager.GetRandomValueOutOfList<Transform>(room.StorageSpawnable);
        room.StorageSpawnable.Remove(spot);

        if (spot == null) {Debug.LogError("no storage left"); return;}
        teddybear = Instantiate(teddybearPrehabs, spot.position, spot.rotation, spot.parent).transform;
        teddybearGrab = teddybear.GetComponent<XRGrabInteractable>();
        ReturnToStart returnToStart = teddybear.GetComponent<ReturnToStart>();
        returnToStart.home = spot;
    }

    #region Give Zone
    // De beer telt alleen als de speler hem vasthoudt in het spook ("geven").
    // Zo telt een beer die toevallig al in de zone ligt (bijvoorbeeld in een la vlak onder het spook) niet.
    // Stay én Enter: pak je de beer pas op als hij al in de zone is, dan komt er geen nieuwe Enter.
    void OnTriggerEnter(Collider other) => TryGive(other);
    void OnTriggerStay(Collider other) => TryGive(other);

    void TryGive(Collider other)
    {
        // Geen beer (meer)? Dan niets doen, anders volgt er een fout.
        if (!teddybear) return;
        if (!other.transform.IsChildOf(teddybear)) return;
        if (teddybearGrab && !teddybearGrab.isSelected) return;

        Destroy(teddybear.gameObject);
        teddybear = null;

        // De geef-zone is klaar; zo telt een tweede aanraking niet nog eens.
        GetComponent<Collider>().enabled = false;
        Solve();
    }
    #endregion
}
