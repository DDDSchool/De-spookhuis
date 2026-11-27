using System.Collections;
using UnityEngine;

public class PuzzelGiechel: BasicGhostPuzzleKit
{
    private RoomManager roomManager;

    public override void OnCreate(RoomManager room)
    {
        roomManager = room;

        StartCoroutine(WaitForLighting());
    }

    IEnumerator WaitForLighting()
    {
        yield return new WaitUntil(() => roomManager.lightState);

        Solve();
    }
}
