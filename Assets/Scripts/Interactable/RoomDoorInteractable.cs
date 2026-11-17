using UnityEngine;
using UnityEngine.XR.Interaction.Toolkit;

public class RoomDoorInteractable: InteractableTrigger
{
    //waring if it is unlock when there is alr outline it stay red, fix soon

    [SerializeField] private RoomManager roomTarget;
    
    private bool isLocked => !GameManager.AllGhostInRoomAreCatch();

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
