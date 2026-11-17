using System;
using System.Collections.Generic;
using System.Linq;
using GLTFast;
using UnityEngine;
using UnityEngine.XR;

public static class GameManager
{
    public enum RoomTypes
    {
        hallway,
        livingRoom,
        kitchen,
        attic
    }

    public enum GhostType
    {
        Boe,
        Giechel,
        Laken,
        Fluisteraar,
        Rommernaar,
        Bewoner
    }

    public static GameManagerConfig config = Resources.Load<GameManagerConfig>("GameManagerConfig");
    public static RoomManager currentRoom;
    public static int totaleGhostCaught = 0;
    public static Dictionary<RoomTypes, List<GhostType>> ghostInRooms = new();
    public static List<RoomTypes> spawnableGhostRoom = new(){
        RoomTypes.livingRoom,
        RoomTypes.kitchen,
        RoomTypes.attic
    };
    public static Player player; //to instaly get plr

    [RuntimeInitializeOnLoadMethod]
    static void Init()
    {
        //load in objects
        #if UNITY_EDITOR
        if (XRSettings.loadedDeviceName == "") AddStaticObject(config.xrSimulator);
        #endif

        Debug.LogWarning("Testing mode btw");
        GenarateNewGame();
    }

    #region Game genaration
    static public void GenarateNewGame()
    {
        GenarateGhost();

        //need a reseter :3
    }

    static void GenarateGhost()
    {
        //rule in every room there be 2 ghost,
        //bewoner always go in zolder :3
        //since it always is 2 in every room we can loop everywhere until it is 2 :3

        //setup
        ghostInRooms.Clear();
        foreach (RoomTypes roomType in spawnableGhostRoom)
        {
            ghostInRooms.Add(roomType, new());
        }

        List<GhostType> remainingGhost = Enum.GetValues(typeof(GhostType)).Cast<GhostType>().ToList();

        //here the ghost that have always this spawn
        AddGhostToRoom(RoomTypes.attic, GhostType.Bewoner);

        //loop all and add random ghost
        //DDD check soon or it is really rng ok
        foreach (RoomTypes roomType in spawnableGhostRoom)
        {
            while (ghostInRooms[roomType].Count != 2)
            {
                GhostType randomGhost = remainingGhost[(int)UnityEngine.Random.Range(0, remainingGhost.Count)];
                AddGhostToRoom(roomType, randomGhost);
            }
        }

        //debuggeer
        string debugGhostLocation = "";
        foreach (RoomTypes roomType in spawnableGhostRoom)
        {
            debugGhostLocation += $"{roomType.ToString()}: ";
            foreach (GhostType ghostType in ghostInRooms[roomType])
            {
                debugGhostLocation += $"{ghostType.ToString()}, ";
            }
            debugGhostLocation += "\n";
        }
        Debug.Log(debugGhostLocation);

        void AddGhostToRoom(RoomTypes roomType, GhostType ghostType)
        {
            ghostInRooms[roomType].Add(ghostType);
            remainingGhost.Remove(ghostType);
        }
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
        if (!currentRoom) {Debug.LogError("no starting room ig, or current room"); return false;}
        if (!spawnableGhostRoom.Contains(currentRoom.roomType)) return true;
        
        bool succes = ghostInRooms[currentRoom.roomType].Count == currentRoom.ghostCaught;
        return succes;
    }

    static public void CaughtGhost() //mabye need ghosttype
    {
        currentRoom.ghostCaught += 1;
        totaleGhostCaught += 1;
    }

    static void AddStaticObject(GameObject target)
    {
        GameObject newObject = GameObject.Instantiate(target);
        GameObject.DontDestroyOnLoad(newObject);
    }
    #endregion
}