using UnityEngine;

public class PuzzleBoe: BasicGhostPuzzleKit
{
    [SerializeField] private GameObject teddybearPrehabs;
    private Transform teddybear;

    public override void OnCreate(RoomManager room)
    {
        print("creating");
        base.OnCreate(room);

        Transform spot = GameManager.GetRandomValueOutOfList<Transform>(room.allSpawnableLocation);
        room.allSpawnableLocation.Remove(spot);

        teddybear = Instantiate(teddybearPrehabs, spot.position, spot.rotation, room.roomFolder.transform).transform;
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
