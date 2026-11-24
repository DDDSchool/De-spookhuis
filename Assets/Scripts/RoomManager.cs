using System.Collections.Generic;
using UnityEngine;

public class RoomManager : MonoBehaviour
{
    public Transform spawn; //where the player going to spawn when switchen to this room
    [Tooltip("where the roomFolder is of that room *in scene")] public GameObject roomFolder;
    [SerializeField] private Transform spawnable;
    public List<Transform> StorageSpawnable; //mabye need a way to reset or reloading scene

    [Space(10)]
    public RoomTypes roomType;
    [SerializeField] [Tooltip("if this is where u start")] private bool startingRoom = false;
    
    [HideInInspector] public List<Transform> allSpawnableLocation;
    [HideInInspector] public int ghostCaught = 0;
    [HideInInspector] public bool lightState;
    private List<Transform> spawnableSpots;

    //configs
    const float spawnableVisualeHeight = .6f;
    const float spawnableVisualeForward = .2f;

    void Awake()
    {
        //connect to manager event
        if (GameManager.spawnableGhostRoom.Contains(roomType)) GameManager.initRoomGenaration += GenarateRoom;

        if (!startingRoom) {Load(false); return;}
        GameManager.currentRoom = this;
    }

    public void GenarateRoom()
    {
        //refresh
        allSpawnableLocation = new();
        foreach (Transform child in spawnable)
        {
            allSpawnableLocation.Add(child);
        }

        //spawn in ghost
        foreach (GhostType ghostType in GameManager.ghostInRooms[roomType])
        {
            print($"spawning {ghostType} in {roomType}");
            #if UNITY_EDITOR
                if (!GameManager.ghostModels.ContainsKey(ghostType)) {Debug.LogError($"there is no {ghostType.ToString()} in settings"); continue;}
            #endif
            GameObject newGhost = Instantiate(GameManager.ghostModels[ghostType], transform);

            BasicGhostPuzzleKit ghostScript = newGhost.GetComponent<BasicGhostPuzzleKit>();
            ghostScript.OnCreate(this);
        }
    }

    public void Load(bool state)
    {
        roomFolder.SetActive(state);
    }

    #region Visual
    void OnDrawGizmos()
    {
        StartingRoomVisuale();
        Spawnable();
    }

    void StartingRoomVisuale()
    {
        if (!startingRoom) return;

        Gizmos.color = Color.green;
        Gizmos.DrawWireCube(transform.position, new Vector3(5, 5, 5)); //soon room size
        Gizmos.color = Color.clear;
    }

    void Spawnable()
    {
        if (!spawnable) return;

        Gizmos.color = Color.lightYellow;
        foreach (Transform child in spawnable)
        {
            Gizmos.DrawLine(child.position, child.position + child.up * spawnableVisualeHeight);
            Gizmos.DrawLine(child.position, child.position + child.forward * spawnableVisualeForward);
        }
        
        if (StorageSpawnable.Count == 0) {Gizmos.color = Color.clear; return;}
        foreach (Transform child in StorageSpawnable)
        {
            Gizmos.DrawLine(child.position, child.position + child.up * spawnableVisualeHeight);
            Gizmos.DrawLine(child.position, child.position + child.forward * spawnableVisualeForward);
        }
        Gizmos.color = Color.clear;
    }
    #endregion
}
