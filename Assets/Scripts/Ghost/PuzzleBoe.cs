using UnityEngine;

public class PuzzleBoe: BasicGhostPuzzleKit
{
    [SerializeField] private GameObject teddybearPrehabs;
    private Transform teddybear;

    public override void OnCreate(RoomManager room)
    {
        print("creating");
        base.OnCreate(room);

        Transform spot = GameManager.GetRandomValueOutOfList<Transform>(room.StorageSpawnable);
        room.StorageSpawnable.Remove(spot);

        if (spot == null) {Debug.LogError("no storage left"); return;}
        teddybear = Instantiate(teddybearPrehabs, spot.position, spot.rotation, spot.parent).transform;
        ReturnToStart returnToStart = teddybear.GetComponent<ReturnToStart>();
        returnToStart.home = spot;
    }

    #region Give Zone
    void OnTriggerEnter(Collider other)
    {
        if (!other.transform.IsChildOf(teddybear)) return;
        Destroy(teddybear.gameObject);

        Solve();
    }
    #endregion
}
