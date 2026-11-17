using UnityEngine;
using UnityEngine.XR.Interaction.Toolkit;

public class RoomDoorInteractable: InteractableTrigger
{
    [SerializeField] private RoomManager roomTarget;
    
    private bool isLocked => !GameManager.AllGhostInRoomAreCatch();

    public override void Trigger(SelectEnterEventArgs args)
    {
        if (isLocked) return;

        GameManager.SwitchRoom(roomTarget);
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
