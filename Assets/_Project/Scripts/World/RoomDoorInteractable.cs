using UnityEngine;
using UnityEngine.XR.Interaction.Toolkit;

public class RoomDoorInteractable: InteractableTrigger
{
    [SerializeField] private RoomManager roomTarget;

    // Op slot als je huidige kamer nog spoken heeft, of als de kamer erachter dicht is (prototype).
    // Na het einde (gewonnen of game-over) werken de deuren niet meer, dus ook rood.
    private bool isLocked => GameManager.gameOver || !GameManager.AllGhostInRoomAreCatch() || (roomTarget && roomTarget.closed);

    protected override void Start()
    {
        base.Start();
        // Wordt een kamer vrij terwijl je naar de deur wijst, dan moet de rand meteen wit worden.
        GameManager.onGhostCaught += RefreshOutline;
    }

    void OnDestroy()
    {
        GameManager.onGhostCaught -= RefreshOutline;
    }

    public override void Trigger(SelectEnterEventArgs args)
    {
        if (isLocked) return;

        GameManager.SwitchRoom(roomTarget);
    }

    protected override void OutLine(bool state)
    {
        outline.OutlineColor = isLocked? Color.red : Color.white;

        base.OutLine(state);
    }

    void RefreshOutline()
    {
        if (outline && outline.enabled) OutLine(true);
    }

    #region visual
    void OnDrawGizmos()
    {
        if (!roomTarget || !roomTarget.spawn) return;

        Gizmos.color = Color.yellow;
        Gizmos.DrawLine(transform.position, roomTarget.spawn.position);
        Gizmos.color = Color.clear;
    }
    #endregion
}
