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
    [Tooltip("Hoeveel spoken deze kamer krijgt (alleen voor woonkamer, keuken en zolder). 0 = geen.")]
    [Min(0)] public int ghostCount = 2;
    [Tooltip("Dicht: de deur naar deze kamer blijft op slot (rood). Voor het prototype, waar alleen de woonkamer open is.")]
    public bool closed = false;
    
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
        if (GameManager.spawnableGhostRoom.Contains(roomType))
        {
            GameManager.initRoomGenaration += GenarateRoom;
            GameManager.rooms[roomType] = this;
        }

        if (!startingRoom) {Load(false); return;}
        GameManager.currentRoom = this;
    }

    void OnDestroy()
    {
        GameManager.initRoomGenaration -= GenarateRoom;
    }

    public void GenarateRoom()
    {
        //refresh: alleen plekken die echt in deze kamer liggen.
        //Gekopieerde Spawnable-mappen kunnen nog op de plek van een andere kamer staan; dan zou het spook daar belanden.
        allSpawnableLocation = new();
        if (spawnable)
        {
            foreach (Transform child in spawnable)
            {
                if (IsClosestRoomTo(child.position)) allSpawnableLocation.Add(child);
            }
        }

        //spawn in ghost
        foreach (GhostType ghostType in GameManager.ghostInRooms[roomType])
        {
            print($"spawning {ghostType} in {roomType}");
            #if UNITY_EDITOR
                if (!GameManager.ghostModels.ContainsKey(ghostType)) {Debug.LogError($"there is no {ghostType.ToString()} in settings"); continue;}
            #endif
            GameObject newGhost = Instantiate(GameManager.ghostModels[ghostType], transform);

            // Op een eigen plek, zodat twee spoken niet op elkaar staan.
            if (allSpawnableLocation.Count > 0)
            {
                Transform spot = GameManager.GetRandomValueOutOfList<Transform>(allSpawnableLocation);
                allSpawnableLocation.Remove(spot);
                newGhost.transform.position = spot.position;
            }
            // Eerst de puzzel klaarzetten, terwijl het spook nog aan staat (een puzzel die een coroutine
            // start, zoals Giechel, kan dat niet op een object dat uit staat).
            BasicGhostPuzzleKit ghostScript = newGhost.GetComponent<BasicGhostPuzzleKit>();
            ghostScript.OnCreate(this);

            // Dan onder de kamermap, zodat het spook mee uitgaat als je de kamer verlaat.
            newGhost.transform.SetParent(roomFolder.transform, true);
        }
    }

    // Een plek hoort bij deze kamer als geen andere spookkamer dichterbij ligt.
    bool IsClosestRoomTo(Vector3 point)
    {
        float myDistance = Vector3.Distance(transform.position, point);
        foreach (RoomManager other in GameManager.rooms.Values)
        {
            if (other != this && Vector3.Distance(other.transform.position, point) < myDistance) return false;
        }
        return true;
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
