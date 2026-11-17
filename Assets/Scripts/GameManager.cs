using UnityEngine;

public static class GameManager
{
    public enum roomTypes
    {
        hallway,
        livingRoom,
        kitchen,
        attic
    }

    public static RoomManager currentRoom;
    public static Player player; //to instaly get plr

    [RuntimeInitializeOnLoadMethod]
    static void Init()
    {
        
    }

    #region Game genaration
    static public void GenarateNewGame()
    {
        
    }

    static void GenarateGhost()
    {
        
    }
    #endregion

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