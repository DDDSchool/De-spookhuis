using UnityEngine;

public static class GameManager
{
    public static RoomManager currentRoom;
    public static Player player; //to instaly get plr

    [RuntimeInitializeOnLoadMethod]
    static void Init()
    {
        
    }

    static public void SwitchRoom(RoomManager target)
    {
        //fade out

        //soon less laggy with deleting and adding by doing one on one
        currentRoom.gameObject.SetActive(false);
        currentRoom = target;
        target.gameObject.SetActive(true);

        player.transform.position = currentRoom.spawn.position;
    }

    #region Helper function
    static public bool AllGhostInRoomAreCatch()
    {
        return true;
    }
    #endregion
}