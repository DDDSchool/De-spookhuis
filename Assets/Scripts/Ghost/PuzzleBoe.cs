using UnityEngine;

public class PuzzleBoe: BasicGhostPuzzleKit
{
    public Transform teddybear;

    #region Give Zone
    void OnTriggerEnter(Collider other)
    {
        if (!other.transform.IsChildOf(teddybear)) return;
        Destroy(teddybear.gameObject);

        Solve();
    }
    #endregion
}
